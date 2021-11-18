---
title: npm下载包路径设置
toc: true
author: mirsery
comments: false
date: 2021-11-18 16:39:45
updated: 2021-11-18 16:39:45
tags:
    - js
categories:
    - 前端
excerpt: 'MAC npm 下载包路径设置'
---


<!-- toc -->

# MAC npm 下载包路径设置

## 查看npm的prefix和cache路径配置信息

```shell
npm config get cache
npm config get prefix
```

## 设置下载路径 缓存路径

```shell
npm config set cache "/cachePath"
npm config set prefix "/prefixPath"
```

## 查看npm配置信息

```shell
npm config list
```

## 清空npm缓存

```shell
npm cache clean -f 
```

## 验证缓存数据的有效性和完整性，清理垃圾数据

```shell
npm cache verfy
```