---
title: win11使用git的小问题
toc: true
author: mirsery
comments: false
date: 2022-08-31 10:49:40
updated: 2022-08-31 10:49:40
tags:
    - git
categories:
    - 随笔
excerpt:
---


<!-- toc -->


参考资料[invalid-git-paths-on-windows/](https://brendanforster.com/notes/fixing-invalid-git-paths-on-windows/)

近期换了笔记本，win11的操作系统。在使用git的时候突然发现了一个问题，在下载项目的时候报了一个比较奇怪的错误，错误内容如下所示：

```
error: invalid path '....*******......'
```
类似这种路径不合法的错误，一开始我在远程仓库修改文件的名称，但是于事无补。

其他的电脑访问这个仓库没有任何异常。

## 解决问题

一开始我以为是git版本的问题，随即就更新了git的版本
```shell
scoop update git
```
但是更新完成之后错误依然在。查了下资料发现是由于ntfs格式的保护原因，关闭ntfs的保护即可解决问题

```shell
git global config core.protectNTFS false
```

