---
title: SpringMVC参数绑定
author: mirsery
tags: 
    - springboot
categories: 
    - java  
---



# SpringMVC参数绑定
>  转载自[一篇文章搞定SpringMVC参数绑定](https://mp.weixin.qq.com/s/ljCX88T8EZO2TIVs7NUvCg)
SpringMVC参数绑定，简单来说就是将客户端请求的key/value数据绑定到controller方法的形参上，然后就可以在controller中使用该参数了。

<!-- toc -->

##@PathVariable 注解
@PathVariable 是用来获得请求url中的动态参数的，可以将URL中的变量映射到功能处理方法的参数上，其中URL 中的 {xxx} 占位符可以通过@PathVariable(“xxx“) 绑定到操作方法的入参中。
```java
 @ResponseBody
    @RequestMapping("/testUrlPathParam/{param1}/{param2}")
    public void testUrlPathParam(HttpServletRequest request, @PathVariable String param1,
                                 @PathVariable String param2) {
        System.out.println("通过PathVariable获取的参数param1=" + param1);
        System.out.println("通过PathVariable获取的参数param2=" + param2);
    }
```

## @RequestHeader 注解
@RequestHeader 注解，可以把Request请求header部分的值绑定到方法的参数上。
```java
 @ResponseBody
    @RequestMapping("/testHeaderParam")
    public void testHeaderParam(HttpServletRequest request, @RequestHeader String param1) {
        System.out.println("通过RequestHeader获取的参数param1=" + param1);
    }
```

## @CookileValue 注解
@CookileValue 注解可以把Resquest header中关于Cookie 的值绑定到方法的参数上。
```java
@ResponseBody
    @RequestMapping("/testCookieParam")
    public void testCookieParam(HttpServletRequest request, HttpServletResponse response,
                                  @CookieValue String sessionid) {
        System.out.println("通过CookieValue获取的参数sessionid=" + sessionid);
    }
```

## @RequestParam 注解
@RequestParam注解用来处理Content-Type: 为 application/x-www-form-urlencoded编码的内容。提交方式为get或post。（Http协议中，form的enctype属性为编码方式，常用有两种：application/x-www-form-urlencoded和multipart/form-data，默认为application/x-www-form-urlencoded）；
@RequestParam注解实质是将Request.getParameter() 中的Key-Value参数Map利用Spring的转化机制ConversionService配置，转化成参数接收对象或字段，
get方式中queryString的值，和post方式中body data的值都会被Servlet接受到并转化到Request.getParameter()参数集中，所以@RequestParam可以获取的到；
该注解有三个属性： value、required、defaultValue； value用来指定要传入值的id名称，required用来指示参数是否必录，defaultValue表示参数不传时候的默认值。
```java
 @ResponseBody
    @RequestMapping("/testRequestParam")
    public void testRequestParam(HttpServletRequest request,
                                   @RequestParam(value = "num", required = true, defaultValue = "0") int num) {
        System.out.println("通过RequestParam获取的参数num=" + num);
    }
```

## RequesrBody 注解
@RequestBody注解用来处理HttpEntity（请求体）传递过来的数据，一般用来处理非Content-Type: application/x-www-form-urlencoded编码格式的数据；
GET请求中，因为没有HttpEntity，所以@RequestBody并不适用；
POST请求中，通过HttpEntity传递的参数，必须要在请求头中声明数据的类型Content-Type，SpringMVC通过使用HandlerAdapter配置的HttpMessageConverters来解析HttpEntity中的数据，然后绑定到相应的bean上。
```java
    @ResponseBody
    @RequestMapping("/testRequestBody")
    public void testRequestBody(HttpServletRequest request, @RequestBody String bodyStr){
        System.out.println("通过RequestBody获取的参数bodyStr=" + bodyStr);
    }
```


