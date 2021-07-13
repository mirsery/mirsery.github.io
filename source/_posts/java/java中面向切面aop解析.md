---
title: java 中面向切面的Aop 解析
date: 2021-06-13
tags: 
    - aop
categories: 
    - java
---

# Aop 解析 

>  了解aop协议

<!-- toc -->

AOP（面向切面编程）是Spring框架的特色功能之一。通过设置横切关注点（cross cutting concerns），AOP提供了极高的扩展性。

## 实现简易的Aop

1. 定义一个 需要被代理的接口，并实现接口

```java
public interface Job {
    public int doWork(String msg);
}
```
```java
public class Work implements Job {
    @Override
    public int doWork(String msg) {
        System.out.println("[do-work] " + msg);
        return 1;
    }
}
```

2. 实现InvocationHandler接口并创建代理方法

```java
public class WorkHandler implements InvocationHandler {

    private Object o;

    public WorkHandler(Object o) {
        this.o = o;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        method.invoke(o, args);
        System.out.println("[proxy-invoke]");
        return 2;
    }

}
```

3. 场景测试类

```java
public class WorkMain {
    public static void main(String[] args) {
        Job work = new Work();
        WorkHandler workHandler = new WorkHandler(work);
        Job job = (Job) Proxy.newProxyInstance(work.getClass().getClassLoader(),
                work.getClass().getInterfaces(),workHandler);
        System.out.println(job.doWork("hahahah"));
    }
}
```
