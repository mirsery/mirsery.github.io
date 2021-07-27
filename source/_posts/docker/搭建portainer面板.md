---
date: 2021-01-22 14:58:53
status: public
title: Portainer的部署安装
categories: 
    - docker
tags: 
    - docker
---


<!-- toc -->

# Portainer的部署安装和汉化
> Portainter是Docker图形化管理工具，提供状态显示面板，应用快速部署，容器镜像网络数据卷的基本操作（包含上传下载镜像、创建容器等操作）、事件日志显示、容器控制台操作，Swarm集群和服务等几种管理和操作，登录用户管理和控制等功能。

## 官方手册地址
[https://documentation.portainer.io/v2.0/deploy/linux/#deploy-portainer-in-docker](https://documentation.portainer.io/v2.0/deploy/linux/#deploy-portainer-in-docker)

## 汉化包下载
[下载汉化包public.zip](/_attachments/2021-01-22/public.zip)

## 独立容器形式运行Portainer
```bash
sudo docker run -d -p 9000:9000 \
--restart=always  \
-v /var/run/docker.sock:/var/run/docker.sock \
-v /mnt/prtainer/data:/data \
-v /mnt/prtainer/public:/public \
--name prtainer  \
portainer/portainer 
```
其中*/mnt/prtainer/public* 为Portainer汉化包的路径
Portainer 的数据存放在内部/data 目录，这样容器重启的时候数据会丢失，所以要确保数据持久化。

## stack 方式启动
- 下载stack文件
```bash
 curl -L https://downloads.portainer.io/portainer-agent-stack.yml -o portainer-agent-stack.yml
```
- 以stack方式启动 
```bash
docker stack deploy -c portainer-agent-stack.yml portainer
```

