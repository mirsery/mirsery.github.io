---
title: netty重链接
author: mirsery
tags: 
  - netty
categories: 
  - java
---

在socket客户端编程中涉及到最多的就是长连接的问题。在netty框架中客户端和服务器之间的连接断开的话会触发channel的inactive方法，此时我们可以在inactive方法中实现客户端的断线重连机制。
    下面是示例代码
```java
 public Bootstrap createBootStrap(final Bootstrap bootstrap, final EventLoopGroup eventLoop) {
        if(bootstrap != null){
            bootstrap.group(eventLoop).channel(NioSocketChannel.class).handler(janusChannelInitializer);


            final ChannelFuture future = bootstrap.connect(new InetSocketAddress(configuration.getServerIP(), configuration.getPort()));

            future.addListener(new ChannelFutureListener() {
                @Override
                public void operationComplete(ChannelFuture channelFuture) throws Exception {
                    if (future.isSuccess()) {
                        log.info("janusClient connect to server "+ configuration.getServerIP()+" at port: {}", configuration.getPort());
                    } else {
                        log.error("janusClient can't connect to server "+configuration.getServerIP()+" at port: {}!", configuration.getPort());
                        eventLoop.schedule(new Runnable() {
                            @Override
                            public void run() {
                                createBootStrap(new Bootstrap(),eventLoop);
                                log.info("reconnect jsonClient.....");
                            }
                        },30L, TimeUnit.SECONDS);
                    }
                }
            });
            future.syncUninterruptibly();
        }
        return bootstrap;
    }
```
```java
 /**
     * Once channel is inactive
     */
    @Override
    public void channelInactive(ChannelHandlerContext ctx) throws Exception {
        log.info("enter inactive function . . .");
        final EventLoop eventLoop = ctx.channel().eventLoop();
        eventLoop.schedule(new Runnable() {
            @Override
            public void run() {
                JsonClient.getJsonClent().createBootStrap(new Bootstrap(),eventLoop);
                log.info("reconnect .....");
            }
        },10L, TimeUnit.SECONDS);
        super.channelInactive(ctx);
    }
```