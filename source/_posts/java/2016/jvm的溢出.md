---
title: jvm的溢出
date: 2016-06-20 14:05:01
tags: 
  - 溢出
  - jvm
categories: 
  - java
---


#Java堆溢出
    java堆用于存储对象实例，只要不断地创建对象并保证GC Roots到对象之间有可达路径来避免垃圾回收机制清除这些对象，那么在对象处理到达最大堆的容量后就会产生内存溢出异常。
    java堆内存的OOM异常是实际应用中常见的内存溢出异常情况。当初出现java堆异常时，异常堆栈信息“java.lang.OutOfMemoryError”会跟着进一步提示“Java heap space”。
    要解决这个区域的异常重点是要确认内存中的对象是否是有必要的，也就是要先分清楚到底是出现了内存泄漏（Memory Leak）还是内存溢出(Memory OverFlow)。
#虚拟机栈和本地方法栈溢出
    关于虚拟机栈和本地方法栈，在Java虚拟机规范中描述了两种异常：
        如果线程请求的栈深度大于虚拟机所允许的最大深度，将抛出StackOverflowError异常。
        如果虚拟机在扩展栈时无法申请到足够的内存空间，则抛出OutOfMemoryError异常。
    首先在HotSpot虚拟机中并不区分虚拟机和本地方法栈，因此对于HotSpot来说-Xoss参数其实是无效的。
> 在windows平台的虚拟机中，Java的线程是映射到操作系统的内核线程上。
 
#方法区和运行时常量池溢出
    String.intern(）是一个Native方法，他的作用是：如果字符串常量池中已经包含了一个等于此String对象的字符串，则返回代表池中这个字符串的String对象；否则，将此String对象包含的字符串添加到常量池中，并且返回到此String的对象引用。
    下面是一个String.intern(）返回引用的测试
 ```
public class RuntimeConstantPoolOOM(){
    public static main(String[] args){
        String str1 = new StringBuffer("计算机").append("软件").toString();
           System.out.println(str1.intern() == str1);
	       String str2 = new StringBuffer("ja").append("va").toString(); 
	       System.out.println(str2.intern() == str2);
	       System.out.println(str2.intern());                    
        }    
}
 ```
在jdk 1.6中会返回两个false，在jdk 1.7中则会返回一个true 和一个false。
产生差异的原因是：
    在JDK 1.6中，intern（）方法会把首次遇到的字符串实例复制到永久代中，返回的也是永久代中这个字符串实例的引用，而由StringBuilder创建的字符串实例在Java堆上，所以必然不是同一个引用，将返回false。
    而JDK 1.7（以及部分其他虚拟机，例如JRockit）的intern（）实现不会再复制实例，只是在常量池中记录首次出现的实例引用，因此intern（）返回的引用和由StringBuilder创建的那个字符串实例是同一个。对str2比较返回false是因为“java”这个字符串在执行StringBuilder.toString（）之前已经出现过，字符串常量池中已经有它的引用了，不符合“首次出现”的原则，而“计算机软件”这个字符串则是首次出现的，因此返回true。
##方法区
    方法区用于存放Class的相关信息，如类名、访问修饰符、常来你吃、字段描述、方法描述等。在此借助CGLib直接操作字节码运行时产生了大量的动态类。
    方法区溢出也是一种常见的内存溢出异常，一个类要被垃圾收集器回收掉，判定条件是比较苛刻的。在经常动态生成大量Class的应用中，需要特别注意类的回收状况。这类场景除了上面提到的程序使用了CGLib字节码增强和动态语言之外，常见的还有：大量JSP或动态产生JSP文件的应用（JSP第一次运行时需要编译为Java类）、基于OSGi的应用（即使是同一个类文件，被不同的加载器加载也会视为不同的类）等。
```
public class JavaMethodAreaOOM{
    public static void main（String[]args）{
        while（true）{
            Enhancer enhancer=new Enhancer（）；
            enhancer.setSuperclass（OOMObject.class）；
            enhancer.setUseCache（false）；
            enhancer.setCallback（new MethodInterceptor（）{
    public Object intercept（Object obj,Method method,Object[]args,MethodProxy proxy）throws Throwable{
                     return proxy.invokeSuper（obj,args）；
            }
        }）；
        enhancer.create（）；
    }
}
static class OOMObject{
}
}
```
##本机直接内存溢出(不能理解)
    DirectMemory容量可通过-XX：MAXDirectMemorySize指定，如果不指定则默认于Java堆最大值（-Xmx指定）一样。
[参考文档链接](http://ju.outofmemory.cn/entry/75840)
    由DirectMemory导致的内存溢出，一个明显的特征是在HeapDump文件中不会看见明显的异常。NIO在1.4之后可以直接分配堆外内存(Native堆上)。NIO可能会导致本机直接内存溢出。