---
date: 2016-08-10 21:53
status: public
title: linux下创建用户
categories:
    - linux
tags:
    - linux    
---

在linux下创建新用户的命令
```language=shell
    useradd -m(创建home下目录) -s /bin/bash(shell类型) [username] //创建用户
    passwd [username] 设置密码
    usermod     //修改用户参数
    userdel [username]    //删除用户
    rm -rf [username]      //删除用户所在目录
```
用户组的添加和删除：
```
    groupadd testgroup 组的添加
    groupdel testgroup 组的删除
```
添加sudo权限：
```
    sudo vim /etc/sudoers
 ```