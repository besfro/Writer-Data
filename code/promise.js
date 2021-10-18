const STATUS_PEDDING = 'pedding'
const STATUS_FULFILLED = 'fulfilled'
const STATUS_REJECTED = 'rejected'

const NEXT_THEN = Symbol('nextThen')
const RUN_THEN_CALLBACK = Symbol('runThenCallback')
const RESOLVE_REJECT = Symbol('resolveReject')


function onceFn (fn) {
  const once = function (...args) {
    if (once.done) return
    once.done = true
    fn(...args)
  }
  return once
}

class Promiseify {
  constructor (fn) {

    if (typeof fn !== 'function') {
      throw new TypeError('promise callback must be function')
    }

    this.status = STATUS_PEDDING
    this.isRejectCatch = false
    this.value = null
    this.next = null
    
    this.runPromise(fn)
  }

  runPromise (fn) {
    let done = false
    let wrapp = fn => {
      return value => {
        if (done) return
        done = true
        fn(value)
      }
    }

    const resolve = wrapp(v => this[RESOLVE_REJECT](v, STATUS_FULFILLED))
    const reject = wrapp(v => this[RESOLVE_REJECT](v, STATUS_REJECTED))
    
    try {
      fn( resolve, reject )
    } catch (e) {
      this[RESOLVE_REJECT](e, STATUS_REJECTED)
    }
  }

  [NEXT_THEN] () {
    const { value, next, status } = this
    if (status === STATUS_PEDDING) return

    if (next) {
      if (!next.isHandled) {
        next.isHandled = true
        next.promise.value = value
        next.promise.status = status
        this[RUN_THEN_CALLBACK](next)
      }
    } else {
      if (status === STATUS_REJECTED && !this.isRejectCatch) {
        console.error(
          new Error('Uncatch (in promise)'),
          value
        )
      }
    }
  }

  [RUN_THEN_CALLBACK] () {
    const { value, next, status } = this
    const callback = next[status === STATUS_FULFILLED ? 'fulfilled' : 'rejected']
    const nextPromise = next.promise

    // 没有回调函数的话继续向下传递值
    if (!callback) {
      nextPromise[NEXT_THEN]()
      return  
    }

    // reject handle 后状态变为 fulfilled
    if (status === STATUS_REJECTED) {
      nextPromise.status = STATUS_FULFILLED
      nextPromise.isRejectCatch = true
    }

    try {
      const callbackValue = callback ? callback(value) : value
      // then handle retun a promise
      // 如果 callback 返回一个 promise, 将返回的promise next指向当前
      // 如果返回值继续 callNext
      if (callbackValue instanceof this.constructor) {
        next.fulfilled = null
        next.rejected = null
        next.isHandled = false
        callbackValue.next = next
        //callbackValue.status !== PEDDING && nextPromise[passNext]()
      } else {
        nextPromise.value = callbackValue
        nextPromise[NEXT_THEN]()
      }

    } catch (e) {
      nextPromise[RESOLVE_REJECT](e, STATUS_REJECTED)
    }
  }

  [RESOLVE_REJECT] (value, status) {
    if (this.status !== STATUS_PEDDING) return

    this.status = status
    if (value instanceof this.constructor) {
      const curNext = this.__wrappCallback(this.next)
      this.next = value
      value.next = curNext
    } else {
      this.value = value
    }
    setTimeout(() => this[NEXT_THEN]())
  }

  then (fulfilled, rejected) {
    const promiseObj = this.__wrappCallback(
      new this.constructor(function () {}), 
      fulfilled, 
      rejected
    )

    this.next = promiseObj
    setTimeout(() => this[NEXT_THEN]())
    return promiseObj.promise
  }

  catch (fn) {
    return this.then(null, fn)
  }
  
  finally (fn) {
    const callback = value => {
      fn()
      return value
    }
    return this.then(callback, callback)
  }

  static resolve (value) {
    return new (this)(resolve => resolve(value))
  }

  static reject (value) {
    return new (this)((resolve, reject) => reject(value))
  }

