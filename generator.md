```js

function getData1() {
  return new Promise( 
    (res, rej) => setTimeout( () => res('data1111 ~~~~'), 1000)
  )
}

function getData2() {
  return new Promise( 
    (res, rej) => setTimeout( () => res('data2222 ~~~~'), 1000)
  )
}


var genrator = function* () {
    const data1 = yield getData1()
    console.log(data1)
    const data2 = yield getData2()
    console.log(data2)
}

function autoGenerator (func) {
    return function () {
        const gen = func.apply(this, arguments)
        return new Promise((resolve, reject) => {
            function step (key, val) {
                try {
                    const data = gen[key](val)
                    const promise = data.value
                    if (data.done) {
                        resolve(data.value)
                    } else {
                        data.value.then(val => step('next', val))
                    }
                } catch (e) {
                    debugger
                    return reject(e)
                }
            }
            step('next')
        })
    }
}

transGenerator()()


```