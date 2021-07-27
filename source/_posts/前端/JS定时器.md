---
date: 2018-09-21 10:22:14
status: public
tags: 
    - 前端
categories:
    - 前端
title: JS定时器
---


#定时器
定时器可以（available）在JavaScript中使用，但我们没说它是JavaScript自身的一个功能——定时器不是JavaScript的一项功能。定时器作为对象和方法的一部分，才能在浏览器中使用。也就是说，如果我们在非浏览器环境中使用JavaScript，很可能定时器就不存在了。我们不得不使用特定实现的功能（如Rhino中的线程），来实现我们自己的定时器版本。
定时器提供了一种让一段代码在一定毫秒之后，再异步执行的能力。由于JavaScript是单线程的特性（同一时间只能执行一处JavaScript代码），定时器提供了一种跳出这种限制的方法，以一种不太直观的方式来执行代码。
##定时器和线程是如何工作的
###设置定时器
JS提供了两种方式设置定时器 

|方法|格式|描述|
|---|---|---|
|setTimeout|id = setTimeout(fn,delay)|启动一个定时器，在一段时间（delay）之后执行传入的callback，并返回该定时器的唯一标识|
|clearTimeout|clearTimeout(id)|如果定时器还未触发，传入定时器标识即可取消（清除）该定时器|
|setInterval|id = setInterval(fn,delay)|启动一个定时器，在每隔一段时间（delay）之后都执行传入的callback，并返回该定时器的唯一标识|
|clearInterval|clearInterval(id)|传入间隔定时器标识，即可取消（清除）该间隔定时器|

JavaScript定时器的操作方法（均为window的方法）

这些方法允许我们设置和清楚定时器，可以让定时器在一个时间点后触发也可以每隔一段时间触发。
> 注:JavaScript定时器的延时时间是不能保证的

##执行线程中的定时器定时器执行
在[Web worker]()可用之前，浏览器中所有的JS代码都是在单线程中执行的。
![](2017-01-06-16-21-59.jpg)

##timeout和interval之间的区别

![](2017-01-06-16-23-18.jpg)

这两段代码功能似乎是相同的，但是在setTimeout()代码中要在前一个callback回调执行结束并延时10s(可能更多但不会更少)以后才能再次执行setTimeout(),而setInterval()则是每隔10ms就尝试执行callback回调，而不关注上一个callback是什么时候执行的。