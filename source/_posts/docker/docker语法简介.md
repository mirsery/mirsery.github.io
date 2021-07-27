---
date: 2016-08-29 22:23
status: public
title: docker语法简介
categories: 
    - docker
tags: 
    - docker
---


<!-- toc -->


##1、获取镜像
```bash
# docker pull
```
##2、镜像推送
```bash
# docker [url] login
# docker push repository/image:latest
```
##3、容器创建与运行
```bash
# docker create -ti <image_name>
# docker start <image_name> /bin/bash
 --------------------------------
# docker run -ti <image_name> /bin/bash
/**其中-t是指分配一个伪终端并绑定到容器的标准输出上，-i让容器的标准输入保持打开状态*/
```
##4、查看容器的运行
```bash
# sudo docker ps 
# sudo docker ps -a
# sudo docker ps -a -q
```
##5、查看镜像
```bash
# docker imagas
```
##6、获取容器的输入信息
```bash
# docker logs <container_name>
```
```bash
# docker logs -f <container_name>
```
##7、终止容器
```bash
# docker stop <container_name>
# docker kill
```
##8、进入容器
```bash
# docker exec -ti <container_name> /bin/bash
```
##9、将容器提交成镜像
```bash 
# docker commit <containerId> <name>
```
##10、宿主向容器内拷贝东西
```bash
docker copy <source>/file <containerId>:<dest>/file
```