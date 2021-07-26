---
title: Future模式
toc: true
author: mirsery
comments: true
date: 2021-07-24 21:48:07
tags:
    - java
categories:
    - java
excerpt: 'future 模式是多线程开发中比较常见的一种模式，他的核心思想是利用多线程来实现耗时操作的异步调用。主要利用多线程去处理耗时的任务，并支持异步回调...'    
---



<!-- toc -->

> future 模式是多线程开发中比较常见的一种模式，他的核心思想是利用多线程来实现耗时操作的异步调用。主要利用多线程去处理耗时的任务，并支持异步回调处理相关的信息。

## future 模式的概述
future模式优点类似快递订餐，比如我们利用xx软件进行外卖下单。下完单之后我们可以继续我们上班的摸鱼动作，等待骑手的电话。其中下完单之后会立刻返回一个订单号，我们可以根据这个订单号去获取相应的订单信息。对于future模式来说，虽然他并不能立刻给予我们所需要的数据（外卖），但是他会返回订单给到我们，我们可以借由订单去获取相应的骑手以及派送状态信息。可以充分的节约我们的摸鱼时间。


## future 模式的简单实现

```java
public interface Data {

    public String getFood(); //取餐
}

```

```java
public record RealData(String result) implements Data {		//since @jdk14

    public RealData {
        try {
            Thread.sleep(5 * 1000);		// 午餐制作
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

    }

    @Override
    public String getFood() {
        return this.result;
    }
}

```

```java
public class FutureData implements Data {

    protected RealData realData = null;

    protected boolean isReady = false;

    public synchronized void setRealData(RealData realData) { // 骑手取餐
        if (isReady)
            return;
        this.realData = realData;
        isReady = true;
        notifyAll();	//唤醒当前对象上的等待线程
    }

    @Override
    public synchronized String getFood() {	//用户取餐
        while (!isReady) {
            try {
                wait();	//当前线程进入等待并释放锁
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        return realData.getFood();
    }
}

```

```java
public class Main {

    public static class Client {

        public Data request(String order) {
            FutureData futureData = new FutureData();
            new Thread(() -> {
                RealData realData = new RealData(order);
                futureData.setRealData(realData);
            }).start();
            return futureData;
        }
    }


    public static void main(String[] args) {
        Client client = new Client();
        Data data = client.request("鱼香肉丝"); //开始订餐
        System.out.println("订单已经提交，骑手赶往店铺");//订餐完成

        try {// do something 摸鱼时间
            Thread.sleep(3000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }

        System.out.println("food is: " + data.getFood()); //拿到外卖
    }
}

```

## JDK中的Future模式

```java
public class Food implements Callable<String> {


    private String food;


    public Food(String food) {
        this.food = food;
    }

    @Override
    public String call() throws Exception {

        Thread.sleep(5 * 1000);	//配送

        return this.food;
    }
}

```

```java
    public static void main(String[] args) {
        FutureTask<String> futureTask = new FutureTask<>(new Food("鱼香肉丝"));
        ExecutorService service = Executors.newSingleThreadExecutor();
        service.execute(futureTask);

        System.out.println("下单完成");
        
        try {
            Thread.sleep(6 * 1000);//摸鱼
            System.out.println("lunch is : " + futureTask.get());
            service.shutdown();
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
        }
    }

```

