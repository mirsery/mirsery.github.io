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
ulimit -SHn 65535 # /etc/bashrc 文件末尾新增如下内容
```

- 解除linux系统最大打开文件数量可以修改 Linux 的极限配置文件 ** /etc/security/limits.conf ** 来解决，修改此文件加入
```shell
soft nofile 100000
hard nofile 100000
```

- 修改nginx.conf配置文件

```shell
worker_processes auto;

worker_rlimit_nofile 65535;
events {
    worker_connections 65535;
}
```

## nginx跨域配置(允许跨域)
```shell
#坑：1、'Access-Control-Allow-Credentials': true 是不能*  可以 add_header 'Access-Control-Allow-Origin' $http_origin;

if ($request_method = 'OPTIONS') {
	add_header 'Access-Control-Allow-Origin' '*';
	add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';

	# Custom headers and headers various browsers *should* be OK with but aren't
	add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';

	# Tell client that this pre-flight info is valid for 20 days
	add_header 'Access-Control-Max-Age' 1728000;
	add_header 'Content-Type' 'text/plain charset=UTF-8';
	add_header 'Content-Length' 0;
	return 204;
}
if ($request_method = 'POST') {
	add_header 'Access-Control-Allow-Origin' '*';
	add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
	add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
}
if ($request_method = 'GET') {
	add_header 'Access-Control-Allow-Origin' '*';
	add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
	add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type';
}
```