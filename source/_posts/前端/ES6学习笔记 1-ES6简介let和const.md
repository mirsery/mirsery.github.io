---
date: 2016-12-01 13:22
status: public
title: ES6学习笔记 1-ES6简介let和const
tags: 
    - 前端
categories:
    - 前端
---

#基本用法

##最新的 ECMAScript 标准定义了 7 种数据类型:
6 种 原始类型:
    Boolean
    Null
    Undefined
    Number
    String
    Symbol (ECMAScript 6 新定义)
Object

## let
{
    let a = 10;
    var b = 1;
}

a   //ReferencenError: a is not defined.
b   //1
let用来声明变量，用法类似于var，但是只在let命令所在的代码块有效。

## typeof (并不是一个安全的操作)
操作符返回一个字符串,指示未经计算的操作数的类型。
typeofd的一些返回值
```
Undefined	"undefined"
Null	"object" (见下方)
Boolean	"boolean"
Number	"number"
String	"string"
Symbol (ECMAScript 6 新增)	"symbol"
宿主对象(由JS环境提供)	Implementation-dependent
函数对象 ( [[Call]] 在ECMA-262条款中实现了)	"function"
任何其他对象	"object"
```
##快级作用域
```js
function f1(){
    let n = 5;
    if(true){
        let n=10;    
    }
    console.log(n);//5
}
```
## 立即执行匿名函数
//IIFE写法
(function () {
    var temp = ...;
   ... 
}());

//块级作用域写法
{
    let temp = ...;
    ...
}

另外，ES6也是规定函数本身的作用域，在其所在的块级作用域之内。
## const命令
const用来声明变量，但是声明的是常量。一旦声明常量，常量的值就不能改变。
```js
    const PI = 3.1415

    PI = 3;//PI 3.1415
    
    const PI = 3;//PI 3.1415    
```
对常量的重新赋值并不会报错，只会默默的失败。
const 的作用域与let命令相同:只在声明所在的块级作用域内有效。
## 跨模块常量
const声明的常量值在当前代码块有效，如果想设置跨模块的常量可以采用如下写法：
```js
    // constants.js
    export const A = 1;
    export const B = 2;
    
    //test.js
    import * as constants from './constants';
    console.log(constants.A);// 1
    console.log(constants.B);// 2
    
     //test2.js
    import {A,B} from './constants';
    console.log(A);// 1
    console.log(B);// 2
```
## 全局对象的属性
全局对象是最顶层的对象，在浏览器环境指的是window对象，在Node.js中指的是Global对象，在JavaScript语言中，所有的全局变量都是全局对象的属性。
ES6规定，var命令和function命令声明的全局变量属于全局对象的属性;let命令、const命令、class命令声明的全局变量，不属于全局对象的属性。
```js
    var a = 1;
    //node.js中可以写成 global.a
    //通用打法 this.a
    window.a //1
    
    let b = 1;
    window.b //undefined
```