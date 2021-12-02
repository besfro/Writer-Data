### useRequest 简版异步请求管理 hook


core  
```
import { ref } from 'vue'
DEBOUNCE_INTERVAL = 500

function checkedFn (fn) {
  return typeof fn === 'function'
}

function debounce (fn, delay) {
  if (typeof fn !== 'function') return
  
  let promise, resolve, reject, timer

  function reset () {
    [promise, resolve, reject, timer] = Array(4).fill(null)
  }
  
  return function (...args) {
    if (promise) {
      clearTimeout(timer)
    } else {
      promise = new Promise((res, rej) => {
        resolve = res
        reject = rej
      })
    }

    timer = setTimeout(() => {
      fn.apply(null, args)
        .then(
          data => resolve(Promise.resolve(data)),
          data => reject(Promise.reject(data))
        )
        .finally(() => reset())
    }, delay)

    return promise
  }
}


/**
 * 异步请求管理
 * @param {() => Promise<any>} request - 返回结果为 promise 的函数
 * @param {object} config
 * @param {boolean} config.manual - 是否手动发送请求 def:false
 * @param {boolean} config.initialData - 默认数据 def:undefined
 * @return {object} result 
 *         {ref<bolean>} result.loading - 是否请求中
 *         {ref<Error>} result.error - 错误信息
 *         {ref<any>} result.data - 返回的数据
 *         {function} result.run - 执行请求
 *         {function} result.onSuccess - 请求成功回调 
 *         {function} result.onError - 请求失败回调 
 *         {function} result.onFinish - 请求完成回调 
 */

export default function (request, config) {
  if (typeof request !== 'function') {
    result.error = new TypeError('useRequest parameter 1 is not of type function')
    return result
  }
  
  const voidValue = void 0
  const manual = config?.manual ?? false
  const initialData = config?.initialData ?? voidValue

  let onSuccessHandle = v => v
  let onErrorHandle = v => v
  let onFinishHandle = v => v

  const data = ref(initialData)
  const error  = ref(null)
  const loading = ref(false)

  let lastFetchId = 0
  function run (...args) {
    console.log(performance.now())
    const fetchId = lastFetchId +=1
    loading.value = true

    const isCurrentRequest = () => fetchId === lastFetchId

    try {
      const service = request(...args)
      if (service instanceof Promise) {
        return service
          .then(resData => {
            if (isCurrentRequest()) {
              error.value = voidValue
              data.value = resData
              onSuccessHandle(resData)
            }
          })
          .catch(e => {
            if(isCurrentRequest()) {
              error.value = e
              data.value = voidValue
              onErrorHandle(e)
            }
          })
          .finally(() => {
            if(isCurrentRequest()) {
              loading.value = false
              onFinishHandle()
            }
          })
      } else {
        data.value = service
        return Promise.resolve(data)
      }
    } catch (e) {
      if (isCurrentRequest()) {
        error.value = e
        loading.value = false
        onErrorHandle(e)
        return Promise.reject(e)
      }
    }
  }

  !manual && run()
  return {
    data,
    loading,
    error,
    run: debounce(run, DEBOUNCE_INTERVAL),
    onSuccess: cb => checkedFn(cb) && (onSuccessHandle = cb),
    onError: cb => checkedFn(cb) && (onErrorHandle = cb),
    onFinish: cb => checkedFn(cb) && (onFinishHandle = cb),
  }
}
```


template  
```
<div v-if="loading">loading...</div>
<div v-if="data">data: {{ data }}</div>
<div v-if="error">error: {{ dError.message }}</div>
```

单个请求  
```
const service = () => 
  new Promise(
    resolve => setTimeout(
      () => resolve({ orderId: 343434, name: 1232, spce: 333, price: 20 }), 
      2000
    )
  )
const { data, error, loading } = useRequest(service)
```

依赖关系请求  
```  
const getOrderList = () => new Promise((resolve, reject) => setTimeout(() => reject({message: '查询订单列表失败'}), 2000))
const getOrderDetail = orderId => 
  new Promise(
    resolve => setTimeout(
      () => resolve({ orderId, name: 1232, spce: 333, price: 20 }), 
      2000
    )
  )

async function getUserOrderDetail () {
  const listRequest = useRequest(getOrderList, { manual: true })
  await listRequest.run()

  if (listRequest.error.value) return Promise.reject(listRequest?.error?.value)
  
  const orderId = listRequest?.data?.value?.[0]?.orderId
  return getOrderDetail(orderId)
}

const { data, error, loading} = useRequest(() => getUserOrderDetail())

```