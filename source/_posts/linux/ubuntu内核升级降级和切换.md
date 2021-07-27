---
title: ubuntu内核升级降级和切换
toc: true
author: mirsery
comments: false
date: 2021-07-27 14:52:03
updated: 2021-07-27 14:52:03
tags:
    - linux
    - ubuntu
categories:
    - linux
excerpt: 'ubuntu 内核版本切换、升级...'    
---


<!-- toc -->


> 背景 笔者目前运行的系统是Ubuntu 20.04.2 LTS

## 内核下载地址
下面是内核下载地址 [https://kernel.ubuntu.com/~kernel-ppa/mainline/](https://kernel.ubuntu.com/~kernel-ppa/mainline/)

![](BC9FEFBF-AE3C-4C86-95DB-36A36D1824F1.png)

## 手动升级内核
选择对应的内核版本点进去，根据系统硬件的架构选择相应的目录。

![](4145D291-1B70-4C41-99B8-5C2E15B2CE25.png)

> 一般情况下pc都是选择amd64，arm板选择arm版本。

下载对应的deb文件（headers、image、modules）即可。

下载完成后，进入到下载目录，执行以下 命令安装内核文件
```bash
sudo dpkg -i *.deb
```
留意安装过程中是否会有报错信息，安装完成后重启计算机，运行以下命令:

```bash
# 查看当前计算机运行的内核版本号是否为你刚刚下载的版本号
uanme -a 
```

## 切换内核版本

> 首先需要下载和安装你想要切换的内核版本，操作方法和上述步骤一致。

下载并安装对应的内核文件之后，你可以运行以下命令:

```bash
grep menuentry /boot/grub/grub.cfg
```
查看对应的系统中安装的内核版本的列表是否存在你刚刚安装的内核版本，如果没有则返回上一步核对安装过程中是否有纰漏。如果没有问题则复制你想要运行的内核版本的名称的全称。
修改`/etc/default/grub`文件
```bash
GRUB_DEFALT="你刚刚复制的内核版本全名称"
```
执行更新命令
```bash
sudo update grub
```
看是否有报错信息，如果有保存信息，根据报错信息的提示进行修改。修改完成之后重复上一步的更新操作直至成功为止。然后重启电脑。
```bash
sudo reboot
```
重启电脑之后查看内核版本是否更换为对应的你所切换的版本，然后再次打开`/etc/default/grub`文件，将 GRUB_DEFALT值修改为原先的0.







