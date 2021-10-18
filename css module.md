## css module

```
<style module>
  .trans {
    transform: rotate(45deg);
  }
</style>
```

## css module 样式穿透

```
<style module>
 .trans :global(.ttt) {
    color: blue;
  }
</style>
```