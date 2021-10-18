<!--
 * @Name 
 * @Description 
 * @Author clc
 * @Date 2021-09-16 10:55:13
 * @LastEditTime 2021-09-16 10:56:51
 * @Email Lengchars@gmail.com
-->
vue 3 watch

思考
为什么watch是方法 () => props.value
而不是 props.value


watch(() => props.visiable, value => {
  if (value === true) {
    resetForm()
    // 首次进入 pagoda table 还未 mounted
    // mounted 后默认有 request
    tableRef?.value?.refresh()
    selectState.selectVal = modelValue?.customerCode ?? ''
    selectState.selectDetail = modelValue
  }
})