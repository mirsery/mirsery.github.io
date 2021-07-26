---
title: Thread Synchronization Utilities
author: mirsery
date: 2016-07-24 10:03:01
tags: 
    - 线程
categories: 
    - java  
---



- ```The synchronized keyword```
- The Lock interface and its implementation classes: ```ReentrantLock```, ```ReentrantReadWriteLock.ReadLock```, and ```ReentrantReadWriteLock.WriteLock```
- ```Semaphores```: A semaphore is a counter that controls the access to one or more shared resources. This mechanism is one of the basic tools of concurrent programming and is provided by most of the programming languages.
- ```CountDownLatch```: The CountDownLatch class is a mechanism provided by the Java language that allows a thread to wait for the finalization of multiple operations.
- ```CyclicBarrier```: The CyclicBarrier class is another mechanism provided by the Java language that allows the synchronization of multiple threads in a common point.
- ```Phaser```: The Phaser class is another mechanism provided by the Java language that controls the execution of concurrent tasks divided in phases. All the threads must finish one phase before they can continue with the next one. This is a new feature of the Java 7 API.
- ```Exchanger```: The Exchanger class is another mechanism provided by the Java language that provides a point of data interchange between two threads.