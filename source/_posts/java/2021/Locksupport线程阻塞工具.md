---
title: 线程阻塞工具 Locksupport
date: 2021-07-22 20:31:30
toc: true
author: mirsery
comments: false
tags:
	- java
	- 线程
categories:	
	- java
excerpt: 'Lock Support 是一个非常方便的线程阻塞工具，他可以在线程内任意位置让线程阻塞。与 **Thread.suspend()** 方法相比，他补充了由于 **resume( )** 方法发生导致线程无法继续执行的情况...'  
---

> Lock Support 是一个非常方便的线程阻塞工具，他可以在线程内任意位置让线程阻塞。与 **Thread.suspend()** 方法相比，他补充了由于 **resume( )** 方法发生导致线程无法继续执行的情况。和**Object.wait( )**相比，他不需要先获得对象的锁，也不会抛出**InterruptedException**异常。

<!-- toc -->

## LockSupport 静态方法


**+ setCurrentBlocker( )**
**+ unpark( )**
**+ park( )**
**+ parkNanos( )**
**+ parkUntil( )**
**+ getBlocker( )**
**+ park( )**
**+ parkNanos( )**
**+ parkUntil( )**
**+ getThreadId( )**

LockSupport 的静态方法 **park(  )** 可以阻塞当前线程，类似的还有 **parkNanos( )** , **parkUtil( )** 等方法。

## LockSupport 的简易用法

下面是JDK中的先进先出的非可重入锁的简易示例代码:

```java
class FIFOMutex {
   private final AtomicBoolean locked  = new AtomicBoolean(false);
   private final Queue<Thread> waiters = new ConcurrentLinkedQueue<>();

   public void lock() {
     boolean wasInterrupted = false;
     // publish current thread for unparkers
     waiters.add(Thread.currentThread());

     // Block while not first in queue or cannot acquire lock
     while (waiters.peek() != Thread.currentThread() ||
            !locked.compareAndSet(false, true)) {
       LockSupport.park(this);
       // ignore interrupts while waiting
       if (Thread.interrupted())
         wasInterrupted = true;
     }

     waiters.remove();
     // ensure correct interrupt status on return
     if (wasInterrupted)
       Thread.currentThread().interrupt();
   }

   public void unlock() {
     locked.set(false);
     LockSupport.unpark(waiters.peek());
   }

   static {
     // Reduce the risk of "lost unpark" due to classloading
     Class<?> ensureLoaded = LockSupport.class;
   }
 }
```

