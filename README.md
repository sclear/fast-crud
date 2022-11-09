完成相似且枯燥的业务费时间 且是一件特别折磨的事请，为解决这档子枯燥

来尝试配置开启更折磨的编码方式, 或许配置比较多 但是这是为了特殊业务扩展`配置`灵活性的业务能力

引入了[unocss](https://uno.antfu.me/)助力

### useServer

是一种有趣味、高效的 request 方式.

举例：

```ts
const params = reactive({});
const { data, run, loading } = useServer({
  api: "list",
  data: params,
  autoRun: true,
});
```

做到这里我们已经完成了接口的调用. 某些情况 response 可能并不是我们想要的数据结构,这里开放了`beforeSetData`改造数据结构

### Form

#### Form

- form `FormItem[]`
  formItem 集合

- disabled ?`boolean`
  全局的 disabled

- onChange ?`()=> void`
  全局的 onChange

- createRule ?`(ruleInstance)=> Record<string, RuleItem[]>`

- onSuccess ?`(data)=> void`
  表单校验通过触发. 当存在外层嵌套 dialog 时. 会提交(验证成功 | 表单成功)时候触发

- onError ?`(data)=> void`
  表单错误触发。 当存在外层嵌套 dialog 时候. 嵌套时与前者同理

#### FormItem

- type ?`string`  
  选择需要的组件类型,这是允许自定义的

- label ?`string`  
  字段描述,同时它也会键入 placeholder(支持自定义)
- row ?`[number, number]`  
  栅格布局[a, b],a: 占据格 b: 偏移格

- align ?`left | right |center`
  render 函数对齐方式

- labelWidth ?`string`
  与 ElPlus 同意

- placeholder ?`string`

- dataSource ?`unknown`
  组件需要读取的数据源

- customProps ?`unknown`
  组件自定义的 props

- onChange ?`(data)=> void`
  当前项更改时

- vIf ?`({ text, data })=> boolean`
  与 v-if 同意

- vDisabled ?`({ disabled, data })=> boolean`
  禁用

- render ?`({ disabled })=> JSX.Element`
  自定义渲染

- renderFormItem ?`()=> JSX.Element`
  自定义渲染 FormItem 项

### Table

#### Column

- prop `string`

- label `string`

- render `()=> JSX.Element`

#### Table

- api ?`Api`
