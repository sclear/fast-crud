## 配置 crud

精简的配置开发, 精简却能自定义 很明显它`大有用武之地`

### useServer

是一种高效的 request 方式. 携带 Mock 功能 让你对接总能快人一步

```ts
const { data, run, loading, config } = useServer({
  api: "list",
  data: {},
  autoRun: true,
});
```

特殊情况 response 可能并不是我们想要的数据结构,这里开放了`beforeSetData`改造数据结构

### Form

```tsx
const formOption = CreateFormOption({
  form: [
    {
      type: "Input",
      model: "phone",
    },
    {
      type: "Input",
      model: "password",
      customProps: {
        type: "password",
      },
    },
    {
      align: "center"
      render() {
        return <Button></Button>
      }
    }
  ],
  createRule(create) {
    return {
      phone: create.must().phone(),
      password: create.must()
    }
  }
});
```

### Table

```tsx
const tableOption = createTableOption({
  api: "list",
  column: [
    {
      prop: "id",
      label: "id",
    },
    {
      prop: "name",
      label: "学生姓名",
    },
  ],
});
```

#### Dialog

```tsx

```
