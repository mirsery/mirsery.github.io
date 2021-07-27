---
date: 2018-07-13 23:29
status: public
title: Ubuntu 下为单个网卡配置多个ip
categories:
    - linux
tags:
    - linux  
---


 1、添加临时ip（设备重启后不生效)
```shell
ip addr add 192.168.1.104/24 dev en0 //给en0网卡配置ip
ip address show en0    //查看配置是否生效
ip addr del 192.168.1.104/24 dev en0 //删除设备en0的ip地址
```

2、添加永久ip地址
需要修改 ubuntu 下网卡的配置文件 /etc/network/interfaces ，示例如下：

auto en0　　　　　　　　　　// 网卡配置最开始的这一行保持不变
iface en0 inet dhcp　　　　　  // dhcp 配置
iface en0 inet static　　　　     // 网卡配置静态 ip 地址
address 192.168.1.104/24