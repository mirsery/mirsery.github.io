---
title: electron-builder打包依赖存放位置
toc: true
author: mirsery
comments: false
date: 2021-11-25 14:08:42
updated: 2021-11-25 14:08:42
tags:
categories:
excerpt: "使用 electron-builder 打包的时候会自动下载所需的依赖，但是下载过程可能因某些神秘力量而失败。因此需要手动下载，再将工具放于指定路径..."
---


<!-- toc -->

# electron-builder 打包问题
由于国内某些神秘力量会导致采用electron-builder打包app时，从GitHub等地下载依赖时导致文件的下载超时。为此，我们需要手动将依赖下载到指定的目录下面，才能进行下一步的打包工作。

## 缓存的位置

- macos

```shell
~/Library/Caches/electron

~/Library/Caches/electron-builder

~/Library/Application Support/Caches
```

- Linux 
```shell
~/.cache/electron-builder
```

- windows
```shell
%LOCALAPPDATA%\\electron\\cache
%LOCALAPPDATA%\\electron-builder\\cache
```