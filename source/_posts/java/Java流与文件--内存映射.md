---
title: 内存映射文件
tags: 
    - io
categories: 
    - java
---


# 内存映射文件
内存映射文件包含虚拟内存中文件的内容。 利用文件与内存空间之间的映射，应用程序（包括多个进程）可以通过直接在内存中进行读写来修改文件。
在java中java.nio包使得内存映射文件的操作变得十分简单。[内存映射文件详情](https://msdn.microsoft.com/zh-cn/library/dd997372(v=vs.110).aspx#Anchor_0)
常见做法:
- 首先从文件中获得一个channel ( 用于磁盘文件的一种抽象，他使得我们可以访问诸如内存映射、文件加锁机制以及文件间快速数据传递等操作系统特性。 )
```java
    FileChannel channel = FileChannel.open(path,options);
```
- 然后通过调用FileChannel类的map方法从这个通道中获得一个ByteBuffer。映射的文件区域与映射模式支持的有三种:
    - FileChannel.MapMode.READ_ONLY : 所产生的缓冲区是只读的，任何对该缓冲区的写入尝试都会导致ReadOnlyBufferException异常。
    - FileChannel.MapModel.READ_WRITE : 所产生的缓冲区是可写的，任何修改都会在某个时刻写回到文件中。注意，其他映射到同一个文件的程序可能不能立即看到这些修改，多个程序同时进行文件映射的确切行为是依赖于操作系统的。 
    - FileChannel.MapMode.PRIVATE : 所产生的缓冲区是可写的，但是任何修改对这个缓冲区来说都是私有的，不会传播到文件中。
>  java对于二进制数据使用高位在前的排序机制，但是如果需要以低位在前的排序方式处理包含二进制数字的文件，那么只需调用``` buffer.order(ByteOrder.LITTLE_ENDIAN);```要查询缓冲区内当前的字节顺序可以调用:``` ByteOrder b = buffer.order()```
下面是一个文件copy使用内存映射的例子:
```java
package com.example.byteBuffer;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.nio.MappedByteBuffer;
import java.nio.channels.FileChannel;
/**
 * Created by mirsery on 02/05/2017.
 */
public class MaoMemberBuffer {
        /**内存映射*/
    public static void main(String[] args){
        try {
            FileInputStream fileInputStream = new FileInputStream("test.mp4");
            FileOutputStream fileOutputStream = new FileOutputStream("test1.mp4");
            FileChannel fileInChannel = fileInputStream.getChannel();
            FileChannel fileOutChannel = fileOutputStream.getChannel();
            MappedByteBuffer mappedByteBuffer = fileInChannel.map(FileChannel.MapMode.READ_ONLY,0,fileInChannel.size());
            fileOutChannel.write(mappedByteBuffer);
            mappedByteBuffer.flip();//指针指向0
            fileOutChannel.close();
            fileOutputStream.close();
            fileInChannel.close();
            fileInputStream.close();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
```
常用的API:
- java.nio.channels.FileChannel
    - static FileChannel open(Path path,OpenOption ... optioins)
                打开指定路径的文件通道，默认状况下，通道打开时用于读入。
    - MappedByteBuffer map(FileChannel.MapMode mode,long position,long size)
                 将文件的一个区域映射到内存中
    - boolean hasRemining()
                如果当前的缓冲区位置没有到达这个缓冲区的界限位置，则返回true。
    - int limit()
                返回这个缓冲区的界限位置，即没有任何价值可用的第一个位置。