---
title: java中的AQS抽象队列同步器
toc: true
author: mirsery
comments: false
date: 2024-02-27 10:57:53
updated: 2024-02-27 10:57:53
tags:
    - java
categories:
    - java
excerpt: 'AQS是Java中的一个抽象队列同步器（AbstractQueuedSynchronizer）类，它提供了一种实现同步器的框架和实现方式。它是Java并发编程中的一个重要组成部分，广泛用于实现ReentrantLock、Semaphore、CountDownLatch等同步工具类。'
---


<!-- toc -->

## 什么是AQS
AQS 的全称为 AbstractQueuedSynchronizer ，翻译过来的意思就是抽象队列同步器。这个类在 java.util.concurrent.locks 包下面。

AbstractQueuedSynchronizer抽象队列同步器——用于构建锁或其他同步组件的基础框架，子类通过继承AQS并实现它的抽象方法来实现锁

AQS支持两种模式——独占模式，共享模式。

主要思想：FIFO（先进先出队列）
实现算法：CLH队列算法
底层数据结构：双项链表


## AbstractQueuedSynchronizer方法解析

AbstractQueuedSynchronizer（AQS）是Java并发编程中的一个基础框架，它提供了一种实现同步器的通用方法。AQS内部维护了一个同步队列，通过“自旋”和“阻塞”两种方式来实现同步操作。

AQS提供了一些核心方法，其含义和作用如下：

acquire(int arg): 尝试获取同步状态，如果获取失败则加入同步队列并阻塞等待唤醒，直到获取同步状态成功。参数arg表示获取同步状态所需的资源数量。

tryAcquire(int arg): 尝试获取同步状态，如果获取成功则返回true，否则返回false。参数arg表示获取同步状态所需的资源数量。

release(int arg): 释放同步状态，通知其他线程可以尝试获取同步状态。参数arg表示释放的资源数量。

tryRelease(int arg): 尝试释放同步状态，如果释放成功则返回true，否则返回false。参数arg表示释放的资源数量。

acquireInterruptibly(int arg): 尝试获取同步状态，如果获取失败则加入同步队列并阻塞等待唤醒，直到获取同步状态成功或者被中断。参数arg表示获取同步状态所需的资源数量。

acquireShared(int arg): 尝试获取共享同步状态，如果获取失败则加入同步队列并阻塞等待唤醒，直到获取共享同步状态成功。参数arg表示获取共享同步状态所需的资源数量。

tryAcquireShared(int arg): 尝试获取共享同步状态，如果获取成功则返回非负数，否则返回负数。返回值表示当前线程获取到的共享资源数量。参数arg表示获取共享同步状态所需的资源数量。

releaseShared(int arg): 释放共享同步状态，通知其他线程可以尝试获取共享同步状态。参数arg表示释放的资源数量。

tryAcquireNanos(int arg, long nanosTimeout): 在规定时间内尝试获取同步状态，如果获取失败则加入同步队列并阻塞等待唤醒，直到获取同步状态成功或者超时。参数arg表示获取同步状态所需的资源数量，参数nanosTimeout表示等待超时时间。

AQS提供了一些核心方法来实现同步操作，可以用于实现不同类型的同步器，如ReentrantLock、Semaphore、CountDownLatch等。这些方法可以满足不同的并发编程需求，需要根据具体的场景选择合适的同步方式和同步策略。

## 自旋和阻塞
自旋和阻塞是Java并发编程中两种不同的线程等待方式。

自旋是指线程在等待某个条件满足时，不断地循环检查条件是否满足，如果不满足就一直循环等待，直到条件满足。自旋的好处是可以减少线程上下文切换的开销，因为线程一直处于执行状态，不需要进行线程状态的切换。但是自旋需要占用CPU资源，如果自旋时间过长会导致CPU资源浪费，降低系统性能。

阻塞是指线程在等待某个条件满足时，将自己挂起，不再占用CPU资源，直到条件满足时再被唤醒继续执行。阻塞的好处是可以释放CPU资源，避免浪费，但是阻塞需要进行线程状态的切换，如果线程频繁地阻塞和唤醒会增加系统开销。

在Java中，阻塞通常是通过调用wait()方法或者阻塞式IO来实现的，而自旋通常是在锁等待时实现的。例如，在ReentrantLock中，当线程尝试获取锁失败时，它会在同步队列中自旋等待锁的释放，直到锁被释放或者等待时间超过一定阈值才会阻塞等待。因此，在选择线程等待方式时需要根据具体的场景和需求进行权衡和选择。

## ReentrantLock，Semaphore以及CountDownLatch对比
ReentrantLock、Semaphore和CountDownLatch都是Java并发编程中常用的同步工具类，它们都使用了AQS的实现方式。
ReentrantLock（可重入锁）：是一种独占锁，它允许一个线程多次获取锁，支持公平锁和非公平锁。与synchronized关键字相比，ReentrantLock提供了更多的灵活性和功能，如可中断锁、限时锁、公平锁等。
Semaphore（信号量）：是一种共享锁，它用于控制对资源的访问数量。Semaphore维护了一个计数器，当有线程获取信号量时，计数器减1，当计数器为0时，其他线程需要等待。Semaphore可以用于实现限流、资源池等功能。
CountDownLatch（倒计时器）：是一种同步工具类，它可以让一个或多个线程等待其他线程执行完毕后再继续执行。CountDownLatch维护了一个计数器，当计数器为0时，等待的线程可以继续执行。它可以用于协调多个线程的执行顺序。


