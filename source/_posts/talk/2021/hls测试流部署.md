---
title: hls测试流部署
toc: true
author: mirsery
comments: false
date: 2021-11-17 10:36:39
updated: 2021-11-17 10:36:39
tags: 
	- 闲谈
categories:	
	- 生活
excerpt: 'hls测试流简易部署全过程'	
---

> 利用nginx/ffmpeg将mp4格式的文件转换成m3u8流，并利用web服务器进行发布 

<!-- toc -->

# hls测试流简易部署全过程

web开发的过程中有时候会遇到缺少hls在线测试流的情况，这个时候就需要我们自己搭建可用的测试流服务。

## 第一步将下载的视频切片成m3u8
    
在此操作之前我们需要用到ffmpeg（[点击下载](https://ffmpeg.org/download.html)). FFmpeg是一套可以用来记录、转换数字音频、视频，并能将其转化为流的开源计算机程序。采用LGPL或GPL许可证。它提供了录制、转换以及流化音视频的完整解决方案。它包含了非常先进的音频/视频编解码库libavcodec。

下载安装完之后我们可以调用如下命令:

```shell
ffmpeg -i yoursource.mp4 -f segment -segment_time 60 -segment_format mpegts -segment_list yourtarget.m3u8 -c copy -bsf:v h264_mp4toannexb -map 0 yourtarget-%04d.ts
```
上述命令会按照60s的间隔对mp4文件进行切片。


## 第二步将切片的文件部署到web服务器中发布

以下是nginx服务器的简单部署配置示例

```
server {
        listen 80;
        index index.html;
        server_name xxxxxx; // 服务名
        location /{
            add_header Access-Control-Allow-Origin *; //允许跨域
            root /xxxx/videoPath; //视频切片存放路径
        }
 }
```

完成以上配置之后直接访问m3u8文件的web地址即可播放视频流