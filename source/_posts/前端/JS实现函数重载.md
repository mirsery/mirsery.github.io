---
date: 2018-09-21 10:22:15
status: public
tags: 
    - 前端
categories:
    - 前端
title: JS函数重载
---

思路:
    在编写一些面向对象的函数的时候我们的操作步骤是:先创建一个对象，然后使用相同的名称，将方法添加到对象上。因此我们可以采用如下的思路实现为每个重载创建一个独立的匿名函数。

```js
    var ninja={};
    addMethod(ninja,'whatever',function(){/**do something interesting**/});
    addMethod(ninja,'whatever',function(a){/**do something interesting**/});
    addMethod(ninja,'whatever',function(a,b){/**do something interesting**/});
```

我们需要实现addMethod()函数
```js
    function addMethod(object,name,fn){
        var old = object[name];
        object[name] = function(){
            if(fn.length == arguments.length){
                return fn.apply(this,arguments)
            }else if(typeof old == 'function'){
                return old.apply(this,arguments);
            }
        };
    }
```