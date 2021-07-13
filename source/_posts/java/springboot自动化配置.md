---
title: springboot自动配置
author: mirsery
tags: 
    - springboot
date: 2021-03-01    
categories: 
    - java  
---

# 自动配置
## 自动配置中使用的条件化注解

|条件化注解|配置生效条件|
|:---:|:---:|
@ConditionalOnBean|配置了某个特定的Bean
@ConditionalOnMissingBean|没有配置特定的Bean
@ConditionalOnClass | Classpath中有特定的类
@ConditionalOnMissingClass| Classpath中缺少指定的类
@ConditionalOnExpression|给定的Spring Expression Language(SpEL)表达式计算结果为true
@ConditionalOnJava|Java版本匹配特定值或者或者一个范围值
@ConditionalOnJndi|参数中给定的JND的位置必须存在一个，如果没有参数，则要有JNDI InitialContext
@ConditionalOnProperty|指定的配置属性要有一个明确的值
@ConditionalOnResource|Classpath里需要有特定的资源
@ConditionalOnWebApplication|这是一个web应用
@ConditionalOnNotWebApplication|非web应用


