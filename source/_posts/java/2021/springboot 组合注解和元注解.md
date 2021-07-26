---
title: springboot 组合注解和元注解
author: mirsery
date: 2020-02-14
tags: 
    - annotation
    - springboot
categories: 
    - java  
---

# springboot 组合注解和元注解

**元注解** 指可以注解到别的注解上的注解，被注解的注解称之为组合注解，组合注解具有元注解的功能。
示例
AnnotationMain
```java
public class AnnotationMain {

    public static void main(String[] args) {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(DemoConfig.class);
        DemoService service = context.getBean(DemoService.class);
        service.outputResult();
        context.close();
    }

}
```
WiselyConfiguration
```java
@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Configuration
@ComponentScan
public @interface WiselyConfiguration {

    String[] value() default {};
}

```

DemoConfig
```java
@WiselyConfiguration("com.xx.annotation")
public class DemoConfig {

}
```

DemoService
```java
@Service
public class DemoService {

    public void outputResult(){
        System.out.println("从组合注解中获取bean");
    }

}
```
