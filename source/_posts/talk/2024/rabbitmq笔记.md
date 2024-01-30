---
title: rabbitmq笔记
toc: true
author: mirsery
comments: false
date: 2024-01-29 10:43:45
updated: 2024-01-29 10:43:45
tags:
    - mq
categories:
    - 笔记
excerpt: 'MQ，中文是消息队列（MessageQueue），字面来看就是存放消息的队列。也就是事件驱动架构中的Broker，从而实现异步调用(同步调用用Feign)'
---


<!-- toc -->

## 概述

![](rabbitmq_info.png)

Rabbitmq一些常见的角色
- publisher 生产者
- consumer 消费者
- exchange 交换机，负责消息路由
- queue 队列，存储信息
- virtualHost 虚拟主机
  

## exchange 类型
发布订阅模式与之前案例的区别就是允许将同一消息发送给多个消费者。实现方式是加入了exchange（交换机）。

常见exchange类型包括：
Fanout：广播-将消息交给所有绑定到交换机的队列
Direct：定向-把消息交给符合指定routing key 的队列
Topic：通配符-把消息交给符合routing pattern（路由模式） 的队列

### fanout 
在Fanout模式中，一条消息，会被所有订阅的队列都消费。

### direct 
在Direct模型下：
队列与交换机的绑定，不能是任意绑定了，而是要指定一个`RoutingKey`（路由key）
消息的发送方在 向 Exchange发送消息时，也必须指定消息的 `RoutingKey`。
Exchange不再把消息交给每一个绑定的队列，而是根据消息的`Routing Key`进行判断，只有队列的`Routingkey`与消息的 `Routing key`完全一致，才会接收到消息。

### topic 交换机
`Topic`类型的`Exchange`与`Direct`相比，都是可以根据`RoutingKey`把消息路由到不同的队列。只不过`Topic`类型`Exchange`可以让队列在绑定`Routing key` 的时候使用通配符！

通配符规则：
- `#`：匹配一个或多个词 `item.spu.insert`
- `*`：匹配不多不少恰好1个词 `item.spu`

## rabbitmq的架构模型
