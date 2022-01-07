---
title: vue模板的使用
toc: true
author: mirsery
comments: false
date: 2022-01-07 12:37:38
updated: 2022-01-07 12:37:38
tags:
    - vue
categories:
    - 前端
excerpt: 'vuejs中使用模版渲染的示例'
---


<!-- toc -->

在前端项目中经常会遇到需要动态渲染页面的功能，一般情况下我们可以采用原生的js进行手动的插入和编写。在vue项目中可以借用vue提供的方法进行模版渲染。
在vue3中可以采用component组件进行动态渲染，vue2中则可以采用extend来实现。本文基于vue2来展示动态渲染示例。

## vue社区api描述

Vue.extend( options )
- 参数
    - {Object} options
- 用法
   使用基础 Vue 构造器，创建一个“子类”。参数是一个包含组件选项的对象。

**data** 选项是特例，需要注意 - 在 **Vue.extend()** 中它必须是函数
```html
<div id="mount-point"></div>
```

```js
// 创建构造器
var Profile = Vue.extend({
  template: '<p>{{firstName}} {{lastName}} aka {{alias}}</p>',
  data: function () {
    return {
      firstName: 'Walter',
      lastName: 'White',
      alias: 'Heisenberg'
    }
  }
})
// 创建 Profile 实例，并挂载到一个元素上。
new Profile().$mount('#mount-point')
```
结果如下：
```html
<p>Walter White aka Heisenberg</p>
```

## 组件的使用和创建

- 基本示例


```js
// 定义一个名为 button-counter 的新组件
Vue.component('button-counter', {
  data: function () {
    return {
      count: 0
    }
  },
  template: '<button v-on:click="count++">You clicked me {{ count }} times.</button>'
})
```

组件是可复用的 Vue 实例，且带有一个名字：在这个例子中是 **<button-counter>**。我们可以在一个通过 new Vue 创建的 Vue 根实例中，把这个组件作为自定义元素来使用：

```html
<div id="components-demo">
  <button-counter></button-counter>
</div>
```

```js
new Vue({ el: '#components-demo' })
```

因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。