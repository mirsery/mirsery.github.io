---
title: Springboot应用的Hook配置
toc: true
author: mirsery
comments: false
date: 2022-06-27 16:08:31
updated: 2022-06-27 16:08:31
tags:
    - springboot
categories:
    - java
excerpt: 'Springboot框架的Hook应用'
---


<!-- toc -->

## ApplicationRunner 
实现**ApplicationRunner**接口，并重写run函数，可以实现**springboot**项目启动完成之后的回调

```java
@Configuration
public class MyApplicationRunner implements ApplicationRunner {

    @Override
    public void run(ApplicationArguments args) throws Exception {
       //something to do 
    }
}

```

## CommandLineRunner

实现**CommandLineRunner**接口，并重写run函数，可以实现**springboot**项目启动完成之后的回调

```java
@Configuration
public class MyCommandLineRunner implements CommandLineRunner {

    @Override
    public void run(String... args) throws Exception {

    }
}

```


## @PreDestroy

采用```@PreDestroy```注释可以实现springboot项目停止之后的钩子回调，运用实例如下所示:


```java
@Configuration
public class MyPreDestroy {

    @PreDestroy
    public void myPreDestroy() {
        
    
    }

}

```