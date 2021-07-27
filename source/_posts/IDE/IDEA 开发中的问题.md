---
date: 2020-10-11 00:17:00
status: public
title: 'IDEA开发中的问题'
categories:
   - ide
tags:
   - ide
   - 快捷键
---

# IDEA 解决jar包下载不完全的问题
    由于网络等复杂原因会导致idea中导入maven项目时下载依赖不完全，致使项目无法正常启动。
    此时可以采用```mvn idea:idea```或```mvn -U idea:idea```下载不完全的包