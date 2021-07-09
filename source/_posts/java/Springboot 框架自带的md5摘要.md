---
title: springboot自带的md5摘要算法使用
author: mirsery
tags: 
    - md5
    - springboot
categories: 
    - java  
---


# springboot自带的md5摘要算法使用

```java
    import org.springframework.util.DigestUtils;

    DigestUtils.md5DigestAsHex("需要摘要的字符串xxxxx".getBytes()); 默认是采用的32位的md5信息摘要算法

    md5(str,32)

```
