---
date: 2018-09-21 10:22:15
status: public
tags: 
    - 前端
categories:
    - 前端
title: 无限翻页测试
---


```html
<!DOCTYPE html>
<html>
<head>
    <title>无限翻页测试</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <script src="http://apps.bdimg.com/libs/jquery/2.1.4/jquery.min.js"></script>
</head>
<body>
    <div id="sample">
    </div>
    <div id="spinner">
        正在加载
    </div>
    <script type="text/javascript">
        var index = 0;
        function lowEnough(){
            var pageHeight = Math.max(document.body.scrollHeight,document.body.offsetHeight);

            var viewportHeight = window.innerHeight || 

                document.documentElement.clientHeight ||

                document.body.clientHeight || 0;

            var scrollHeight = window.pageYOffset ||

                document.documentElement.scrollTop ||

                document.body.scrollTop || 0;

            return pageHeight - viewportHeight - scrollHeight < 20;

        }



        function loading(){

            var htmlStr = "";

            for(var i=0;i<10;i++){

                htmlStr += "这是第"+index+"次加载<br>";

            }
            $('#sample').append(htmlStr);
            index++;
            pollScroll();//继续循环
        }
        function checkScroll(){
            if(!lowEnough()) return pollScroll();
            $('#spinner').show();
            setTimeout(loading,0);
        }
        function pollScroll(){
            setTimeout(checkScroll,1000);
        }
        checkScroll();
    </script>
</body>
</html>
```