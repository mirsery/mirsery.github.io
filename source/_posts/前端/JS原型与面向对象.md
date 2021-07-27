---
date: 2017-06-26 16:53
status: public
tags: 
    - 前端
categories:
    - 前端
title: JS原型与面向对象
---


#原型解释
原型类似经典面向对象语言中的```类```，实际上JS原型的主要用途就是使用一种类风格的面向对象和继承技术进行编码。
##对象实例化
创建新对象最简单的方法:
```javaScript
var o ={};
```
##实现继承和原型链
创建一个原型链的最好的方式: 使用一个对象的实例作为另一个对象的原型。
```javaScript
    SubClass.prototype = new SuperClass();
```
这样保持原型，因为SubClass实例的原型将是 SuperClass的一个实例，该实例不仅拥有原型，还持有SuperClass的所有属性，并且该原型指向其自身超类的一个实例。
##扩展对象
JS提供一个名为hasOwnProperty()方法辨别Object原型扩展。
```javaScript
    Object.prototype.keys = function(){
      var keys = [];
      for(var i in this)
         if(this.hasOwnProperty(i)keys.push(i);//使用hasOwnProperty()忽略原型对象上的属性从而跳过原型上的属性
         return keys;  
    };
```
##子类化原生对象
当我们对原生对象进行子类化时，由于IE浏览器的原因在子类化Array对象的时候。length属性不能被正确的反应。在这种情况下，更好的策略是单独实现原生对象的各个功能而不是扩展出子类，让我们来看看如下示例所使用的方式。
模拟Array功能而不是扩展出子类
```javaScript
function MyArray(){}
MyArray.prototype.length = 0;
(function(){
    var methods =['push','pop','shift','unshift','slice','splice','join'];
    for(var i=0;i<method.length;i++)(function(name){
        MyArray.prototype[name]=function(){
                return Array.prototype[name].apply(this,arguments);
            };
        })(methods[i]);
    })();
```
##检测函数是否可序列化(后期待补)
函数序列化就是简单接收一个函数，然后返回该函数的源码文本。稍后，我们可以使用这种简单的方法检查一个函数在我们感兴趣的对象中是否存在引用。