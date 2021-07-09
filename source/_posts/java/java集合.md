---
title: java集合
date: 2016-09-06 23:58:10
tags: 
    - 集合
categories: 
    - java
---


<!-- toc -->

# 一、java中集合的关系图
![](~/20150501232236784.png)
集合体系盗图

![](~/20150501232625059.png)

# 二、Collection
   Collection是最基本的集合接口，一个Collection代表一组Object，即Collection的元素（Elements）。一些Collection允许相同的元素而另一些不行。一些能排序而另一些不行，于是衍生出两个子类接口List和Set。
   
![](~/20150501233345854.png)
## Collection基本功能
          A:添加功能
                          boolean add(Object obj):向集合中添加一个元素
                          boolean addAll(Collection c)：向集合中添加一个集合的元素。
          B:删除功能
                          void clear()：删除集合中的所有元素。
                          boolean remove(Object obj)：从集合中删除指定的元素
                          boolean removeAll(Collection c):从集合中删除一个指定的集合元素。
          C:判断功能
                          boolean isEmpty()：判断集合是否为空。
                          boolean contains(Object obj)：判断集合中是否存在指定的元素。
                          boolean containsAll(Collection c)：判断集合中是否存在指定的一个集合中的元素。
          D:遍历功能
                          Iterator iterator():就是用来获取集合中每一个元素。
          E:长度功能
                          int size():获取集合中的元素个数
          F:交集功能
                          boolean retainAll(Collection c):判断两个集合中是否有相同的元素。???
          G:把集合转换成数组
                          Object[] toArray():把集合变成数组。
## List接口
        List接口下的集合元素存储有序，可以重复。
            List的特有功能
              A:添加功能
                  void add(int index, Object obj):在指定位置添加元素
              B:删除功能
                  Object remove(int index):根据指定索引删除元素，并把删除的元素返回。
              C:修改功能
                  Object set(int index, Object obj):把指定索引位置的元素修改为指定的值，返回修改前的值。
              D:获取功能
                  int indexOf(Object o):返回指定元素在集合中第一次出现的索引
                  Object get(int index):获取指定位置的元素
                  ListIterator listIterator()：列表迭代器
              E:截取功能
                  List subList(int fromIndex, int toIndex)：截取集合。
## Set 接口
               Set接口下的元素无序，不可以重复。其下面分为HashSet和TreeSet。
              HashSet
               底层数据结构是哈希表，线程不安全，效率高。
               保证唯一性依赖两个方法：hashCode()和equals()。
               顺序：
                       判断hashCode()值是否相同。
                       相同：继续走equals(),看返回值
                                   如果true：就不添加到集合。
                                   如果false：就添加到集合。
                       不同：就添加到集合。
              TreeSet
                底层数据结构是二叉树，线程不安全，效率高。
                保证元素唯一性的方法时根据返回值是否是0。
                保证排序的两种方式：
                        自然排序（元素具备比较性）：实现Comparable接口
                        比较器排序（集合具备比较性）：实现Comparator接口
        
![](~/20150501235138962.png)