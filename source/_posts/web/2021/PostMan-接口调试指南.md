---
title: PostMan 接口调试指南
toc: true
author: mirsery
comments: false
date: 2021-08-27 09:59:48
updated: 2021-08-27 09:59:48
tags:
categories:
excerpt: 'Postman是API开发的一个协作平台。Postman简化构建API的每个步骤，简化了协作过程，方便开发者更快地创建更好的API...'
---


<!-- toc -->

> Postman是API开发的一个协作平台。Postman简化构建API的每个步骤，简化了协作过程，方便开发者更快地创建更好的API。

在web开发中接口的调试是必不可少的一环，为了方便接口的测试我们采用了多种调试工具。Postman提供了一种较为舒适的方式来测试接口，接下来我简要记录下postman的一些个人常用的功能。采用postman调试需要传入token的接口

## 设置线上host地址
postman提供的environment,开发者可以在environment中定义环境的变量以及给环境赋值，environment中可以配置线上host地址用来快捷切换不同环境下的接口调试。
![](85996362-D0F8-46C6-AB94-87139309B230.png)


## 在Collection中设置所有接口的认证方式
> 提供设置Collection域下的Authorization/Tests/Pre-request Script/Variables
- Authorization
支持多种方式验证方式
![](AB620B7D-F13F-48CE-BFA1-36A7FFDA255E.png)

下面以简单的**API key**类型接口测试为示例

1. 单击对应的Collection，选择**Authorization**，并在类型中选择并填入如下内容,其中**token** 为接口认证的key值(按照实际项目修改)，value中填入**Collection变量** *{{token}}* ,并选择认证的域为请求头**header**(按照实际项目修改).
![](FD4485D2-F81D-4EE6-9D6B-FA7B0BC7986F.png)

2. 点击**Variables** ，新增以下2个变量（**token**,**host**).添加**host**主要是为了接口调用的时候，默认调用本地的接口，而不借助环境变量的形式访问。
> 环境变量的参数会覆盖Collection下的参数

<!-- **lnherit auth from parent** -->

## 新建登录接口
在collection中新建接口，选择对应的GET、POST。在Authorization下的type选择**No Auth**,接着传入其余自定义的参数完成方法的构建。在tests中可以编写一些脚本对数据结果进行处理。

![](9DCF84DB-D287-43E8-A262-FABC5C0A8DAF.png)

请求接口中 **{{host}}** 是该请求所在的collection的变量或environment的引用（优先级如上文所述)
**pm.response.json()**将返回的变量解析成一个json对象（如果返回值为json格式的话），解析出登录接口返回的token值，并将token值赋给对应的collection中的变量。
**pm.collectionVariables.set("token", "token value");**将token值传递给相应的collection变量


## 新建其他接口

新建其他的接口的时候，在Authorization下的type选择**lnherit auth from parent**即可继承该collection下的请求认证参数，即接口调试无须手动传入token值，方便了接口调试。