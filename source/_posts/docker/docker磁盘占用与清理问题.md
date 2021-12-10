---
title: docker磁盘占用与清理问题
toc: true
author: mirsery
comments: false
date: 2021-12-10 17:50:54
updated: 2021-12-10 17:50:54
tags:
    - docker
categories:
    - docker
excerpt: 'docker在使用一段时间后会发现宿主磁盘很容易被占满，手动清除image之后似乎并不能释放磁盘...'
---


<!-- toc -->

## 查看docker占用分布

```shell
docker system df
```

```shell
docker system df -v #可以进一步查看空间占用的细节以确定是哪个镜像，容器活着本地卷占用过高的空间
```


## 清理方法

### 自动清理命令

> 该命令自动清理的对象如下：
- 已经停止的容器
- 未被任何容器使用的卷
- 未被任何容器所关联的网络
- 所有悬空的镜像

```shell
docker system prune # 对空间进行自动清理
docker system prune -a #清除所有未被使用的镜像和悬空镜像
docker system prune -f #用以强制删除不提示信息
```

针对容器和镜像的删除命令:
```shell
docker image prune #删除悬空的镜像
docker container prune #删除无用的容器
#
# 默认情况下docker container prune命令会清理掉所有处于stopped状态的容器
#
docker volume prune # 删除无用的卷
docker network prune # 删除无用的网络
```

### 手动清除

- 清理卷
如果卷占用过高，可以清除一些不使用的卷，包括一些未被任何容器调用的卷（-v 详细信息中若显示LINKS=0，则未被调用)
```shell
docker volume rm $(docker volume ls -qf dangling=true)
```
- 容器清理
如果发现是容器占用过高的空间，可以手动删除一些:
删除所有已退出的容器:
```shell
docker rm -v $(docker ps -aq -f status=exited)
```
删除所有状态为dead的容器
```shell
docker rm -v $(docker ps -aq -f status=dead)
```



