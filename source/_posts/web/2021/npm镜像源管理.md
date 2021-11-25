---
title: npm镜像源管理
toc: true
author: mirsery
comments: false
date: 2021-11-25 13:42:58
updated: 2021-11-25 13:42:58
tags:
categories:
excerpt: ‘nrm npm镜像源管理工具’
---


<!-- toc -->

    国内由于众所周知的原因，在我们使用npm工具构建前端项目时总会发生一些令人沮丧的事情，每次都需要手动更换镜像源。nrm(npm registry manager)是npm的镜像源管理工具，有时候国外资源太慢，使用这个就可以快速地在 npm 源间切换。

## 全局安装nrm

```shell
npm i -g nrm
```

## 使用nrm

> 查看可用镜像源

```shell
nrm list
```

> 选择使用镜像源

```shell
nrm use <name>
```

> 增加定制源
```
nrm add <registry> <url>
```
其中reigstry为源名，url为源的路径。


> 删除镜像源

```shell
nrm del <registry>
```

> 测试源速度

```shell
nrm test npm
```