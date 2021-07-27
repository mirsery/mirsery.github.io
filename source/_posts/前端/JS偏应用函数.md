---
date: 2016-06-26 16:53
status: public
tags: 
    - 前端
categories:
    - 前端
title: 偏应用函数
---


##偏应用函数
“分布应用”一个函数是一项特别有趣的技术，在函数调用之前我们可以预先传入一些函数。实际上，偏应用函数返回了一个含有预处理参数的新函数，以便后期可以调用。
这种在一个函数中首先填充几个参数(然后在返回一个新函数)的技术称为柯里化。
🌰  我们希望将一个字符串分隔成CSV(逗号分隔)，并忽略多余的空格，我们可以很容易的通过一个正则表达式，使用String的split()方法做到这一点。
````javaScript
    var elements = "val1,val2,val3".split(/,\s*/);
```
现在让我们编写一个CSV( )方法做这件事并假设使用柯里化。
```javaScript
String.prototype.csv = String.prototype.split.partial(/,\s*/);
var result = ("Mugan,Jin,Fuu").csv();
```
Prototype库中的分部/柯里化方法的实现如下:
```javaScript
    Function.prototype.curry = function(){
      var fn = this,
        args = Array.prototype.slice.call(arguments);
        return function(){
            return fn.apply(this,args.concat(
             Array.prototype.slice.call(arguments)));
        };
    };
```
一个分部函数事例:
```javaScript
Function.prototype.partial = function(){
    var fn =  this,args = Array.prototype.slice.call(arguments);
    return function(){
        var arg = 0;
        for(var i=0;i<args.length && args<arguments.length;i++){
            if(args[i]==undefined){
                args[i]=arguments[arg++];
            }
        }
        return fn.apply(this,args);
    }
};
```
实现一个10ms后进行调用的异步函数
```javaScript
var delay = setTimeout.partial(undefined,10);
delay(function(){
   .... .... 
});
```
当然我们也可以创建一个简单的函数用于事件绑定
```
var bindClick = document.body.addEventListener.partial("click",undefined,false);
bindClick(function(){
 ... ...
});
```