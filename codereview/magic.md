// 魔法值


bad  
0 表示的是什么订单类型 ?
```
if (orderType === 0) {
  //...
} else if (orderType = 1) {
  //...
}
```

best  
```
const SELF_ORDER = 0;
const ONLINE_ORDER = 1;
if (typeOrder === SELF_ORDER) {
  //...
} else if (typeOrder === ONLINE_ORDER) {
  //...
}
```


// bad
// 字面量

const type = {
  0: ,
  1: ,
  2: ,
  3
}
