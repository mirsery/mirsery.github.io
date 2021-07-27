---
categories: 
	- docker
tags: 
	- docker	
date: 2015-12-5 14:45:10
status: public
title: Docker浅谈
---

###背景介绍
docker现在算当下比较火的一个开源应用容器了，光看看他的一些有点就足以让人喜欢上他，甚至在生产过程中部署使用。目前国内的一些docker的平台，我就不吐槽了。当然，最主要的是我接触的不多并不敢妄言。博主是一个初学者，不是vim党，虚拟机上运行的ubuntu14.04发行版。好了，背景就这么多。
###安装以及环境的配置
首先呢，博主只想在linux上的安装，至于windows的童鞋呢自行百科咯。首先聊聊在ubuntu 14.04之前的老版本的安装： 
```bash
$ sudo apt-get update
$ sudo apt-get install -y linux-image-generic-lts-raringlinux-header-generic-Its-raring
$ sudo reboot
```
更新完内核后呢，接下来的安装过程就和14.04之后的版本一样了。
```bash
$ sudo apt-get install apt-transport-https
$ sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 36A1D7869245C8950F966E92D876A8A88D21E9
$ sudo bash -c "echo deb https://get.docker.io/ubuntu doc ker main > /etc/apt/source.list.d/docker.list"
$ sudo apt-get update
$ sudo apt-get install -y lxc-docker
```
只要你添加了官方的软件源之后以后更新的话只需要执行以下的命令就可以了。
```bash
$ sudo apt-get update -y lxc-docker
```
至于Cent OS，笔者也不说了。
###docker是什么？
Docker的项目发起人声称docker是一种使应用脱离底层机器，同时又是随时随地能获取的创建应用程序方式。
简而言之docker所做的工作就是利用容器来打包应用，数据的迁移只需要启动相应的新的容器。
###为什么说docker是一种趋势
在我所了解的范围内，docker可以很高效的搭建出开发所需要的环境，以及docker对资源的需求比较低，数据迁移和扩展比较方便，更新管理，只是配置文件小小的修改。
###docker和传统的虚拟机的对比
docker的启动非常快，对系统资源占用少，以及docker的指令类似git的指令，学习成本低。dcoker利用Dockerfile配置文件对容器进行灵活的配置，同时容器还支持开发小组之间的共享。docker的虚拟化是操作系统级，直接复用本地的操作系统，很轻便。传统的虚拟化机制是在硬件层面实现的虚拟化，需要有额外的虚拟机管理应用和虚拟机操作系统层。
###docker的三大核心
镜像，容器，仓库这三者是docker的核心概念。好了，基础的概念呢其实说了真心没意思，还不如直接来点干货实在。以后呢，就会每天更新一些有关docker的操作，还有实际的项目。