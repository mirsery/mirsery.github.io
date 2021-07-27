---
date: 2016-08-14 17:52
status: public
title: jQuery图片加载
tags: 
    - 前端
categories:
    - 前端
---

```javascript
$("img").error(function () {
    $(this).unbind("error").attr("src", "missing_image.gif");
});
 
// Persistent Snipper
$("img").error(function () {
    $(this).attr("src", "missing_image.gif");
});
```