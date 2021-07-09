---
title: springboot 中应用缓存（二）
author: mirsery
tags: 
    - cache
    - springboot
categories: 
    - java  
---


#springboot 中应用缓存（二）
>  项目中如果引用了shiro框架的话，缓存实例的引用需要增加@lazy标签或者采用手动注入Bean的方式

<!-- toc -->

##Spring Boot默认的ConcurrentMapCacheManager
1. 添加缓存
2. application中开启**@EnableCaching**标注
3. 创建service层
```java:n
@Service
public class CacheDemoService {

    @CachePut(value = "test", key = "#key")//将返回的数据写入缓存 
    public String getMessage(String msg, String key) {
        System.out.println("CachePut the message, key : " + key);
        return msg;
    }

    @Cacheable(value = "test", key = "#key")    //第一次执行方法缓存，第二次若参数相同时则不会触发方法，而是从缓存中直接返回数据
    public String getDemo(String key) {
        String msg = "hello world cache";
        System.out.println("Cacheable the message, key : " + key);
        return msg;
    }

    @CacheEvict(value = "test", key = "#key")
    public void deleteCache(String key) {
        System.out.println("delete the cache key : " + key);
    }
}
```

##SpringBoot中使用其他缓存技术
###EhCache
```xml
<dependency> 
    <groupId>net.sf.ehcache</groupId> 
    <artifactId>ehcache</artifactId> 
</dependency> 
```
Springboot 会自动配置EhCacheManager的Bean
###Guava
```xml
<dependency> 
    <groupId>com.google.guava</groupId> 
    <artifactId>guava</artifactId> 
    <version>18.0</version> 
</dependency>
```
###Redis
```xml
<dependency> 
    <groupId>org.springframework.boot</groupId> 
    <artifactId>spring-boot-starter-redis</artifactId> 
</dependency>
```
