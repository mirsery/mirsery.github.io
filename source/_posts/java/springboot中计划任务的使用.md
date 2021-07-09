---
title: 在springboot中使用计划任务
author: mirsery
tags: 
    - 计划任务
    - springboot
categories: 
    - java  
---

# 在springboot中使用计划任务

1、首先在配置类中新增***@EnableScheduing***来开启对计划任务的支持
2、在需要执行计划任务的方法上注解***@Scheduled***声明这是一个计划任务
3、Spring通过@Scheduled支持多种类型的计划任务，包含cron、fixDelay、fixRate等

示例代码:
Application
```java
@SpringBootApplication
@ComponentScan(basePackages = "com.xxxx.xxSchedule")
@EnableScheduling
public class WebTestApplication {
    public static void main(String[] args) {
        SpringApplication.run(WebTestApplication.class, args);
    }

}
```
Service
```java
@Service
public class ScheduleTaskService {
    private static final SimpleDateFormat dateFormat = new SimpleDateFormat("YYYY-MM-dd HH:mm:ss");
    @Scheduled(fixedRate = 5000)
    public void task1(){
        System.out.println(dateFormat.format(new Date()));
    }
}
```

- - - - - 

@Scheduled注解可以控制方法定时执行，其中有三个参数可选择：
- 1、fixedDelay控制方法执行的间隔时间，是以上一次方法执行完开始算起，如上一次方法执行阻塞住了，那么直到上一次执行完，并间隔给定的时间后，执行下一次。
- 2、fixedRate是按照一定的速率执行，是从上一次方法执行开始的时间算起，如果上一次方法阻塞住了，下一次也是不会执行，但是在阻塞这段时间内累计应该执行的次数，当不再阻塞时，一下子把这些全部执行掉，而后再按照固定速率继续执行。
- 3、cron表达式可以定制化执行任务，但是执行的方式是与fixedDelay相近的，也是会按照上一次方法结束时间开始算起。
- 4、initialDelay 。如： @Scheduled(initialDelay = 10000,fixedRate = 15000) 这个定时器就是在上一个的基础上加了一个initialDelay = 10000 意思就是在容器启动后,延迟10秒后再执行一次定时器,以后每15秒再执行一次该定时器。