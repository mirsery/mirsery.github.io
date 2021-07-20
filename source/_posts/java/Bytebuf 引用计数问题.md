---
title: ByteBuf 引用计数问题
date: 2021-04-25
tags: 
    - ByteBuf
    - netty
categories: 
    - java
---
>  netty框架使用过程中关于ByteBuf 的处理
> SImpleChannelInbound 会release ByteBuf，ChannelInboundHandlerAdapter 不会影响ByteBuf的引用计数


<!-- toc -->


下面是使用**EmbeddedChannel**来演示ByteBuf引用计数回收的示例

## 采用尾回收自动释放
```java
        EmbeddedChannel embeddedChannel = new EmbeddedChannel();
        embeddedChannel.pipeline().addLast(new MyInBound());
        ByteBuf buf = Unpooled.buffer();
        buf.writeBytes("hello world!".getBytes(StandardCharsets.UTF_8));
        embeddedChannel.writeInbound(buf);
        System.out.println("The buf refCnt is " + buf.refCnt());
        try {
            Thread.sleep(10 * 1000);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
```

```java
public class MyInBound extends ChannelInboundHandlerAdapter {
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        System.out.println("my inbound===");
        ByteBuf byteBuf = (ByteBuf) msg;
        System.out.println(byteBuf.slice().toString(CharsetUtil.UTF_8));
        ctx.fireChannelRead(byteBuf);//must pass Bytebuf 才能出发尾引用计数回收
    }
}
```

## 手动释放 

```java
public class MyInBound extends ChannelInboundHandlerAdapter {
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
        System.out.println("my inbound===");
        ByteBuf byteBuf = (ByteBuf) msg;
        System.out.println(byteBuf.slice().toString(CharsetUtil.UTF_8));
        byteBuf.release();
...
    }
}
```

>  netty自带的编码器处理了ByteBuf的引用释放问题 例如：StringDecoder.class