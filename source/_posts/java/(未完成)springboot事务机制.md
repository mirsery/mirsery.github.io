---
title: springboot事务机制
date: 2021-07-09 13:47:45
author: mirsery
tags: 
	- 事务
categories:	
	- java	
---
# springboot 事务机制 

Spring 的事务机制提供了一个PlatformTranctionManager接口，不同的数据访问技术的事务使用不同的接口实现。

|数据访问技术|实现|
|:---:|:---:|
JDBC|DataSourceTransactionManager
JPA|JpaTransactionManager
Hirbernate|HibernateTransactionManager
JDO|JdoTransactionManager
分布式事务|JtaTransactionManager

定义事务管理器:
```java:n

```