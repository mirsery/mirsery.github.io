---
title: springCloud 常见配置
author: mirsery
tags: 
    - springboot
categories: 
    - java  
---


# springCloud 常见配置
## 服务注册类配置
前缀 eureka.client
>  org.springframework.cloud.netflix.eureka.EurekaClientConfigBean 中定义了常用的配置以及对应的说明和默认值。
|参数名|说明|默认值|
|:---:|:---:|:---:|
enable|应用Eureka客户端|true|
registryFetchIntervalSeconds|从Eureka服务端获取注册信息的时间间隔，单位为秒|30
instanceInfoReplicationIntervalSeconds|更新实例信息的变化到Eureka服务端的时间间隔时间，单位为秒|30
initialInstanceInfoReplicationIntervalSeconds|初始化实例信息到Eureka服务端的时间间隔时间，单位为秒|40
eurekaServiceUrlPollIntervalSeconds|轮询Eureka服务端地址更改的时间间隔，单位为秒，当我们与springCloud Config配合，动态刷新Eureka的serviceURL地址时需要关注该需求|300
eurekaServerReadTimeoutSeconds|读取Eureka Server信息的超时时间，单位秒|8
eurekaServerConnectTimeoutSeconds|连接Eureka Server信息的超时时间，单位秒|5
eurekaServerTotalConnections|从Eureka客户端到所有Eureka服务端的连接总数|200
eurekaServerTotalConnectionPerlist|从Eureka客户端到每个Eureka服务端主机的连接总数|50
eurekaConnection sss


