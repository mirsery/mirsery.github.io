---
title: netty框架获取websocket协议客户端的真实IP地址问题
author: mirsery
date: 2021-04-15
tags: 
  - netty
categories: 
  - java
---


# netty框架获取websocket协议客户端的真实IP地址问题
>  背景 目前服务器采用nginx进行反向代理部署，利用socketchannel获取的socketAddress为代理服务器的局域网ip

## 代理服务器的配置
首先代理服务器需将真实的ip地址转发到反向代理的服务上，因此代理服务器需增加代理的请求头。下面是nginx作为代理服务器的样例配置项
```
server {
    listen xx;
    location / {
                client_max_body_size 0;
                proxy_redirect http://$host/ http://$http_host/;
                proxy_set_header Host $host:$server_port;
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
                proxy_pass http://xxxxxx:xxxx;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_read_timeout 600s;
      }
}
```
其中** proxy_set_header X-Real-IP $remote_addr;**将真实的客户端ip转发给代理服务中。

##netty框架中获取传递的**X-Real-IP**请求头地址
netty中需要在协议升级之前读取channel的请求头的内容，下面是实例代码。
>  该handler需配置在**WebSocketServerProtocolHandler**之前**ChannelInboundHandlerAdapter**不会修改Bytebuf的引用计数问题，详情见[# ByteBuf 引用计数问题](./bytebuf-yin-yong-ji-shu-wen-ti)

```java
public class HttpHeadersHandler extends ChannelInboundHandlerAdapter {
    private final String REAL_IP = "X-Real-IP";
    @Autowired
    private IotClientManager clientManager;
    @Override
    public void channelRead(ChannelHandlerContext ctx, Object msg) throws Exception {
       if (msg instanceof FullHttpRequest) {
            FullHttpRequest httpRequest = (FullHttpRequest) msg;
            HttpHeaders headers = httpRequest.headers();
            String ip = headers.get(REAL_IP);
            if (ip != null) {
                clientManager.setIP(ctx.channel(), ip);
            }
        }
        ctx.fireChannelRead(msg);
    }
}
```