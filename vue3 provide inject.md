<!--
 * @Name 
 * @Description 
 * @Author clc
 * @Date 2021-04-20 15:39:24
 * @LastEditTime 2021-04-20 16:00:39
 * @Email Lengchars@gmail.com
-->

## provide 解决了什么问题
多层级数据或方法共享的问题, 组合式API, 通过 provide, inject 完成注入  
以往的解决方案   
1.逐层 props  
2.vuex (陡峭的学习成本)
3.mixin 会为所以子组件混入数据, 会带难以预料的问题, 和跟踪问题

### provide 方法命名空间冲突

- 多层级组件中, 相同的 provide 会被覆盖
- 组件同即 inject 又 provide 时, inject、provide 使用相同的命名空间时, 会有覆盖的风险
