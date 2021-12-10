---
title: ubuntu深度学习驱动安装
toc: true
author: mirsery
comments: false
date: 2021-12-10 14:25:31
updated: 2021-12-10 14:25:31
tags:
    - 深度学习
categories:
    - 软件安装
---

# Ubuntu安装 Nvidia驱动

<!-- toc -->

## 首先查看本机所安装的显卡型号

```shell
lspci|grep VGA
```
![](C5902CF2-5023-414E-9BBA-D7FE625ECA55.png)

根据如上所述的显卡型号，去官网下载对应的系统和对应显卡的驱动。

## 官网下载驱动

[nvidia驱动下载地址](https://www.nvidia.cn/Download/index.aspx)

选择对应的产品类型，产品系列以及产品型号再根据操作系统系统下载对应的驱动程序。

## 删除原有的开源驱动程序(可选)

```shell
sudo apt-get remove --pure nvidia*
```

## 禁用nouveau驱动 
编辑 **/etc/modprobe.d/blacklist.conf** ,添加以下内容:

```
blacklist nouveau
blacklist lbm-nouveau
options nouveau modeset=0
alias nouveau off
alias lbm-nouveau off
```

关闭nouveau
```shell
echo options nouveau modeset=0 | sudo tee -a /etc/modprobe.d/nouveau-kms.conf
```

## 重启
```shell
update-initramfs -u 
reboot
```

## 验证nouveau是否已经禁用

```shell
lsmod|grep nouveau
```
没有信息显示，说明nouveau已被禁用，接下来可以安装nvdia的显卡驱动。

## 安装nvidia驱动 

- 给文件可执行权限

```shell
sudo chmod +x NVIDIA-Linux-x86_64-470.86.run
```

- 安装

```shell
sudo ./NVIDIA-Linux-x86_64-470.86.run -no-x-check -no-nouveau-check -no-opengl-files
```

|参数|描述|
|---|---|
|-no-x-check|安装驱动时关闭X服务|
|-no-nouveau-check|安装驱动时禁用nouveau|
|-no-opengl-files|只安装驱动文件，不安装OpenGL文件|


## 查看驱动是否安装成功

```shell
nvidia-smi
```

## 其他问题

如果出现以下类似的问题
```
NVIDIA-SMI has failed because it couldn‘t communicate with NVIDIA driver. Make sure that the latest driver is installed and running.
```
解决方案:
```shell
sudo apt-get install dkms
sudo dkms install -m nvidia -v 470.86
```

