---
title: 亚马逊电子书移除DeDRM
toc: true
author: mirsery
comments: false
date: 2022-06-02 13:47:31
updated: 2022-06-02 13:47:31
tags:
    - 电子书
categories:
    - 电子书
    - kindle
excerpt: ‘移除亚马逊电子书DRM版权保护’
---


<!-- toc -->

> 前提纪要
采用此方法移除Dedrm需要以下的几个前提条件:
1. 一个合法的kindle设备序列号
2. [calibre](https://calibre-ebook.com/) 客户端（本文按照mac版本进行讲解)
3. [DeDRM_tools](https://github.com/apprenticeharper/DeDRM_tools/releases) DRM移除插件


## 安装calibre 软件

这个比较简单，直接傻瓜式点击下载安装即可完成


## 安装DeDRM_tools插件

下载DeDRM_tools插件，并解压。

点击calibre > Preferences 在首选项中选择插件，如下图:
![](C4D57509-9AFB-4E56-8269-3344686772CC.png)

选择从文件加载插件,选取刚刚已经解压的**DeDRM_plugin**插件进行安装，安装结束之后在搜索栏搜索该插件，并双击该条目，显示如下：

![](78D39828-FAB0-4CB8-9F81-3930725D20F2.png)

选择**elnk kindle ebooks**条目，新增一个合法的kindle设备序列号，并保存。

## 转换电子书

亚马逊中购买电子书之后，选择**通过电脑下载USB传输**下载格式为**azw3**的电子书， 利用calibre进行电子书格式的转换可以自动移除相关的DRM。


注：自己移除的DRM电子书不能在网上私自发布仅供自己阅读，尊重版权。移除DRM实属Amazon的kindle客户端阅读起来台拉胯，iBooks中国不提供图书购买服务，不得已而为之，实属无奈。