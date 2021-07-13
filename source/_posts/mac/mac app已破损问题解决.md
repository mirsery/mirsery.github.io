---
title: mac下安装app提示已破损
date: 2021-04-15 12:02:01
author: mirsery
tags: 
	- mac
categories:	
	- mac os	
excerpt: '终端执行如下命令,配置允许任何来源的app安装,sudo spctl --master-disable...'	
---

# mac下安装app提示已破损
>  解决某些mac下某些软件安装提示app损坏等情况

- 方法一 终端执行如下命令,配置允许任何来源的app安装

```shell
sudo spctl --master-disable
```
- 方法二 终端执行如下命令

```shell
sudo xattr -r -d com.apple.quarantine /Applications/[target].app
```