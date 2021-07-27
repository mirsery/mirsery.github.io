---
date: 2016-08-10 22:13
status: public
title: （转）linux下的sudoers配置
categories:
    - linux
tags:
    - linux
---

>[原文地址](http://www.osedu.net/article/linux/2011-01-03/178.html)

Linux下的sudo及其配置文件/etc/sudoers的详细配置说明

# 1.sudo介绍
sudo是linux下常用的允许普通用户使用超级用户权限的工具，允许系统管理员让普通用户执行一些或者全部的root命令，如halt，reboot，su等等。这样不仅减少了root用户的登陆 和管理时间，同样也提高了安全性。Sudo不是对shell的一个代替，它是面向每个命令的。
它的特性主要有这样几点：
- sudo能够限制用户只在某台主机上运行某些命令。
- sudo提供了丰富的日志，详细地记录了每个用户干了什么。它能够将日志传到中心主机或者日志服务器。
- sudo使用时间戳文件来执行类似的“检票”系统。当用户调用sudo并且输入它的密码时，用户获得了一张存活期为5分钟的票（这个值可以在编译的时候改变）。
- sudo的配置文件是sudoers文件，它允许系统管理员集中的管理用户的使用权限和使用的主机。它所存放的位置默认是在/etc/sudoers，属性必须为0411。

# 2.配置文件/etc/sudoers
它的主要配置文件是sudoers,linux下通常在/etc目录下，如果是solaris，缺省不装sudo的，编译安装后通常在安装目录的 etc目录下，不过不管sudoers文件在哪儿，sudo都提供了一个编辑该文件的命令：visudo来对该文件进行修改。强烈推荐使用该命令修改 sudoers，因为它会帮你校验文件配置是否正确，如果不正确，在保存退出时就会提示你哪段配置出错的。 

言归正传，下面介绍如何配置sudoers:
首先写sudoers的缺省配置： 
```
############################################################# 
# sudoers file. 
# 
# This file MUST be edited with the 'visudo' command as root. 
# 
# See the sudoers man page for the details on how to write a sudoers file. 
# 

# Host alias specification 

# User alias specification 

# Cmnd alias specification 

# Defaults specification 

# User privilege specification 
    root    ALL=(ALL) ALL 

# Uncomment to allow people in group wheel to run all commands 
# %wheel        ALL=(ALL)       ALL 

# Same thing without a password 
# %wheel        ALL=(ALL)       NOPASSWD: ALL 

# Samples 
# %users  ALL=/sbin/mount /cdrom,/sbin/umount /cdrom 
# %users  localhost=/sbin/shutdown -h now 
################################################################## 
```
##1. 最简单的配置，让普通用户support具有root的所有权限 
执行visudo之后，可以看见缺省只有一条配置： 
   ``` root    ALL=(ALL) ALL ```
那么你就在下边再加一条配置： 
    ```support ALL=(ALL) ALL ```
这样，普通用户support就能够执行root权限的所有命令 
以support用户登录之后，执行： 
    ```sudo su - ```
然后输入support用户自己的密码，就可以切换成root用户了 
##2. 让普通用户support只能在某几台服务器上，执行root能执行的某些命令 
首先需要配置一些Alias，这样在下面配置权限时，会方便一些，不用写大段大段的配置。Alias主要分成4种 
- 配置Host_Alias：就是主机的列表 
    ```Host_Alias      HOST_FLAG = hostname1, hostname2, hostname3 ```
- 配置Cmnd_Alias：就是允许执行的命令的列表 
    ```Cmnd_Alias      COMMAND_FLAG = command1, command2, command3 ```
- 配置User_Alias：就是具有sudo权限的用户的列表 
    ```User_Alias USER_FLAG = user1, user2, user3 ```
- 配置Runas_Alias：就是用户以什么身份执行（例如root，或者oracle）的列表 
   ``` Runas_Alias RUNAS_FLAG = operator1, operator2, operator3 ```
- 配置权限 
    配置权限的格式如下： 
       ``` USER_FLAG HOST_FLAG=(RUNAS_FLAG) COMMAND_FLAG ```
    如果不需要密码验证的话，则按照这样的格式来配置 
       ``` USER_FLAG HOST_FLAG=(RUNAS_FLAG) NOPASSWD: COMMAND_FLAG ```
- 配置示例：
``` 
############################################################################ 
# sudoers file. 
# 
# This file MUST be edited with the 'visudo' command as root. 
# 
# See the sudoers man page for the details on how to write a sudoers file. 
# 

# Host alias specification 
Host_Alias      EPG = 192.168.1.1, 192.168.1.2 

# User alias specification 

# Cmnd alias specification 
Cmnd_Alias      SQUID = /opt/vtbin/squid_refresh, /sbin/service, /bin/rm 

# Defaults specification 

# User privilege specification 
root    ALL=(ALL) ALL 
support EPG=(ALL) NOPASSWD: SQUID 

# Uncomment to allow people in group wheel to run all commands 
# %wheel        ALL=(ALL)       ALL 

# Same thing without a password 
# %wheel        ALL=(ALL)       NOPASSWD: ALL 

# Samples 
# %users  ALL=/sbin/mount /cdrom,/sbin/umount /cdrom 
# %users  localhost=/sbin/shutdown -h now 
###############################################################
```