---
title: Jconsole的远程连接
date: 2016-10-07 21:16:01
tags: 
  - 调优
  - 监测
categories: 
  - java
---

# 问题背景
    由于系统的前段时间的内存泄漏问题的原因，想看看JVM内存的使用情况，采用jconsole监控，需要进行远程监控。
    系统采用netty架构的套接字NIO服务器。
# 无需认证的远程监控配置
    所需要被监控的程序运行时需要给虚拟机添加一些运行的参数
```java
    -Dcom.sun.management.jmxremote.port=60001   //监控的端口号
    -Dcom.sun.management.jmxremote.authenticate=false   //关闭认证
    -Dcom.sun.management.jmxremote.ssl=false
    -Djava.rmi.server.hostname=192.168.1.50    
```
> 注：在linux中jvm远程使用的ip地址是hostname -i中的地址。

# 设置需要密码的远程登陆配置

```java
    -Dcom.sun.management.jmxremote.port=60001 
    -Dcom.sun.management.jmxremote.authenticate=true 
    -Dcom.sun.management.jmxremote.ssl=false 
    -Dcom.sun.management.jmxremote.pwd.file= {jmxremote.password}Path 
    -Djava.rmi.server.hostname=10.211.55.7
```
在/usr/lib/jvm/java-8-oracle/jre/lib/management下的jmxremote.access、jmxremote.password。
jmxremote.access中存储用户名和对应的权限关系。
jmxremote.password中存储用户名密码。
> 注：在jmxremote.password和jmxremote.access的权限为600，所有者rw权限。