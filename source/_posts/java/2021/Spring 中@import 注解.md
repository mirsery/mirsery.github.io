---
title: Spring 框架中的@import注解
author: mirsery
date: 2021-04-29
tags: 
    - annotation
    - springboot
categories: 
    - java  
---


# Spring 框架中的@import注解
>  @import注解是Spring基于java注解配置的主要组成部分，import注解提供了@Bean注解的功能，同时还有原来组织多个分散的@Configuration的功能。

## import注解可以引入其他的configuration
example  code :
```java
public interface TestService {
    void test();
}

@Configuration
@Import({ConfigB.class})     //@Import的优先于本身的的类定义加载
public class ConfigA {
    @Bean
    @ConditionalOnMissingBean
    public TestService getTestService() {
        return new TestServiceA();
    }
}

@Configuration
public class ConfigB {
    @Bean
    @ConditionalOnMissingBean
    public TestService getTestServiceB() {
        return new TestServiceB();
    }
}

```
场景类代码:
```java
    public static void main(String[] args) {
        ApplicationContext applicationContext = new AnnotationConfigApplicationContext(ConfigA.class);
        TestService testService = applicationContext.getBean(TestService.class);
        testService.test();
        //generate TestServiceB
    }
```

## import 注解也可以直接初始化其他类的Bean
```java
@Configuration
@Import({TestServiceC.class})     //@Import的优先于本身的的类定义加载
public class ConfigA {
    @Bean
    @ConditionalOnMissingBean
    public TestService getTestService() {
        return new TestServiceA();
    }
}
```
场景类保持不变，此时TestService实例会变成TestServiceC 的实例。
## 个性化加载，指定实现ImportSelector
实现importSelector接口可实现个性化加载，下面是示例代码

```java
public class MyimportSelector implements ImportSelector {
    /**
     * Select and return the names of which class(es) should be imported based on the {@link AnnotationMetadata} of the
     * importing @{@link Configuration} class.
     *
     * @param importingClassMetadata
     */
    @Override
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        return new String[]{"com.mirsery.test.webtest.anno.TestServiceA"};//    可以直接返回实体或者对应的config配置类
    }
}
```

基于AnnotationMetadata的参数实现动态加载类示例:
```java
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Target(ElementType.TYPE)
@Import(My1importSelector.class)
public @interface EnableTestService {
    String name();
}

public class My1importSelector implements ImportSelector {
    /**
     * Select and return the names of which class(es) should be imported based on the {@link AnnotationMetadata} of the
     * importing @{@link Configuration} class.
     *
     * @param importingClassMetadata
     */
    @Override
    public String[] selectImports(AnnotationMetadata importingClassMetadata) {
        Map<String , Object> map = importingClassMetadata.getAnnotationAttributes(EnableTestService.class.getName(), true);
        String name = (String) map.get("name");
        if (Objects.equals(name, "B")) {//
            return new String[]{"com.mirsery.test.webtest.anno.ConfigB"};
        }
        return new String[0];
    }
}


场景类直接使用标注
@EnableTestService(name="B")
```

## 实现ImportBeanDefinitionRegistrar 接口个性化加载
和importSelector 类型，想要重新定义Bean，例如动态注入属性改变Bean的类型和Scope等等就需要通过实现ImportBeanDefinitionRegister的类实现,下面是示例代码:
//TODO 