---
title: springboot自带的事件驱动模型使用
author: mirsery
date: 2021-02-29
tags: 
    - springboot
categories: 
    - java  
---

# springboot自带的事件驱动模型使用
>  Springboot框架自行封装了一套发布订阅模式可以供我们日常开发的使用

##自定义事件类
在springboot中继承 **ApplicationEvent**类可以实现自定义事件
下面是示例代码:
```java
public class TestEvent extends ApplicationEvent {
    private String message;
    public TestEvent(Object source, String message) {
        super(source);
        this.message = message;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
}
```

##定义事件监听组件
只要实现**ApplicationListner<T>接口**，组件就可以订阅相关的事件
```java
@Component
public class TestEventListerner implements ApplicationListener<TestEvent> {

    /**
     * Handle an application event.
     *
     * @param event the event to respond to
     */
    @Override
    public void onApplicationEvent(TestEvent event) {
        System.out.println(this.getClass() + " message is " + event.getMessage() + ", source is :" + event.getSource());
    }
}
```

## 事件发布

```java
    ApplicationContext applicationContext = SpringApplication.run(WebTestApplication.class, args);
    TestEvent test = new TestEvent("test-code", "测试事件发生");
    applicationContext.publishEvent(test);
```
