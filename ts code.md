```
// 排除 T 在 U 集合里的元素
type Exclude_<T, U> = T extends U ? never : T

// 创建一个类型, 并设置从类型里提取的属性
// Pick<T, 'name' | 'user'>
type Pick_<T, K extends keyof T> = {
    [P in K]: T[P]
}

type Omit_<T, U> = Pick_<T, Exclude_<keyof T, U>>

type Partial_<T> = {
    [P in keyof T]?: T[P]
}

type Required_<T> = {
    [P in keyof T]: T[P]
}

```

// 服用类型的某个属性
```
type PropertyPick<T, K extends keyof T> = T[K]
```