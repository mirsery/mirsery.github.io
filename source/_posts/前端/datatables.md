---
date: 2016-06-12 23:05:00
status: public
tags: 
    - 前端
    - 插件
categories:
    - 前端
title: datatables
---

#datatables插件的一些不常用的用法

##隐藏列表的标题
    
这个问题可以利用的css的来解决只要隐藏<thread>的样式就可以实现。以下是一个存在<div id="demo-table">下的datatables的示例。

```js
<style type="text/css">
div#demo-table thead {
    display: none;
}
</style>        
```