---
title: typescript笔记1
toc: true
author: mirsery
comments: false
date: 2021-12-10 13:03:42
updated: 2021-12-10 13:03:42
tags:
    - 前端
    - js
categories:
    - js
excerpt: 'typescript是javaScript的超集，他可以编译成javaScript....'
---

# typescript 笔记 1

<!-- toc -->


## typescript的安装

使用npm包的形式安装
```shell
npm install -g typescript
```

## TypeScript的类型注解

```typeScript
function greeter(person: string){
    return "hello, "+person;
}
let user = "Jane User";
document.body.innerHtml = greeter(user)
```

TypeScript里的类型注解是一种轻量级的为函数或变量添加约束的方式。如果传入的参数不符合类型，则会编译器会给出相应的警告内容.

## 接口
TypeScript里可以定义类似java中的接口，如下所示:
```typeScript
interface Person {
    firstName: string;
    lastName: string
}

function greeter(person: Person) {
    return "Hello, " + person.firstName + "" + person.lastName;
}

let user = {firstName:"Jane",lastName:"User"};
document.body.innerHTML = greeter(user)
```

## 类
TypeScript支持JavaScript的新特性，比如支持基于类的面向对象编程。以下是官网的例子:
> 在构造函数上使用public等同于创建了同名的成员变量

```typeScript
class Student {
    fullName: string,
    constructor(public firstName,public middleInitial,public lastName){
        this.fullName = firstName + " " + middleInitial + " " + lastName;
    }
}

interface Person{
    firstName: string,
    lastName: string;
}

function greeter(person: Person){
    return "Hello, " + person.firstName + " " + person.lastName;
}


let user = new Student("Jane","M.","User");
document.body.innerHTML = greeter(user);



```

## symbol类型
> 自ECMAScript 2015起，symbol成为了一种新的原生类型，就像number和string一样。

symbol类型的值是通过Symbol构造函数创建的。
```typeScript
let sym1 = Symbol();

let sym2 = Symbol("key"); // 可选的字符串key
```

Symbols是不可以改变且唯一的。

```typeScript
let sym2 = Symbol("key");
let sym3 = Symbol("key");

sym2 === sym3; // false, symbols是唯一的
```
像字符串一样，symbols也可以被用做对象属性的键。

```typeScript
let sym = Symbol();

let obj = {
    [sym]: "value"
};

console.log(obj[sym]); // "value"
```

Symbols也可以与计算出的属性名声明相结合来声明对象的属性和类成员.

```typeScript
const getClassNameSymbol = Symbol();

class C {
    [getClassNameSymbol](){
       return "C";
    }
}

let c = new C();
let className = c[getClassNameSymbol](); // "C"
```

## 众所周知的Symbols
除了用户定义的symbols，还有一些已经众所周知的内置symbols。 内置symbols用来表示语言内部的行为。

以下为这些symbols的列表：

- Symbol.hasInstance

    方法，会被**instanceof**运算符调用。构造器对象用来识别一个对象是否是其实例。

- Symbol.isConcatSpreadable
    
    布尔值，表示当在一个对象上调用**Array.prototype.concat**时，这个对象的数组元素是否可展开。

- Symbol.iterator
    
    方法，被**for-of**语句调用。返回对象的默认迭代器。

- Symbol.match

    方法，被**String.prototype.match**调用。正则表达式用来匹配字符串。

- Symbol.replace

    方法，被**String.prototype.replace**调用。正则表达式用来替换字符串中匹配的子串。

- Symbol.search

    方法，被**String.prototype.search**调用。正则表达式返回被匹配部分在字符串中的索引。

- Symbol.species

    函数值，为一个构造函数。用来创建派生对象。

- Symbol.split

    方法，被**String.prototype.split**调用。正则表达式来用分割字符串。

- Symbol.toPrimitive

    方法，被**ToPrimitive**抽象操作调用。把对象转换为相应的原始值。

- Symbol.toStringTag

    方法，被内置方法**Object.prototype.toString**调用。返回创建对象时默认的字符串描述。

- Symbol.unscopables

    对象，它自己拥有的属性会被with作用域排除在外。
