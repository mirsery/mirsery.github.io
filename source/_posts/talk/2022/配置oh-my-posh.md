---
title: 配置oh-my-posh
toc: true
author: mirsery
comments: false
date: 2022-08-31 12:59:08
updated: 2022-08-31 12:59:08
tags:
    - shell
categories:
    - 装机必备
excerpt: '全平台通用神器oh-my-posh 美化终端..'
---


<!-- toc -->

## 下载安装oh-my-posh

- window平台

```shell
scoop install oh-my-posh
```

- macos

```shell
brew install oh-my-posh
```

## 下载并预览主题文件

[主题预览地址https://ohmyposh.dev/docs/themes](https://ohmyposh.dev/docs/themes) ，点击即可预览相关的主题文件。

[主题下载地址https://github.com/JanDeDobbeleer/oh-my-posh/tree/main/themes](https://github.com/JanDeDobbeleer/oh-my-posh/tree/main/themes)点击可以下载对应预览页面的主题文件

## 主题

### 新建主题保存目录
- window平台
创建文件
```shell
oh-my-posh init pwsh | Invoke-Expression
```
在terminal中执行如下指令:
```shell
notepad $profile
```
在文件中添加如下代码:
```
oh-my-posh --init --shell pwsh --config 主题路径 | Invoke-Expression

Set-PoshPrompt -Theme 主题名 
```

- linux和mac os平台

    - bash
        Bash 的配置文件一般是~/.bashrc 或者~/.profile
        ```shell
        eval "$(oh-my-posh --init --shell bash --config 主题路径)"
        ```
    - zsh
        Zsh 的配置文件为~/.zshrc
        ```shell
        eval "$(oh-my-posh --init --shell zsh --config 主题路径)"
        ```

### 修改应用主题

windows下面可以执行**Get-PoshThemes**查看主题保存的路径，并根据提示可以修改应用相关的主题

```shell
oh-my-posh init pwsh --config "$env:POSH_THEMES_PATH/jandedobbeleer.omp.json" | Invoke-Expression
```

其他的操作系统参考上一小节
