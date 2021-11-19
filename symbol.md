
## Object.values, Object.enteries 无法返回 symbol 键名的属性
```
const CUS_KEY = Symbol()
const obj = {
  [CUS_KEY]: 100
}

console.log(Object.values(obj))     //=>  []
console.log(Object.entries(obj))    //=>  []
``` 
entery