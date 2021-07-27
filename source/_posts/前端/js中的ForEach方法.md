---
date: 2016-06-26 16:53
status: public
tags: 
    - 前端
categories:
    - 前端
title: javascript基础
---

###JavaScript数组的 forEach()方法调用数组中的每个元素。

##语法
```
array.forEach(callback[,thisObject]);
```
###下面是参数的详细信息：
        1. callback : 函数测试数组的每个元素。
        2. thisObject : 对象作为该执行回调时使用。
###返回值:
    返回创建数组
###例子
```javascript
var array = [ ];
array.push(1);
array.forEach(function (e){
    console.log(e);
});
```