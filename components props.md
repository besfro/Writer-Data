<!--
 * @Name 
 * @Description 
 * @Author clc
 * @Date 2021-08-16 17:57:38
 * @LastEditTime 2021-08-16 18:10:33
 * @Email Lengchars@gmail.com
-->
## 组件props 

组件没有定义props时, setup props 为空, 所有属性将作为普通数据传入到 attrs 里, 而非在setup props里

通常情况下我们都会定义并导出传参类型
defineComponent二次定义props会提高维护成本

[https://github.com/vuejs/vue-next/issues/1155](https://github.com/vuejs/vue-next/issues/1155)