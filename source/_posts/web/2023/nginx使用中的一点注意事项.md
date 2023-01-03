---
title: nginx使用中的一点注意事项
toc: true
author: mirsery
comments: false
date: 2023-01-03 09:26:04
updated: 2023-01-03 09:26:04
tags: 
    - nginx
categories:
    - nginx
excerpt: '关于nginx服务器配置反向代理的一些xiaoweenti '
---


<!-- toc -->

## nginx 忽略起始为'_' 的参数的转发

nginx的默认配置会忽略'_'的请求头参数的转发需要在配置文件中增加如下配置，才可以实现参数的转发。
```
    underscores_in_headers on;
```

## nginx绑定主机头

```
server {
    listen 80 default;
    return 404;
}
```