  static all (arr) {
    if (!Array.isArray(arr)) {
      throw new TypeError('param must be array')
    }

    const promise = new (this)(v => v)

    let completeCount = 0
    let results = new Array(arr.length).fill('')

    const reject = onceFn(function (value) {
      promise[RESOLVE_REJECT](value, STATUS_REJECTED)
    })

    arr.forEach((item, index) => {
      item
        .then(
          value => {
            if (promise.status === STATUS_PEDDING) {
              results.splice(index, 1, value)
              if (++completeCount === arr.length) {
                promise[RESOLVE_REJECT](results, STATUS_FULFILLED)
              }
            }
          }, 
          reject
        )
    })

    return promise
  }

  static race (arr) {
    if (!Array.isArray(arr)) {
      throw new TypeError('param must be array')
    }

    const promise = new (this)(v => v)
    arr.forEach(item => {
      item.then(
        value => promise[RESOLVE_REJECT](value, STATUS_FULFILLED),
        value => promise[RESOLVE_REJECT](value, STATUS_REJECTED)
      )
    })
    return promise
  }

  static allSettled (arr) {
    if (!Array.isArray(arr)) {
      throw new TypeError('param must be array')
    }

    const promise = new (this)(v => v)

    let completeCount = 0
    let results = new Array(arr.length).fill('')

    arr.forEach((item, index) => {
      item
        .then(
          value => results.splice(index, 1, {
            status: STATUS_FULFILLED,
            value
          }),
          reason => results.splice(index, 1, {
            status: STATUS_REJECTED,
            reason
          })
        )
        .finally(() => {
          if (++completeCount === arr.length) {
            promise[RESOLVE_REJECT](results, STATUS_FULFILLED)
          }
        })
    })

    return promise
  }

  __wrappCallback (promise, resolve, reject) {
    return new function () {
      this.fulfilled = typeof resolve === 'function' ? resolve : null
      this.rejected = typeof reject === 'function' ? reject : null
      this.promise = promise
      this.isHandled = false
    }
  }
}



var a, b
;(() => {
  a=new Promiseify(resolve => {
    setTimeout(() => resolve(1), 1000)
  })
  .then(v => {
    return new Promiseify(resolve => {
        setTimeout(() => resolve('setTimeout value 2000...'), 2000)
    })
  })
  .finally(() => {
    console.log('finally finally finally')
  })
  .then(v => {
        console.log(v)
        return Promiseify.resolve(123)
    })
    .then(v => {
      console.log(v)
      return v
    })


  b = new Promiseify(resolve => {
    setTimeout(() => resolve(11), 1000)
  })
  .then(v => {
    console.log(v)
    return new Promiseify((resolve, reject) => {
      reject(22)
    })
  })
  .then(null, v => {
      console.log(v, 'reject')
  })
  .then(v => {
    console.log(v)
    return Promiseify.reject('fail fail')
  })
  .catch(v => {
    console.log('catch in', v)
  })
  .then(v => {
    console.log('after catch, change status')
    return Promiseify.reject('fail  fail fail')
  })
  .catch(v => {
    console.log('catch in', v)
    return Promiseify.reject('fail fail fail fail')
  })
  .then(null, v => {
    console.log('catch in then reject')
  })

  console.log(a)


  var c = Promiseify.all([Promiseify.resolve(1), Promiseify.resolve(2), Promiseify.resolve(3)])
    .then(res => console.log('promise all', res))

  var d = Promiseify.all([Promiseify.reject(1), Promiseify.resolve(2), Promiseify.resolve(3)])
    .then(res => console.log('promise all', res))
    .catch(e => console.log('promise all', data))

  var e = Promiseify.allSettled([Promiseify.resolve(1), Promiseify.resolve(2), Promiseify.reject(3), Promiseify.reject(4)])
    .then(data => console.log('promise all settled', data))

  var f = Promiseify.race([Promiseify.resolve(1), Promiseify.resolve(2), Promiseify.reject(3), Promiseify.reject(4)])
    .then(data => console.log('promise in race'), data)

  var g = Promiseify.race([new Promiseify(resolve => setTimeout(()=>resolve(111))), Promiseify.resolve(2), Promiseify.reject(3), Promiseify.reject(4)])
    .then(data => console.log('promise in race'), data)

})()
