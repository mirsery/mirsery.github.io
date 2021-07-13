---
title: springboot interceptor
author: mirsery
date: 2018-09-16
tags: 
    - interceptor
    - springboot
categories: 
    - java  
---

# interceptor
Spring MVC interceptor intercepts the actual request and response. Interceptors are a special web programming technique, where we can execute a certain piece of logic before or after a web request is processed. 
## working with interceptors
As I have already mentioned, interceptors are used to intercept actual web requests before or after processing them. We can relate the concept of interceptors in Spring MVC to the filter concept in Servlet programming. In Spring MVC, interceptors are special classes that must implement the org.springframework.web.servlet.HandlerInterceptor interface. The HandlerInterceptor interface defines three important methods, as follows:
preHandle: This method will get called just before the web request reaches the Controller for execution
postHandle: This method will get called just after the Controller method execution
afterCompletion: This method will get called after the completion of the entire web request cycle
Once we create our own interceptor, by implementing the HandlerInterceptor interface, we need to configure it in our web application context in order for it to take effect.
## configure an interceptor
 a interceptor 's class demo:
```java

package com.packt.webstore.interceptor;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
public class ProcessingTimeLogInterceptor implements HandlerInterceptor {
   private static final Logger LOGGER =Logger.getLogger(ProcessingTimeLogInterceptor.class);
   public boolean preHandle(HttpServletRequest request,
     HttpServletResponse response, Object handler) {
           long startTime = System.currentTimeMillis();
           request.setAttribute("startTime", startTime);
           return true;
       }
   public void postHandle(HttpServletRequest request,
       HttpServletResponse response, Object handler, ModelAndView
       modelAndView) {
           String queryString = request.getQueryString() == null ?
   "" : "?" + request.getQueryString();
           String path = request.getRequestURL() + queryString;
           long startTime = (Long)
           request.getAttribute("startTime");
           long endTime = System.currentTimeMillis();
           LOGGER.info(String.format("%s millisecond taken to process the request %s.",(endTime - startTime), path));
    }
     public void afterCompletion(HttpServletRequest request,
       HttpServletResponse response, Object handler, Exception
       exceptionIfAny){
          // NO operation.
       }
}
```
open your web application context configuration file WebApplicationContextConfig.java, add the following method to it, and save the file:
```java
    @Override
   public void addInterceptors(InterceptorRegistry registry) {
       registry.addInterceptor(new
       ProcessingTimeLogInterceptor());
   }
```

   
