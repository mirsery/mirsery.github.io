---
date: 2016-06-15 12:39
status: public
tags: 
    - 前端
categories:
    - 前端
title: jQuery1.9+版本的一些问题
---

#关于$.("").attr()方法的一些问题
    在jQuery1.9及其之后的版本中，attr方法已经过时，操作dom的属性时会出现的一些想不到的错误，在其之后的版本方法被改为$.().prop()方法。