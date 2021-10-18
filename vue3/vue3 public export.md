<!--
 * @Name 
 * @Description 
 * @Author clc
 * @Date 2021-08-26 16:23:16
 * @LastEditTime 2021-08-26 16:23:30
 * @Email Lengchars@gmail.com
-->
```
import { getCurrentInstance } from 'vue';
import { extend } from '../utils';

// expose public api
export function useExpose<T = Record<string, any>>(apis: T) {
  const instance = getCurrentInstance();
  if (instance) {
    extend(instance.proxy, apis);
  }
}
```

https://github.com/youzan/vant/blob/dev/src/composables/use-expose.ts