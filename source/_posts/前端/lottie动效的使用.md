---
title: lottie动效的使用
toc: true
author: mirsery
comments: false
date: 2022-09-05 16:33:21
updated: 2022-09-05 16:33:21
tags:
    - 动画
categories:
    - 前端
excerpt: 'Lottie 从UI动画场景出发解决矢量动画渲染的问题，使用 AE Script SDK 来导出 AE 工程。'
---


<!-- toc -->


## AE上插件的安装

AE需要安装**bodymovin插件**

**BodyMovin**插件可以将AE源文件导出为json。

- 下载 ZXP 安装程序
[点击下载ZXP](http://aescripts.com/learn/zxp-installer/)

- 下载最新的bodymovin扩展

[下载最新的扩展文件](https://github.com/airbnb/lottie-web/tree/master/build/extension)

- 打开ZXP安装程序并选择bodymovin扩展安装

## web端使用

安装**lottie-web**

```json
npm install lottie-web
```

下面是示例代码:
```html
<template>
  <div style="width:100%;height:100%;" id="bodymovin"></div>
</template>

<script>
import lottie from 'lottie-web'

export default {
  name: "AnimationComponent",
  methods:{
    loadAnimation(){
      let animData = {
        wrapper: document.getElementById('bodymovin'),
        animType: 'html',
        loop: false,
        prerender: true,
        autoplay: true,
        path: 'static/data.json',
      };
      let lottiePlayer = lottie.loadAnimation(animData);
      let temp = 1;
      lottiePlayer.addEventListener("complete",function (){
        console.log("动画完成")
        // lottiePlayer.playSegments([158,226], true)
        if(temp > 0){
          lottiePlayer.playSegments([158,226], true)
        }else{
          lottiePlayer.playSegments([226,158], true)
        }

        temp = -1 * temp;
      })
    }
  },
  mounted() {
    this.loadAnimation();
  }
}
</script>

<style scoped>

</style>

```

## 简单功能介绍

- lottiePlayer.play()：播放，从当前帧开始播放

- lottiePlayer.stop()：停止，并回到第0帧

- lottiePlayer.pause()：暂停，并保持当前帧

- lottiePlayer.goToAndStop(value, isFrame)：跳到某个时刻/帧并停止

- isFrame（可省略，默认false：毫秒；true：帧）指明value的单位是毫秒还是帧

- lottiePlayer.goToAndPlay(value, isFrame)：跳到某个时刻/帧并播放

- lottiePlayer.goToAndPlay(value, isFrame)：跳到某个时刻/帧并播放

- lottiePlayer.goToAndStop(30, true)     // 跳转到第30帧并停止
- lottiePlayer.goToAndPlay(300)          // 跳转到第300毫秒并播放
- lottiePlayer.playSegments(arr, forceFlag)：以帧为单位，播放指定片段

    > arr可以包含两个数字或者两个数字组成的数组，forceFlag表示是否立即强制播放该片段

- lottiePlayer.playSegments([10,20], false)          // 播放完之前的片段，播放10-20帧
- lottiePlayer.playSegments([[0,5],[10,18]], true)   // 直接播放0-5帧和10-18帧
- lottiePlayer.setSpeed(speed)：设置播放速度，speed为1表示正常速度

- lottiePlayer.setDirection(direction)： 设置播放方向，1表示正向播放，-1表示反向播放

- lottiePlayer.destroy()： 删除该动画，移除相应的元素标签等。
