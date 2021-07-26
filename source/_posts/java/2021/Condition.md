---
title: Condition
toc: true
comments: false
date: 2021-07-20 22:48:13
author: mirsery
tags:
  - 线程
  - java
categories:
  - java
excerpt: 'Condition 一般配合重入锁实现进程间的协作....'  
---



> Condition 一般配合重入锁实现进程间的协作.



<!-- toc -->



## Condition 接口源码

```java
package java.util.concurrent.locks;

import java.util.Date;
import java.util.concurrent.TimeUnit;


public interface Condition {
  	/*
  	 * Causes the current thread to wait until it is signalled or
     * {@linkplain Thread#interrupt interrupted}.
     *
     * <p>The lock associated with this {@code Condition} is atomically
     * released and the current thread becomes disabled for thread scheduling
     * purposes and lies dormant until <em>one</em> of four things happens:
     * <ul>
     * <li>Some other thread invokes the {@link #signal} method for this
     * {@code Condition} and the current thread happens to be chosen as the
     * thread to be awakened; or
     * <li>Some other thread invokes the {@link #signalAll} method for this
     * {@code Condition}; or
     * <li>Some other thread {@linkplain Thread#interrupt interrupts} the
     * current thread, and interruption of thread suspension is supported; or
     * <li>A &quot;<em>spurious wakeup</em>&quot; occurs.
     * </ul>
     *
     * <p>In all cases, before this method can return the current thread must
     * re-acquire the lock associated with this condition. When the
     * thread returns it is <em>guaranteed</em> to hold this lock.
  	*/
    void await() throws InterruptedException;
  
    void awaitUninterruptibly();
  
    long awaitNanos(long nanosTimeout) throws InterruptedException;
  
  	boolean await(long time, TimeUnit unit) throws InterruptedException;
    
  	boolean awaitUntil(Date deadline) throws InterruptedException;
    
  	/**
     * Wakes up one waiting thread.
     *
     * <p>If any threads are waiting on this condition then one
     * is selected for waking up. That thread must then re-acquire the
     * lock before returning from {@code await}.
     *
     * <p><b>Implementation Considerations</b>
     *
     * <p>An implementation may (and typically does) require that the
     * current thread hold the lock associated with this {@code
     * Condition} when this method is called. Implementations must
     * document this precondition and any actions taken if the lock is
     * not held. Typically, an exception such as {@link
     * IllegalMonitorStateException} will be thrown.
     */
  	void signal();
    
  	void signalAll();
}
```



**await( )** 方法会使当前线程等待，自动释放当前锁。当其他线程使用 **signal( )** 时，该线程必须要重新再次获取锁并继续执行。



```java
public class ReenterLockCondition implements Runnable {

    private static ReentrantLock lock = new ReentrantLock();
    public static Condition condition = lock.newCondition();


    @Override
    public void run() {
        try {
            lock.lock();
            condition.await(); //等待
            System.out.println("Thread is going on ");
        } catch (InterruptedException e) {
            e.printStackTrace();
        } finally {
            lock.unlock();
        }
    }


    public static void main(String[] args) throws InterruptedException {

        ReenterLockCondition reenterLockCondition = new ReenterLockCondition();
        Thread t = new Thread(reenterLockCondition);
        t.start();
        Thread.sleep(2000);
        lock.lock();
        condition.signal();
        lock.unlock();
    }
}

```



As an example, suppose we have a bounded buffer which supports put and take methods. If a take is attempted on an empty buffer, then the thread will block until an item becomes available; if a put is attempted on a full buffer, then the thread will block until a space becomes available. We would like to keep waiting put threads and take threads in separate wait-sets so that we can use the optimization of only notifying a single thread at a time when items or spaces become available in the buffer. This can be achieved using two Condition instances.



```java
 class BoundedBuffer<E> {
     final Lock lock = new ReentrantLock();
     final Condition notFull  = lock.newCondition(); 
     final Condition notEmpty = lock.newCondition(); 
  
     final Object[] items = new Object[100];
     int putptr, takeptr, count;
  
     public void put(E x) throws InterruptedException {
       lock.lock();
       try {
         while (count == items.length)
           notFull.await();
         items[putptr] = x;
         if (++putptr == items.length) putptr = 0;
         ++count;
         notEmpty.signal();
       } finally {
         lock.unlock();
       }
     }
  
     public E take() throws InterruptedException {
       lock.lock();
       try {
         while (count == 0)
           notEmpty.await();
         E x = (E) items[takeptr];
         if (++takeptr == items.length) takeptr = 0;
         --count;
         notFull.signal();
         return x;
       } finally {
         lock.unlock();
       }
     }
   }
```

Jdk 中 ***java.util.concurrent.ArrayBlockingQueue*** 同时也是利用Condition 来生产者和消费者队列。