## ReentrantLock实现原理
获取锁：当一个线程请求获取锁时，ReentrantLock会首先尝试获取锁，如果锁未被占用，则该线程可以立即获取锁；否则，该线程将被加入到同步队列中等待获取锁。
可重入性：如果当前线程已经持有锁，那么它可以重复获取该锁，而不需要重新等待。为了实现可重入性，ReentrantLock需要维护一个记录锁持有者的ThreadLocal变量，以及一个记录锁持有次数的计数器。
公平性和非公平性：ReentrantLock支持公平锁和非公平锁。公平锁是指多个线程获取锁的顺序与它们加入同步队列的顺序相同；非公平锁则不保证获取锁的顺序与加入队列的顺序相同。在公平锁模式下，线程获取锁的顺序是有序的，但是会降低并发性能；在非公平锁模式下，线程获取锁的顺序是不确定的，但是可以提高并发性能。
释放锁：当一个线程释放锁时，ReentrantLock会将state变量置为0，以表示该锁已经被释放。同时，它会从同步队列中选择一个等待的线程唤醒，使其重新尝试获取锁。如果当前线程还持有该锁，那么需要将计数器减1，直到计数器为0才能完全释放锁。
ReentrantLock源码中compareAndSetState的方法

在ReentrantLock的源码中，比较并交换（CompareAndSet）状态值是实现锁的核心部分之一。在ReentrantLock中，状态值的改变可以表示锁的获取和释放，因此状态值的比较并交换是实现锁的关键。

在ReentrantLock中，状态值是由AQS（AbstractQueuedSynchronizer）的内部类Node中的state字段表示的。具体来说，当线程获取锁时，它会创建一个Node节点并尝试将状态值从0（表示锁未被占用）改变为1（表示锁已被占用）。当线程释放锁时，它会将状态值从1改变为0，表示锁已被释放。

在AQS中，compareAndSetState(int expect, int update)方法用于比较并交换状态值。具体来说，该方法会比较当前状态值是否等于expect，如果是则将状态值修改为update，否则不进行修改。这个方法是原子的，可以保证状态值的改变是线程安全的。在ReentrantLock中，使用compareAndSetState方法实现锁的获取和释放，比如在获取锁时将状态值从0修改为1，在释放锁时将状态值从1修改为0。

下面是ReentrantLock源码中compareAndSetState方法的具体实现：
```java
protected final boolean compareAndSetState(int expect, int update) {
    return unsafe.compareAndSwapInt(this, stateOffset, expect, update);
}
```
该方法调用了unsafe类的compareAndSwapInt方法，该方法是一个本地方法，用于实现原子的比较并交换操作。其中，this表示当前对象，stateOffset表示state字段在对象中的偏移量，expect表示期望的状态值，update表示要修改的状态值。如果当前状态值等于expect，则将状态值修改为update并返回true，否则返回false。
总之，ReentrantLock中的compareAndSetState方法实现了状态值的原子性修改，是实现锁的关键部分之一。


## Semaphore实现原理
Semaphore是一个计数信号量，它可以用于控制同时访问某个资源的线程数量。Semaphore内部维护了一个计数器，表示可以访问资源的线程数量，线程在访问资源时需要先获取Semaphore的许可，当计数器的值大于0时，线程可以获取许可并访问资源，计数器的值减一；当计数器的值为0时，线程需要等待其他线程释放许可才能获取许可并访问资源。

Semaphore的实现原理主要是基于AQS（AbstractQueuedSynchronizer）类，Semaphore通过AQS实现了许可的获取和释放，并且保证了线程之间的互斥和同步。

Semaphore的实现可以分为两个部分：获取许可和释放许可。

- 获取许可
Semaphore的acquire方法用于获取许可，如果当前有可用的许可则获取成功，如果没有则线程会被阻塞等待。acquire方法的具体实现如下：
```java
public void acquire() throws InterruptedException {
    sync.acquireSharedInterruptibly(1);
}
```
acquire方法内部调用了AQS的acquireSharedInterruptibly方法，该方法实现了阻塞等待。如果当前计数器的值大于0，线程可以获取许可并将计数器的值减一，如果计数器的值为0，则线程会被阻塞等待其他线程释放许可。在AQS中，线程的阻塞等待是通过将线程添加到同步队列中实现的。

- 释放许可
Semaphore的release方法用于释放许可，如果当前没有线程等待许可则将许可的数量加一，如果有线程等待许可则唤醒一个等待线程并将许可的数量加一。release方法的具体实现如下：
```java
public void release() {
    sync.releaseShared(1);
}
```
release方法内部调用了AQS的releaseShared方法，该方法实现了许可的释放和等待线程的唤醒。如果当前有等待线程，则会从同步队列中唤醒一个线程，让其获取许可并执行；如果当前没有等待线程，则将许可的数量加一。

Semaphore是基于AQS实现的一个计数信号量，通过计数器实现了对许可的控制，并通过同步队列实现了线程之间的同步和互斥。Semaphore的实现为线程的访问资源提供了一个简单而可靠的机制。
