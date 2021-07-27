---
categories: 
    - docker
tags: 
    - docker    
date: 2020-8-16 18:25:00
status: public
title: Docker容器的日志查看和清除
---

docker容器的地址一般存放在```/var/lib/docker/containers/<container_id>/```下

## 查看各个容器中日志的大小
```shell
#!/bin/sh
echo "======== docker containers logs file size ========"  
logs=$(find /var/lib/docker/containers/ -name *-json.log)  
for log in $logs  
        do  
             ls -lh $log   
        done  
```

## 清理docker容器的日志
```shell
#!/bin/sh 
echo "======== start clean docker containers logs ========"  
logs=$(find /var/lib/docker/containers/ -name *-json.log)  
for log in $logs  
        do  
                echo "clean logs : $log"  
                cat /dev/null > $log  
        done  
echo "======== end clean docker containers logs ========"  
```

## 设置docker容器的日志大小
### 配置单个容器的日志大小上限
配置docker-compose 的max-size 来实现
nginx 服务示例:
```yml
nginx: 
  image: nginx:1.12.1 
  restart: always 
  logging: 
    driver: “json-file” 
    options: 
      max-size: “5g” 
```
重启nginx容器之后，其日志文件的大小就被限制在5GB，再也不用担心了。
### 全局设置
新建/etc/docker/daemon.json，若有就不用新建了。添加log-dirver和log-opts参数，样例如下：
```yml
{
  "registry-mirrors": ["http://f613ce8f.m.daocloud.io"],
  "log-driver":"json-file",
  "log-opts": {"max-size":"500m", "max-file":"3"}
}
```
max-size=500m，意味着一个容器日志大小上限是500M， 
max-file=3，意味着一个容器有三个日志，分别是id+.json、id+1.json、id+2.json。
```shell
// 设置完成之后,重启docker守护进程
systemctl daemon-reload
systemctl restart docker
```
> 设置的日志大小，只对之后新建的容器有效