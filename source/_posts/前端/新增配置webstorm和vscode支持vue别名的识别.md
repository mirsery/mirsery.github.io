---
title: 新增配置webstorm和vscode支持vue别名的识别
toc: true
author: mirsery
comments: false
date: 2022-01-07 09:08:33
updated: 2022-01-07 09:08:33
tags:
    - vue
categories:
    - 前端
excerpt: "vue项目中增加配置文件，使得开发环境可以识别自定义的vue别名能够实现代码跳转"
---


<!-- toc -->

vue3项目中，默认别名"@"为"src"路径。在开发的过程中我们的集成开发环境并不能很好的识别这个别名路径，导致我们不能在开发环境中实现代码依赖的跳转，影响我们的开发体验以及开发速率.


## vue3项目设置别名

vue项目设置别名可以在vue.config.js中进行配置

```js
module.exports = {
    configureWebpack: {
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src'),
            }
        }
    }
}
```


## 为webstorm配置别名识别
在项目根目录创建**websotrm.config.js**文件，内容大致如下所示:
```js
const path = require('path')

function resolve (dir) {
    return path.join(__dirname, '.', dir)
}

module.exports = {
    context:path.resolve(__dirname,'./'),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            '@': resolve('src')
        }
    }
}

```
在webstorm中，选择Preferences > Languages & Feameworks > JavaScript > WebPack ,选择 resolution 的mode，选择Automatically即可。


## 为vscode配置别名识别
在项目根目录创建**jsconfig.json**文件，内容大致如下所示:
```json
{
  "compilerOptions": {
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "baseUrl": ".",
    "jsx": "react",
    "paths": {
      "@/*": [
        "./src/*"
      ]
    }
  },
  "exclude": [
    "node_modules",
    "dist"
  ]
}
```
关闭vscode，重新打开项目，vscode即可实现对别名的识别。
