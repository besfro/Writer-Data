<!--
 * @Name 
 * @Description 
 * @Author clc
 * @Date 2021-08-20 14:04:55
 * @LastEditTime 2021-08-20 14:05:18
 * @Email Lengchars@gmail.com
-->


https://github.com/vuejs/vue-next/blob/master/packages/compiler-sfc/src/compileScript.ts

```
   if (
      (node.type === 'ExportNamedDeclaration' && node.exportKind !== 'type') ||
      node.type === 'ExportAllDeclaration' ||
      node.type === 'ExportDefaultDeclaration'
    ) {
      error(
        `<script setup> cannot contain ES module exports. ` +
          `If you are using a previous version of <script setup>, please ` +
          `consult the updated RFC at https://github.com/vuejs/rfcs/pull/227.`,
        node
      )
    }
```