### setup
it called after the initial props resolution
```
// parent.vue
<child msg="hello message~~~"></child>

// child.vue
export default {
  props: {
    msg: String
  },
  setup(props) {
    console.log(props.msg)
  }
}
// => hello message~~~
```
stepup created before the beforeCreate hook

```
export default {
  beforeCreate() {
    console.log('before create~~~')
  },
  setup() {
    console.log('setup~~~')
  }
}

// => setup~~~
// => before create~~~
```