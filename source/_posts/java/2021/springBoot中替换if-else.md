---
title: Springboot 中干掉if else
author: mirsery
date: 2021-01-06
tags: 
    - 转载
    - springboot
categories: 
    - java  
---


# Springboot 中干掉if else
>  来自：掘金（作者：cipher）
> 原文链接 [https://juejin.im/post/5c551122e51d457fcc5a9790](https://juejin.im/post/5c551122e51d457fcc5a9790)

## 需求
这里虚拟一个业务需求，让大家容易理解。假设有一个订单系统，里面的一个功能是根据订单的不同类型作出不同的处理。
订单实体:
``` java
public class OrderDTO {
    private String code;
    private BigDecimal price;
    private String type;  
}
```
service接口:
```java
public interface IOrderService {
            /**
            * 根据订单的不同类型做出不同的处理
            * @param dto 订单实体
            * @return 
            */
            String handle(OrderDTO dto);
}
```
##传统实现
根据订单类写一堆的if-else:
```java
public class OrderServiceImpl implements IOrderService {
    String type = dto.getType();
        if("1".equals(type)){
            return "处理普通订单";
        }elese if("2".equals(type)){
           return "处理团购订单";
       }else if ("3".equals(type)){
            return "处理促销订单";
      }                
     return null;
}
```
## 策略模式实现
利用策略模式只需要实现两行可实现业务逻辑:
@Service
public class OrderServiceV2Impl implements IOrderService {
    @Autowrited
    private HandlerContext handlerContext;
    
    @Override
    public String handle(OrderDTO dto){
        AbstractHandler handler = handlerContext.getInstance(dto.getType());
        return handler.handle(dto);
   }    
}
可以看到上面的方法中注入了HandlerContext，这是一个处理器上下文，用来保存不同的业务处理器，具体在下文会讲解。我们从中获取一个抽象的处理器AbstractHandler，调用其方法实现业务逻辑。
现在可以了解到，我们主要的业务逻辑是在处理器中实现的，因此有多少个订单类型，就对应有多少个处理器。以后需求变化，增加了订单类型，只需要添加相应的处理器就可以，上述OrderServiceV2Impl完全不需改动。
- - - - - 
以上是转自网友 cipher 的文章,今天突然发现springboot可以注入同一接口实现的services集合就想到可以利用其value属性实现策略模式.
修改时间 2021-01-06 23:51:58

    其实在springboot中实现策略模式，我们可以利用springboot本身提供的@service 注解以及其 同一接口的实现的Map注入就可以解决。下面简单的举个例子。
首先我们先定一个接口
```java
public interface DataListener{
    public void onData();
}
```
接着定义几个实现该接口的类 DataListener1, DataListener2.
我们在实现的类DataListener1...上增加@service注解，同时给他命名（其默认名可以为字符串类型的策略），接着我们定义一个场景类**DataHandleContext**,
场景类中引入如下变量：
```java
@Autowrite
public Map<String,DataListener> dataListenerMap;//该类是所定义的策略的map集合
```
至此，我们就很简单的实现了策略模式。策略的命名可以采用枚举类进行控制，这样新增策略时只需要在枚举类中新增相应的枚举类型以及新建相关的service层类。
