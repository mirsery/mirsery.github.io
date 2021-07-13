---
title: JVM参数
date: 2016-11-23 10:32:01
tags: 
  - 调优
  - 监测
  - jvm
categories: 
  - java
---

# jvm 参数

## 1、-XX:+PrintGCDetails   打印GC回收的细节
1.4.0引入，默认不启用
打印格式例如：
[Full GC (System) [Tenured: 0K->2394K(466048K), 0.0624140 secs] 30822K->2394K(518464K), [Perm : 10443K->10443K(16384K)], 0.0625410 secs] [Times: user=0.05 sys=0.01, real=0.06 secs]
该选项可通过 com.sun.management.HotSpotDiagnosticMXBean API 和 Jconsole 动态启用。

## 2、-XX:SurvivorRatio=8 Eden与Survivor的占用比例
例{如8表示，一个survivor区占用 1/8 的Eden内存，即1/10的新生代内存，为什么不是1/9？
因为我们的新生代有2个survivor，即S1和S2。所以survivor总共是占用新生代内存的 2/10，Eden与新生代的占比则为 8/10。

## 3、-XX:HeapDumpPath=./java_pid<pid>.hprof 堆内存快照的存储文件路径

什么是堆内存快照？
当java进程因OOM或crash被OS强制终止后，会生成一个hprof（Heap PROFling）格式的堆内存快照文件。该文件用于线下调试，诊断，查找问题。
文件名一般为
java_<pid>_<date>_<time>_heapDump.hprof
解析快照文件，可以使用 jhat, eclipse MAT，gdb等工具。


## 4、-XX:-HeapDumpOnOutOfMemoryError 在OOM时，输出一个dump.core文件，记录当时的堆内存快照

## 5、-XX:MaxPermSize=64m Perm（俗称方法区）占整个堆内存的最大值

## 6、java -Xmx3550m -Xms3550m -Xmn2g -Xss128k

- -Xmx3550m ：设置JVM最大可用内存为3550M

- -Xms3550m ：设置JVM初始内存为3550m。此值可以设置与-Xmx相同，以避免每次垃圾回收完成后JVM重新分配内存。

- -Xmn2g ： 设置年轻代大小为2G。整个JVM内存大小 = 年轻代大小 + 年老代大小 持久代一般固定大小为64M，所以增大年轻代后，将会缩小年老代大小。此值对系统性能影响较大，Sum官方推荐配置为整个堆的3/8。

- -Xss128k ： 设置每个线程的堆栈大小。JDK5.0以后每个线程堆栈大小为1M，以前每个线程堆栈大小为256K。根据应用的线程所需内存大小进行调整。在相同物理内存下，减小这个值能生成更多的线程。但是操作系统对一个进程内的线程数还是有限制的，不能无限生成，经验值在3000~5000左右。

## 7、-XX:NewRatio=4  -XX:MaxTenuringThreshold=0
- -XX:NewRatio=4:设置年轻代（包括Eden和两个Survivor区）与年老代的比值（除去持久代）。设置为4，则年轻代与年老代所占比值为1：4，年轻代占整个堆栈的1/5

- -XX:MaxTenuringThreshold=0：设置垃圾最大年龄。如果设置为0的话，则年轻代对象不经过Survivor区，直接进入年老代。对于年老代比较多的应用，可以提高效率。如果将此值设置为一个较大值，则年轻代对象会在Survivor区进行多次复制，这样可以增加对象再年轻代的存活时间，增加在年轻代即被回收的概率。

## 8、-XX:PretenureSizeThreshold （只对Serial和ParNew收集器有效）
- -XX:PretenureSizeThreshold 大于此设置值的对象直接在老年代分配，这样的目的是避免在Eden区以及两个Survivor区之间发生大量的内存复制(新生代采用复制算法收集内存)