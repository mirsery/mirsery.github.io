---
date: 2018-9-21 10:22:04
status: public
title: 代码求值
tags: 
    - 前端
categories:
    - 前端
---


JavaScript可以在代码执行时动态地执行解释代码。

##代码求值机制
在javaScript中有很多代码求值机制

- eval( ) 函数
- 函数构造器
- 定时器
- \<script>元素

##使用eval( ) 方法进行函数求值
eval( ) 定义在全局作用域，该方法将在当前上下文执行所传入字符串形式的代码，执行返回结果是最后一个表达式的执行结果。
###基本功能
- 该方法将执行传入代码的字符串
- 在调用eval( ) 方法的作用域内进行代码求值。
eval 创建的函数会继承该作用域的闭包 - - -局部作用域内执行eval()时的衍生结果。

##使用函数构造器进行求值
JavaScript中的所有函数都是Function的实例
直接通过Function构造器实例化函数
```javaScript
    var add=new Function("a","b","return a+b;");
```
> 使用Function构造器方式创建函数的时候不会创建闭包

##用定时器进行求值
定时器可以对代码字符串进行求值，而且还是异步的。
我们使用定时器的时候一般传递给定时器一个内联函数或者函数引用，这是setTimeout()、setInterval()方法推荐使用的方式，但是这些方式也可以接受字符串的传入，从而在定时器触发的时候进行求值。
示例如下:

```javaScript
var tick = window.setTimeout('alert("hi")',100);
```
大致相当于new Function()的使用方式。

##全局作用域内的求值操作

我们可以把将要执行的代码放在动态的\<script>标签内，并将标签注入到文档中。
##函数序列化(“反编译”)

toString ( ) --------------JavaScript可以把已经求值的代码转换成字符串。

##面向切面的脚本标签
AOP或面向切面编程。----------维基百科对AOP的定义:“一种旨在通过分离横切关注点而增加模块化的编程范式”。
简单的说AOP技术可以在运行时将代码进行注入并执行一些横切代码，如日志记录、缓存、安全检查等。AOP引擎将在运行时添加日志代码而不是在原有代码中添加大量的日志语句以便让开发人员在开发期间不用关注这些事情。
比方说我们可以创建一个类型为onload的新脚本。
我们可以指定如下的代码块实现。
```html
<script type"x/onload">
... ...
</script>
```
创建一个在页面加载后才执行的脚本标签类型。
```javaScript
<script type"text/javascript">
window.onload =  function(){
    var scripts = document.getElementByTagName("script");
    for(var i=0;i<scripts.length;i++){
        if(scripts[i].type=="x/onload"){
            globalEval(Scripts[i].innerHTML);
        }
    }
}
</script>
```
这是一个简单的例子，但是这种技术更复杂且有更有意义的用途。例如:将自定义脚本快和JQuery.tmpl()方法一起使用，用于提供运行时模板，利用它可以在用户界面上执行脚本或者在准备操作DOM的时候甚至是相邻元素上执行脚本。

##元语言和领域特定语言(待补)