---
date: 2018-10-11 00:17:00
status: public
title: IDEA搭建springmvc环境
categories:
   - ide
tags:
   - ide
   - 快捷键
---

> [原文作者：fantasyxl99 ， 转载自 CSDN。https://blog.csdn.net/fantasyxl99/article/details/79034002?utm_source=copy](https://blog.csdn.net/fantasyxl99/article/details/79034002?utm_source=copy)

<!-- toc -->

## 使用spring mvc插件
### 确认软件是否安装了插件
点击菜单栏 File -> Setting
![](20180111143943060.png)
点击右侧的plugins 然后在输入框中输入springmvc，将搜索出来的结果☑️。
![](20180111143949552.png)
### 新建项目
插件安装完成之后，点击File -> New -> Project
![](20180111143958150.png)
选择右侧的Spring 在选择中间的Spring MVC
![](20180111144006692.png)
点击下一步，填写项目名称
![](20180111144016971.png)
### 添加maven构建
点击finish完成项目，完成项目之后右键项目添加maven框架
![](20180111144028351.png)
右侧选择maven 项目
![](20180111144035131.png)
完成之后的目录结构如下所示
![](20180111144044221.png)
### 添加项目依赖
添加项目依赖，在pom.xml文件中添加以下信息
```
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0";
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance";
xsi:schemaLocation="http://maven.apache.org/POM/4.0.0http://maven.apache.org/xsd/maven-4.0.0.xsd";>
<modelVersion>4.0.0</modelVersion>
<groupId>org.py</groupId>
<artifactId>SpringMvcDemo</artifactId>
<version>1.0-SNAPSHOT</version>
<packaging>war</packaging>
<build>
<plugins>
<plugin>
<groupId>org.apache.maven.plugins</groupId>
<artifactId>maven-compiler-plugin</artifactId>
<configuration>
<source>1.7</source>
<target>1.7</target>
</configuration>
</plugin>
</plugins>
</build>
<dependencies>
<dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-context-support</artifactId>
<version>4.1.6.RELEASE</version>
</dependency>
<dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-test</artifactId>
<version>4.1.6.RELEASE</version>
</dependency>
<dependency>
<groupId>junit</groupId>
<artifactId>junit</artifactId>
<version>4.12</version>
<scope>test</scope>
</dependency>
<dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-web</artifactId>
<version>4.1.6.RELEASE</version>
</dependency>
<dependency>
<groupId>org.springframework</groupId>
<artifactId>spring-webmvc</artifactId>
<version>4.1.6.RELEASE</version>
</dependency>
<dependency>
<groupId>javax.servlet</groupId>
<artifactId>javax.servlet-api</artifactId>
<version>3.1.0</version>
</dependency>
</dependencies>
</project>
```
右键pom.xml文件选择maven->reimport注入依赖
![](20180111144059094.png)
### 配置配置文件
打开web/WEB-INF/目录下的web.xml文件配置web.xml文件
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<web-app xmlns="http://xmlns.jcp.org/xml/ns/javaee";
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance";
xsi:schemaLocation="http://xmlns.jcp.org/xml/ns/javaeehttp://xmlns.jcp.org/xml/ns/javaee/web-app_3_1.xsd";
version="3.1">
<!-- 配置前端控制器 -->
<!--<servlet>-->
<!--<servlet-name>web-dispatcher</servlet-name>-->
<!--<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>-->
<!--<init-param>-->
<!--<param-name>contextConfigLocation</param-name>-->
<!--<param-value>classpath:spring-mvc.xml</param-value>-->
<!--</init-param>-->
<!--<load-on-startup>1</load-on-startup>-->
<!--</servlet>-->
<servlet>
<servlet-name>SpringMVC</servlet-name>
<servlet-class>org.springframework.web.servlet.DispatcherServlet</servlet-class>
<!--加载前端控制器配置文件 上下文配置位置-->
<init-param>
<!-- 备注：
contextConfigLocation：指定 SpringMVC 配置的加载位置，如果不指定则默认加载
WEB-INF/[DispatcherServlet 的 Servlet 名字]-servlet.xml
-->
<param-name>contextConfigLocation</param-name>
<param-value>classpath:spring-mvc.xml</param-value>
</init-param>
<!-- 表示随WEB服务器启动 -->
<load-on-startup>1</load-on-startup>
</servlet>
<servlet-mapping>
<servlet-name>SpringMVC</servlet-name>
<!-- 备注：可以拦截三种请求
第一种：拦截固定后缀的url，比如设置为 *.do、*.action，
 例如：/user/add.action 此方法最简单,不会导致静态资源（jpg,js,css）被拦截
第二种：拦截所有,设置为/，例如：/user/add
 /user/add.action此方法可以实现REST风格的url,
很多互联网类型的应用使用这种方式.但是此方法会导致静态文件(jpg,js,css)被拦截后不能正常显示.需要特殊处理
第三种：拦截所有,设置为/*，此设置方法错误,因为请求到Action,当action转到jsp时再次被拦截,提示不能根据jsp路径mapping成功
-->
<!-- 默认匹配所有的请求 -->
<url-pattern>/</url-pattern>
</servlet-mapping>
</web-app>
```
配置spring mvc的配置文件，在resources下面新建一个spring-mvc.xml
``` xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans";
xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance";
xmlns:context="http://www.springframework.org/schema/context";
xmlns:mvc="http://www.springframework.org/schema/mvc";
xsi:schemaLocation="http://www.springframework.org/schema/beanshttp://www.springframework.org/schema/beans/spring-beans.xsd
http://www.springframework.org/schema/contexthttp://www.springframework.org/schema/context/spring-context.xsd
http://www.springframework.org/schema/mvchttp://www.springframework.org/schema/mvc/spring-mvc.xsd";>
<!-- 自动加载RequestMappingHandlerMapping和RequestMappingHandlerAdapter， -->
<!-- 可用在xml配置文件中使用<mvc:annotation-driven>替代注解处理器和适配器的配置。 -->
<mvc:annotation-driven/>
<!-- 组件扫描器：可以扫描 @Controller、@Service、@Repository 等等 -->
<context:component-scan base-package="com.controller">
<context:include-filter type="annotation" expression="org.springframework.stereotype.Controller"/>
</context:component-scan>
<bean class="org.springframework.web.servlet.view.InternalResourceViewResolver">
<property name="prefix" value="/WEB-INF/views/"/>
<property name="suffix" value=".jsp"/>
</bean>
</beans>
```
![](20180111144109206.png)
再弹出框中勾选相应的xml文件添加到context
![](20180111144114057.png)
### 添加tomcat服务
点击右上角的编辑
![](20180111144123355.png)
选择添加一个tomcat服务
![](20180111144128603.png)
配置服务
![](20180111144141102.png)
![](20180111144148088.png)
点击ok，配置完成。
### 编写控制器和页面
在scr/main/java 下面创建一个新包 com.controller ，然后在包里面新建一个IndexController类
![](20180111144157485.png)
IndexController类
``` java 
package com.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;


@Controller
public class IndexController {

//返回字符串
@ResponseBody
@RequestMapping(value = "/HelloWord")
public String HelloWord(){
return "HelloWord";
}
//返回jsp视图
@RequestMapping(value = "/index")
public String index(Model model){
model.addAttribute("name","jsp页面展示");
return "index";
}
}
```
根据spring-mvc的配置文件在/WEB-INF/views/目录下创建一个index.jsp文件
![](20180111144221153.png)
效果如下
![](20180111144229011.png)
index.jsp文件
``` jsp
<%@ page contentType="text/html;charset=UTF-8" language="java"
 %>
<html>
<head>
<title>$Title$</title>
</head>
<body>
${name}
</body>
</html>
```
启动项目 
 点击运行启动项目。

## 使用maven搭建spring mvc环境
###新建项目
首先，跟第一种方法一样点击菜单栏File->NEW->Project选择maven，然后勾选Create form archetype 选中webapp 如图:
![](20180111144335442.png)
填写GroupId和ArtifactId后点击next下一步:
![](20180111144344610.png)
在配置里面添加archetypeCatalog=internal (可以加快maven的生成速度，网上说的(⊙o⊙)…)
![](20180111144414964.png)
点击finish完成。
###创建项目目录结构
点击finish后完成的项目目录结构如下所示
![](20180111144434399.png)
这里我们需要在main目录下创建一个java目录，java下放置java 的源码，再在java项目创建一个包com.controller包。
最终项目的目录结构为
![](20180111144442903.png)
之后对项目的资源分类，选中项目按F4
![](20180111144450969.png)
在弹出界面中奖java文件夹设置为项目源码Sources
![](20180111144610012.png)
把resource设置为项目的资源库Resources
![](20180111144621818.png)
设置完后相应的文件夹颜色也会变化，且右侧也会有列表信息
![](20180111144629644.png)
### 配置配置文件
之后同第一种方法一样配置web.xml，spring-mvc.xml文件，添加tomcat服务器，创建IndexController控制器，index.jsp视图文件之后就完成了springmvc环境搭建
启动项目就可以得到如上的结果。（注该方法无需修改iml文件里面的路径，而web.xml文件放在/webaap/WEB-INF/路径下）
最终项目路径
![](20180111144640312.png)