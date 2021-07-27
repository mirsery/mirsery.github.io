---
date: 2016-06-26 16:53
status: public
title: 五个常用的js库
tags: 
    - 前端
categories:
    - 前端
---

在此文中，我来分享五个非常有用的JavaScript库，来帮助你简化前端开发。

#Moment.js
这是个非常强大的JavaScript库，能帮助你非常容易的修改和展示日期，同时也是非常轻量级的（大约12KB），能轻易地应用到Web应用中。例如，如果要显示10天前的日期，只用下面的代码即可：
```
moment().subtract(10, 'days').calendar();  //will display date in the format mm/dd/yyyy
```
项目地址：GitHub–[https://github.com/moment/moment/](https://github.com/moment/moment/)

#Hello.Js
你是否对在网站里集成各种不同的社交登录方式感到无比头疼？好吧，赶紧过来看看这个JavaScript库吧，它提供了对不同社交网站登录方式的集成，使得你可以方便地使用标准的路径并且获得通用的响应。因此，你不再需要逐个翻阅不同社交平台提供的开发文档和SDK了。你所需要做的仅仅是在项目里引入Hello.js，然后就可以享受它的强大了。

项目地址：GitHub–[https://github.com/MrSwitch/hello.js](https://github.com/MrSwitch/hello.js)

#is.js
是否对写各种正则表达式和格式验证代码感到无比疲惫？现在不用愁了，因为你可以使用is.js来拯救自己。无论是电子邮件地址、电话号码还是什么各种格式的验证，is.js统统搞定，并且允许你轻易去做扩展，来点例子：
```
is.email('test@test.com'); //check if the given string is valid email
is.creditCard(378282246310005);  //checks for valid credit card
```
项目地址：GitHub–[https://github.com/arasatasaygin/is.js](https://github.com/arasatasaygin/is.js)

#Underscore.js
Underscore.js提供了超过100个常用的函数，可以帮助你加速日常开发。你可以将你JS代码中那些繁琐固定却无法避免的代码放心交给它来完成，并且避免自己手动实现可能带来的不稳定性，从而极大地提高生产力。它最厉害的地方在于，发布版本代码只有5.7K，这意味着它对你应用程序的加载速度几乎没什么大的影响。

项目地址：GitHub—[https://github.com/jashkenas/underscore](https://github.com/jashkenas/underscore)

#Awesomplete
一个轻量级、零依赖的JavaScript库，可以帮你实现自动完成（输入）功能。用起来也超级简单，引入JS和CSS文件，不到一分钟就可看到效果。压缩之后的代码不到2KB，非常适合生产环境使用，就跟它的英文名字意思一样，真是“超厉害的自动完成”！

项目地址：GitHub–[https://github.com/LeaVerou/awesomplete](https://github.com/LeaVerou/awesomplete)