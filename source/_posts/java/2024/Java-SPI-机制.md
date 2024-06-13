---
title: Java SPI 机制
toc: true
author: mirsery
comments: false
date: 2024-06-13 20:25:09
updated: 2024-06-13 20:25:09
tags:
    - java
categories:
    - java
excerpt: 'SPI 技术全称是 Service Provider Interface 是一种 JDK 内置的动态加载实现扩展点的机制，通过 SPI 技术我们可以动态获取接口的实现类，不需要自己来创建...'
---


<!-- toc -->


![](2024-06-13-23.17.43.png)

## SPI 实践 demo
先看例子再剖析原因。

```java
// 新建一个接口 car
package com.example.testdemo.spi;
public interface Car {
    public void start();
}
```
实现该接口 benz 、bmw
```java
// bmw
package com.example.testdemo.spi;
public class BMWCar implements Car{
    @Override
    public void start() {
        System.out.println("BMW start");
    }
}

//benz
package com.example.testdemo.spi;
public class BenzCar implements Car{
    @Override
    public void start() {
        System.out.println("Benz start");
    }
}

```
> resources 目录中需要添加对应的文件


在**resources** 目录下即（class path）下新增文件夹**META-INF/services**,创建需要使用 SPI 机制的接口文件，
文件名在这个示例中为**com.example.testdemo.spi.Car**,内容如下所示:
```
com.example.testdemo.spi.BenzCar
com.example.testdemo.spi.BMWCar
```

测试类

```java
public class SPIMainDemo {

    public static void main(String[] args) {
        ServiceLoader<Car> cars = ServiceLoader.load(Car.class);
        cars.forEach(Car::start);
    }
}
```
运行结果为:
```
Benz start
BMW start
```
从上述的 sample 中我们可以知道Java SPI 实际上还是基于接口的编程+策略模式+配置文件组合实现的动态加载机制。在面向对象的设计中，一般情况我们推荐模块之间基于接口编程，模块之间不对实现类进行硬编码。

## 使用场景

- JDBC驱动，加载不同数据库的驱动类
- Spring中大量使用了SPI,比如：对servlet3.0规范对ServletContainerInitializer的实现、自动类型转换Type Conversion SPI(Converter SPI、Formatter SPI)等
- Dubbo中也大量使用SPI的方式实现框架的扩展, 不过它对Java提供的原生SPI做了封装，允许用户扩展实现Filter接口
- Tomcat 加载 META-INF/services下找需要加载的类
- SpringBoot项目中 使用@SpringBootApplication注解时，会开始自动配置，而启动配置则会去扫描META-INF/spring.factories下的配置类
                  
> 此处引用 原文链接：https://blog.csdn.net/cold___play/article/details/132074294


