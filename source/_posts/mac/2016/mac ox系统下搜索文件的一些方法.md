---
date: 2016-07-24 14:02
status: public
title: 'mac ox系统下搜索文件的一些方法'
categories: 
    - mac
tags:
    - mac    
---

mac系统自带Spotlight，他可以很方便的帮助我们从文件系统中搜索寻找特定的文档和文件，但是有些情况下Spotlight并不能正常工作.对于类unix的mac ox来说自带的终端命令行才是最强的搜索工具.

> 本文参考于[https://www.macx.cn/thread-2070979-1-1.html?mod=viewthread&tid=2070979&extra=page%253D1&page=1](https://www.macx.cn/thread-2070979-1-1.html?mod=viewthread&tid=2070979&extra=page%253D1&page=1)

#通过Find命令搜索文件
find命令非常高效并且使用比较简单.
```bash
    find [路径] [参数]
```
下面是一个demo，寻找在用户根目录下的名字中包含"screen"的文件
```bash
    find ~ -iname "screen*"
```
#通过mdfind命令搜索文件
mdfind命令就是Spotlight功能的终端界面，这意味着如果Spotlight被禁用，mdfind命令也将无法工作。mdfind命令非常迅速、高效。最基本的使用方法是:
```bash
    mdfind -name 文件名
```

mdfind命令还可以通过-onlyin参数搜索特定文件夹的内容，比如:
```bash
    mdfind -onlyin ~/Library plist
```

这条命令可以搜索Library文件夹中所有plist文件。
#通过Alfred App搜索文件

#通过Spotlight App搜索文件