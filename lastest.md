<!--
 * @Name 
 * @Description 
 * @Author clc
 * @Date 2021-08-18 11:00:33
 * @LastEditTime 2021-08-18 11:15:26
 * @Email Lengchars@gmail.com
-->


空值运算符 stage4
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator
```
const a = window.noName ?? 'igo'
//=> var o;
//=> const a = null != (o = window.userName) ? o: "igo";
```

// 可选链 stage4
// https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Optional_chaining
```
const a = window?.userInfo?.name ?? 'igo'
//=> var o, n;
//=> const s = null != (n = null == (o = null == window ? void 0 : window.userInfo) ? void 0 : o.name) ? n: "igo";
```