---
date: 2021-05-12 16:33:38
status: public
title: 简易dokcer私服搭建脚本
categories: 
    - docker
tags: 
    - docker
---


>  项目链接地址
> 文件下载地址[easy-registry.zip](/_attachments/2021-05-12/easy-registry.zip)

## 目录结构
├── certs
│   ├── auth.cert
│   └── auth.key
├── config
│   ├── registry
│   │   └── config.yml
│   └── web
│       └── config.yml
├── docker-compose.yml
└── easy-satrt.sh

## step 1 工具环境准备
- 安装docker、docker-compose工具。（略）
- 安装openssl

##step 2 修改配置文件
修改config->registry->config.yml  中的<my-registry-web>为当前部署的docker-web-ui的外网访问地址

##step3 在文件目录下执行脚本easy-satrt.sh
```shell
./easy-satrt.sh
```
