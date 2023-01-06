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

# 更改脚本执行策略
Set-ExecutionPolicy RemoteSigned -scope CurrentUser;

# 安装命令
iwr -useb https://gitee.com/glsnames/scoop-installer/raw/master/bin/install.ps1 | iex

scoop config SCOOP_REPO 'https://gitee.com/glsnames/scoop-installer'

scoop update
```

## 基础命令合集

```shell
scoop help #查看帮助
scoop help <cmdName> # 具体查看某个命令的帮助

scoop install <appName>   # 安装 APP
scoop uinstall <app>  # 卸载 APP

scoop list  # 列出已安装的 APP
scoop search # 搜索 APP
scoop status # 检查哪些软件有更新

scoop update # 更新 Scoop 自身
scoop update appName1 appName2 # 更新某些app
scoop update *  # 更新所有 app （前提是需要在apps目录下操作）

scoop bucket known #通过此命令列出已知所有 bucket（软件源）
scoop bucket add bucketName #添加某个 bucket

scoop cache rm <appName> # 移除某个app的缓存

```


## 卸载命令

> 很危险，此命令会删除scoop下面的所有软件

```shell
scoop uninstall scoop
```

## 换源

```shell
scoop bucket add extras
```

## 安装软件

```shell
scoop install [appname]
```

## 检测当前安装是否有问题

```shell
scoop checkup
```

## 利用aria2进行断点续传

首先安装aria2

```shell
scoop install aria2
```

下载其他软件失败后进行断点续传

```shell
aria2c.exe --input-file='{your path}'
```

当提示下载完成之后需要再次运行scoop对应的更新或者安装命令，即可完成app的更新或者安装

```shell
scoop update <appName>
```

## 打开某个app的主页

```shell
scoop home <appName>
```

## 显示某个app的信息

```shell
scoop info <appName>
```