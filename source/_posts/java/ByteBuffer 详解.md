---
title: ByteBuffer详解
tags: 
    - ByteBuffer
    - netty
categories: 
    - java
---


# ByteBuffer详解
> 参考了开源中国上[talent-tan](https://my.oschina.net/talenttan/home)的一篇博客 [图解bytebuffer](https://my.oschina.net/talenttan/blog/889887)

- - - - -
java.nio.ByteBuffer
- byte get( )
    从当前位置获得一个字节，并将当前位置移动到下一个字节。
- byte get(int index)
    从指定索引处获得一个字节。
- ByteBuffer put(byte b)
    向当前位置推入一个字节，并将当前位置移动到下一个字节。返回对缓冲区的引用。
- ByteBuffer put(int index,byte b)
    向指定索引处推入一个字节，返回对这个缓冲区的引用。
- ByteBuffer get(byte[] destination)
- ByteBuffer get(byte[] destination,int offset ,int length)
     用缓冲区中的字节来填充字节数组，或者字节数组的某个区域，并将当前位置向前移动读入的字节数个位置。
    如果缓冲区不够大就不会读入任何字节，并抛出BufferUnderflow Exception。返回对这个缓冲区的引用。
    参数: destination     要填充的字节数组
                 offset              要填充区域的偏移量
                  length              要填充区域的长度
- Xxx getXxx()
- Xxx getXxx(int index)
- ByteBuffer putXxx(xxx value)
- ByteBuffer putXxx(int value,xxx value)
    获得或放置一个二进制数。Xxx是Int、Long、Short、Char、Float或者Double中的一个。
- ByteBuffer order(ByteOrder order)
- ByteBuffer order(order)
    设置获得字节顺序，order是ByteOrder类的常量BIG_ENDLAN或者LITTLE_ENDIAN中的一个。
- static ByteBuffer allcate(int capacity)
   构建具有指定容量的缓冲区，该缓冲区是对给定数组的包装。
- CharBuffer asCharBuffer ( )
    构建字符缓冲区，它是对缓冲区的包装。对该字符缓冲区的变更将在这个缓冲区中反映出来，但是该字符缓冲区
    有自己的位置、界限和标记。
- - - - -
java.nio.CharBuffer
- char get()
- CharBuffer get(char[] destination)
- CharBuffer get(char[] destination,int offset,int length)
    从这个缓冲区的当前位置开始，获取一个char值，或者一个范围内的所有char值，
    然后将位置向前移动越过所有读入的字符。最后两个方法将返回this。
- CharBuffer put(char c)
- CharBuffer put(char[] source)
- CharBuffer put(char[] source,int offset,int length)
- CharBuffer put(String source)
- CharBuffer put(CharBuffer source)
从这个缓冲区的当前位置开始，放置一个char值，或者一个范围内的所有char值，然后将位置向前移动越过所有被
写出的字符。当放置的值是从CharBuffer读入时，将读入剩下所有剩余字符。所有方法返回this。