---
title: 将exe封装为系统服务开机自启
toc: true
author: mirsery
comments: false
date: 2022-08-31 15:10:57
updated: 2022-08-31 15:10:57
tags:
    - win
categories:
    - 运维
excerpt: '使用微软提供的开发者工具进行exe程序的封装...'
---


<!-- toc -->

> 本文使用的资源地址

[点击下载微软提供的开发者工具](tools.zip)

## 目录列表如下所示

将下载下的资源解压到根目录，目录结构如下所示:

```
instsrv.exe
srvany.exe
[targetEXE].exe
install.bat
uninstall.bat
```

> 其中 **[targetEXE].exe** 为所需要打包的exe程序，**instsrv.exe 和 srvany.exe**是开发工具内的文件


## install.bat 安装程序为系统服务脚本

```bat
@echo off
cd /d %~dp0

rem 定义需要运行的程序路径
set curExe=%~dp0[targetEXE].exe
rem 定义注册表路径
set regpath=HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\[customServieName]\Parameters\
rem 定义srvany.exe文件路径
set sourcePath=%~dp0srvany.exe

rem 安装引导服务
instsrv [customServieName]  "%sourcePath%"
@echo 服务添加完成

rem 添加注册表语法: reg add 注册表路径 /v 项名称 /t 值类型 /d 数据 /f 表示强行修改不提示

rem 名称 Application 值为你要作为服务运行的程序地址 /d对应的参数有斜杠不是为了转义引号，而是路径还有斜杠，默认将引号转义了，额外添加斜杠是为了保留引号
reg add %regpath% /v AppDirectory /t REG_SZ /d "%~dp0\" /f

rem 名称 AppDirectory 值为你要作为服务运行的程序所在文件夹路径
reg add %regpath% /v Application /t REG_SZ /d "%curExe%" /f

rem 名称 AppParameters 值为你要作为服务运行的程序启动所需要的参数
reg add %regpath% /v AppParameters /t REG_SZ /f

net start [customServieName]

@echo 注册表添加完成
pause

```

## uninstall.bat 移除服务脚本
```bat
@echo off
rem 进入当前目录
cd /d %~dp0

net stop [customServieName]

rem 卸载引导服务
instsrv [customServieName] remove
@echo 卸载完成
pause

```