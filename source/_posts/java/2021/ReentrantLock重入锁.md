---
title: ReentrantLock重入锁
toc: true
comments: true
date: 2021-07-20 13:45:01
tags:
  - java
  - 线程
  - 锁
categories:
  - java
---



<!-- toc -->



重入锁采用 ***java.util.concurrent.locks.ReentrantLock***类实现，下面是一段简单的重入锁的案例:

```java
 public static ReentrantLock lock = new ReentrantLock();

    public static int i = 0;

    @Override
    public void run() {
        for(int j=0;j<10000000;j++){
            lock.lock();
            try{
                i++;
            }finally {
                lock.unlock();
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        SimpleReenterLock simpleReenterLock = new SimpleReenterLock();
        Thread t1 = new Thread(simpleReenterLock);
        Thread t2 = new Thread(simpleReenterLock);
        t1.start();
        t2.start();
        t1.join();
        t2.join();
        System.out.println(i);
    }

```

## 中断响应

使用可重入锁的过程中，如果一个线程在等待锁，那么程序可以根据需求取消对锁的请求。下面是简单的例子：

```java
	public static ReentrantLock lock1 = new ReentrantLock();
    public static ReentrantLock lock2 = new ReentrantLock();
    int lock;


    public InitLock(int lock) {
        this.lock = lock;
    }

    @Override
    public void run() {
        try {
            if (lock == 1) {
                lock1.lockInterruptibly();
                Thread.sleep(500);
                lock2.lockInterruptibly();

                System.out.println("handle "+lock);
            }else {
                lock2.lockInterruptibly();
                Thread.sleep(500);
                lock1.lockInterruptibly();

                System.out.println("handle "+lock);
            }
        } catch (InterruptedException e) {
            e.printStackTrace();
        }finally {
            if(lock1.isHeldByCurrentThread()){
                lock1.unlock();
            }
            if(lock2.isHeldByCurrentThread()){
                lock2.unlock();
                System.out.println(lock +"-"+ Thread.currentThread().getId() + ": thread exit!");
            }
        }
    }

    public static void main(String[] args) throws InterruptedException {
        InitLock initLock1 = new InitLock(1);
        InitLock initLock2 = new InitLock(2);
        Thread t1 = new Thread(initLock1);
        Thread t2 = new Thread(initLock2);
        t1.start();
        t2.start();
        Thread.sleep(1000);
        t2.interrupt();
    }
```

上述代码，很容易产生死锁。当t1线程申请lock1之后想申请lock2锁的时候，t2很容易提前申请到lock2，导致程序死锁。主程序触发t2的中断，使得t2线程释放资源，t1线程获得对应的lock2继续完成下面的代码任务。

## 锁申请等待限时

除了采用中断的方式获取外部通知，避免死锁还有另一中方法就限时等待。使用 ***tryLock( )*** 方法获取锁，该方法接受2个参数，一个表示等待时长，另一个表示计时单位。如果成功获得锁就会返回true，反之返回false。  ***ReentrantLock.tryLock( )*** 方法也可以不带参数直接运行，在这种情况下，当前线程会尝试获得锁，如果锁未被其他线程占用则申请锁成功，立即返回true；反之如果被其他线程占用，则其他线程不会进行等待，而是立即返回false。这种模式不会引起线程等待，因此不会产生死锁。

## 公平锁

一般情况下，锁的申请都是非公平的，重入锁允许我们对公平性进行设置，他的构造函数如下:

```java
public ReentrantLock(boolean  fair)
```

fair 为true表示当前的锁是公平的。默认情况下，锁是非公平的，实现公平锁必然要求系统维护一个有序队列，因此公平锁的实现成本比较高。如果没有特殊的需求则不需要使用公平锁。

```java
    private static final ReentrantLock fairLock = new ReentrantLock(true);

    @Override
    public void run() {
        while(true){
            try{
                fairLock.lock();
                System.out.println(Thread.currentThread().getName()+" get the lock");
            }finally {
                fairLock.unlock();
            }
        }
    }


    public static void main(String[] args){
        FairLock fairLock = new FairLock();
        Thread t1 = new Thread(fairLock,"t1");
        Thread t2 = new Thread(fairLock,"t2");

        t1.start();
        t2.start();
    }
```



