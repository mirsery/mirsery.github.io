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

## nginx报错accept4() failed (23: Too many open files in system)

- 首先查看系统对打开文件数目的限制

```shell
ulimit -n
ulimit -Sn #查看软限制
ulimit -Hn #查看硬限制
```

- 修改ulimit的限制
```shell
ulimit -n 65535 # /etc/bashrc 文件末尾新增如下内容

# /etc/security/limits.conf 末尾新增如下内容
* soft nofile 65535
* hard nofile 65535
```

> 要使limits.conf文件生效，必须要确保pam_limits.so文件被加入到启动文件中

- 修改nginx.conf配置文件

```shell
worker_processes auto;

worker_rlimit_nofile 65535;
events {
    worker_connections 65535;
}
```