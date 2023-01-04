---
title: scoop安装
toc: true
author: mirsery
comments: false
date: 2023-01-04 22:40:03
updated: 2023-01-04 22:40:03
tags:
    - win
categories:
    - 软件安装
excerpt: '让win像linux一样管理软件'
---


<!-- toc -->

mac 有homebrew，linux有yum，apt，apk等等。对于win平台如果高效快捷的管理软件，我们可以使用scoop来管理我们的软件。

以下是安装命令，在powershell中直接运行如下代码：

```shell
# scoop 安装
Set-ExecutionPolicy RemoteSigned -scope CurrentUser;
iwr -useb https://gitee.com/glsnames/scoop-installer/raw/master/bin/install.ps1 | iex
scoop config SCOOP_REPO 'https://gitee.com/glsnames/scoop-installer'
scoop update
```