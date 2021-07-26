---
title: Semaphore 信号量
author: mirsery
date: 2021-07-21 22:55:01
tags: 
	- 线程
categories: 
	- java  
excerpt: '信号量为多线程协作提供了更为详细的控制方法，广义上说信号量是锁的扩展。无论是内部锁还是重入锁，一次只能允许一个线程访问一个资源，但是信号量却可...'  
---

信号量为多线程协作提供了更为详细的控制方法，广义上说信号量是锁的扩展。无论是内部锁还是重入锁，一次只能允许一个线程访问一个资源，但是信号量却可以指定多个线程并行访问某一个资源。

## 信号量提供的构造函数

JDK源码中 Semaphore 构造函数

```java
    /**
     * Creates a {@code Semaphore} with the given number of
     * permits and nonfair fairness setting.
     *
     * @param permits the initial number of permits available.
     *        This value may be negative, in which case releases
     *        must occur before any acquires will be granted.
     */
    public Semaphore(int permits) {
        sync = new NonfairSync(permits);
    }

    /**
     * Creates a {@code Semaphore} with the given number of
     * permits and the given fairness setting.
     *
     * @param permits the initial number of permits available.
     *        This value may be negative, in which case releases
     *        must occur before any acquires will be granted.
     * @param fair {@code true} if this semaphore will guarantee
     *        first-in first-out granting of permits under contention,
     *        else {@code false}
     */
    public Semaphore(int permits, boolean fair) {
        sync = fair ? new FairSync(permits) : new NonfairSync(permits);
    }
```
**permits** 信号量的准入数，即同时能申请多少个许可。

下面是jdk中信号量使用的简单的例子:
Semaphores are often used to restrict the number of threads than can access some (physical or logical) resource.
For example, here is a class that uses a semaphore to control access to a pool of items.

```java
class Pool {
   private static final int MAX_AVAILABLE = 100;
   private final Semaphore available = new Semaphore(MAX_AVAILABLE, true);

   public Object getItem() throws InterruptedException {
     available.acquire();
     return getNextAvailableItem();
   }

   public void putItem(Object x) {
     if (markAsUnused(x))
       available.release();
   }

   // Not a particularly efficient data structure; just for demo

   protected Object[] items = ... whatever kinds of items being managed
   protected boolean[] used = new boolean[MAX_AVAILABLE];

   protected synchronized Object getNextAvailableItem() {
     for (int i = 0; i < MAX_AVAILABLE; ++i) {
       if (!used[i]) {
         used[i] = true;
         return items[i];
       }
     }
     return null; // not reached
   }

   protected synchronized boolean markAsUnused(Object item) {
     for (int i = 0; i < MAX_AVAILABLE; ++i) {
       if (item == items[i]) {
         if (used[i]) {
           used[i] = false;
           return true;
         } else
           return false;
       }
     }
     return false;
   }
 }
```