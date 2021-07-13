---
title: springboot 中新增异步任务
author: mirsery
date: 2020-01-03
tags: 
    - 异步任务
    - springboot
categories: 
    - java  
---

# springboot 中新增异步任务
>  一般情况下，异步任务主要是处理一些相对耗时的任务。比如邮件、短信等信息的推送。

springboot中使用支持异步任务开箱即用。
1、首先在application中添加 ***@EnableAsync***注解
2、新增一个compent组件，并且在application中添加其扫描包地址
3、在新建的compent中使用***@Async**注解注释方法即可实现任务的异步调用。
<br/>
下面是示例代码
<br/>
1、WebTestApplication
```java
@SpringBootApplication
@EnableAsync
@ComponentScan(basePackages = "com.xxxx.component")
public class WebTestApplication {
    public static void main(String[] args) {
        SpringApplication.run(WebTestApplication.class, args);
    }
}
```
<br/>
2、TestController.java
```java
@RestController
public class TestController {
    @Autowired
    private PushCompent pushCompent;
    @PostMapping("/testAsync")
    public String testAsync(@RequestBody String requestBody) throws InterruptedException {
        long time = System.currentTimeMillis();
        Future<Boolean> r1 = pushCompent.pushToAndroid(requestBody);
        Future<Boolean> r2 = pushCompent.pushToIos(requestBody);
        Future<Boolean> r3 = pushCompent.pushToWeb(requestBody);
        for (; ; ) {
            if (r1.isDone() && r2.isDone() && r3.isDone()) {
                break;
            }
        }
        return "cost millis is " + (System.currentTimeMillis() - time);
    }
}
```

3、PushCompent.java
```java
@Component
public class PushCompent {

    @Async
    public Future<Boolean> pushToAndroid(String message) throws InterruptedException {
        Thread.sleep(2000);
        return new AsyncResult<>(true);
    }

    @Async
    public Future<Boolean> pushToIos(String message) throws InterruptedException {
        Thread.sleep(2345);
        return new AsyncResult<>(false);
    }

    @Async
    public Future<Boolean> pushToWeb(String message) throws InterruptedException {
        Thread.sleep(4567);
        return new AsyncResult<>(true);
    }
}

```
- - - - - 
注意事项:
如下方式会使@Async失效
- 异步方法使用static修饰
- 异步类没有使用@Component注解（或其他注解）导致spring无法扫描到异步类
- 异步方法不能与调用异步方法的方法在同一个类中
- 类中需要使用@Autowired或@Resource等注解自动注入，不能自己手动new对象
- 如果使用SpringBoot框架必须在启动类中增加@EnableAsync注解
- 在Async 方法上标注@Transactional是没用的。 在Async 方法调用的方法上标注@Transactional 有效