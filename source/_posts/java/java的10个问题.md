---
title: java的10个问题
date: 2016-05-23 20:34
tags: 
    - 习题
    - 转载
categories: 
    - java
---


>   作者： 奋斗在路上 
>   链接：http://www.imooc.com/article/3501
>   来源：慕课网

#1、 为什么两个（1927年）时间相减得到一个奇怪的结果？ 
如果执行下面的程序，程序解析两个间隔1秒的日期字符串并比较：
```
    public static void main(String[] args) throws ParseException {
     SimpleDateFormat sf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); 
     String str3 = "1927-12-31 23:54:07"; 
     String str4 = "1927-12-31 23:54:08";
     Date sDt3 = sf.parse(str3);
     Date sDt4 = sf.parse(str4); 
     long ld3 = sDt3.getTime() /1000; 
     long ld4 = sDt4.getTime() /1000; 
     System.out.println(ld4-ld3); 
     }
```
输出的是：
```
    353
```
为什么ld4-ld3不是1，而是353？如果将日期字符串各加一秒：
```
    String str3 = "1927-12-31 23:54:08";
    String str4 = "1927-12-31 23:54:09";
```
ld4-ld3的结果是1.
```
    sun.util.calendar.ZoneInfo[id="Asia/Shanghai",
    offset=28800000,dstSavings=0,
    useDaylight = false,
    transitions = 19,
    lastRule = null]
    Locale(Locale.getDefault()):zh_CN
```
解决方案 这是上海时区，在12月31日有一个变化。 了解上海在1927年时区变化的细节。基本上在1927年年底的午夜，始终会回拨5分52秒。所以“1927-12-31 23:54:08”实际上发生了两次，看起来Java解析了后一次的时间作为当地的日期和时间导致了差异。
#2、Java是“引用传递”还是“值传递”？
    Java一直都是值传递
#3、一个关于Java += 操作符的问题
    i += j;
    等价于
    i = (type of i)(i+j);
#4、HashMap 和 Hashtable之间的不同？
    java中HashMap和Hashtable的不同是什么？在非多线程应用中使用哪个更有效率？
    Java 中 HashMap 和 HashTable 有几个不同点： 
    Hashtable 是同步的，然而 HashMap不是。这使得HashMap更适合非多线程应用，因为非同步对象通常执行效率优于同步对象。 
    Hashtable 不允许 null 值和键。
    HashMap允许有一个 null 键和人一个 NULL 值。 
    HashMap的一个子类是LinkedHashMap。所以，如果想预知迭代顺序（默认的插入顺序），只需将HashMap转换成一个LinkedHashMap。
    用Hashtable就不会这么简单。 因为同步对你来说不是个问题，我推荐使用HashMap。如果同步成为问题，你可能还要看看ConcurrentHashMap。
#5、（如何） 读取或者把一个 InputStream 转成一个 String 
    如果你有一个 java.io.InputStream 对象，如处理这个对象并生成一个字符串？ 假定我有一个 InputStream 对象，它包含文本数据，我希望将它转化成一个字符串（例如，这样我可以将流的内容写到一个log文件中）。 
    InputStream 转化成 String 最简单方法是什么？ 
    解决方案 
    使用 Apache commons IOUtils库来拷贝InputStream到StringWriter是一种不错的方式，类似这样：
    
```
    StringWriter writer = new StringWriter(); 
    IOUtils.copy(inputStream, writer, encoding); 
    String theString = writer.toString(); 甚至 // NB: does not close inputStream, you can use IOUtils.closeQuietly for that // 注意：不关闭inputStream，你可以使用 IOUtils.closeQuietly String theString = IOUtils.toString(inputStream, encoding); 或者，如果不想混合Stream和Writer，可以使用 ByteArrayOutputStream。 
```
#6、为什么Java中的密码优先使用 char[] 而不是String？ 
     在Swing中，密码字段有一个getPassword()（返回 char数组）方法而不是通常的getText()（返回String）方法。同样的，我遇到过一个建议，不要使用 String 来处理密码。 为什么String涉及到密码时，它就成了一个安全威胁？感觉使用char数组不太方便。 解决方案 String是不可变的。这意味着一旦创建了字符串，如果另一个进程可以进行内存转储，在GC发生前，（除了反射）没有方法可以清除字符串数据。 使用数组操作完之后，可以显式地清除数据：可以给数组赋任何值，密码也不会存在系统中，甚至垃圾回收之前也是如此。 所以，是的，这是一个安全问题 – 但是即使使用了char数组，仅仅缩小了了攻击者有机会获得密码的窗口，它值针对制定的攻击类型。 
#7、遍历HashMap的最佳方法   
    遍历HashMap中元素的最佳方法是什么？ 
    解决方案 这样遍历entrySet： 
```    
public static void printMap(Map mp) { 
    Iterator it = mp.entrySet().iterator(); 
    while (it.hasNext()) { 
        Map.Entry pair = (Map.Entry)it.next(); 
        System.out.println(pair.getKey() + " = " + pair.getValue()); 
        it.remove(); // avoids a ConcurrentModificationException } 
        } 
``` 
#8、（如何）从数组创建ArrayList
    我有一个数组，初始化如下： 
    Element[] array = {new Element(1), new Element(2), new Element(3)}; 我希望将这个数组转化成一个ArrayList类的对象。 
    解决方案 new ArrayList(Arrays.asList(array)) 
#9、产生一个Java的内存泄露
    我有过一个面试，被问到如何产生一个Java内存泄露。不用说，我感到相当傻，甚至如何产生一个的线索都没有。 那么怎么才能产生一个内存泄露呢？ 
    解决方案 在纯Java中，有一个很好的方式可以产生真正的内存泄露（通过执行代码使对象不可访问但仍存在于内存中）： 应用产生一个长时间运行的线程（或者使用一个线程池加速泄露）。 线程通过一个（可选的自定义）类加载器加载一个类。 该类分配大内存（例如，new byte[1000000]），赋值给一个强引用存储在静态字段中，再将它自身的引用存储到ThreadLocal中。分配额外的内存是可选的（泄露类实例就够了），但是这样将加速泄露工作。 线程清除所有自定义类的或者类加载器载入的引用。 重复上面步骤。 这样是有效的，因为ThreadLocal持有对象的引用，对象持有类的引用，接着类持有类加载器的引用。反过来，类加载器持有所有已加载类的引用。这会使泄露变得更加严重，因为很多JVM实现的类和类加载都直接从持久带（permgen）分配内存，因而不会被GC回收。 
#10、使用Java在一个区间内产生随机整数数
    我试着使用Java生成一个随机整数，但是随机被指定在一个范围里。例如，整数范围是5~10，就是说5是最小的随机值，10是最大的。5到10之间的书也可以是生成的随机数。 解决方案 标准的解决方式（Java1.7 之前）如下： 

 ```
 import java.util.Random; 
 public static int randInt(int min, int max) {
  Random rand; 
  int randomNum = rand.nextInt((max - min) + 1) + min; 
  return randomNum; 
  } 
  ```
  请查看相关的JavaDoc。在实践中，java.util.Random 类总是优于 java.lang.Math.random()。 特别是当标准库里有一个直接的API来完成这个工作，就没有必要重复制造轮子了。