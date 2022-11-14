---
title: springboot结合swing
toc: true
author: mirsery
comments: false
date: 2022-11-14 22:11:56
updated: 2022-11-14 22:11:56
tags:
    - java
categories:
    - java
excerpt: '在考虑再三之后决定采用java语言进行相应的开发工具，在图形化中选择了老古董swing，这玩意估计也就是学生时代接触过了。本文主要描述swing的应用...'
---


<!-- toc -->


## 项目背景
公司项目中涉及到硬件的开发，需要做一个检测的工装软件。
该软件要求如下：
1. 界面简单
2. 业务全自动
3. 逻辑清晰简单易用
4. 同时容易部署
介于本人的技术栈以及项目的情况，在考虑再三之后决定采用java语言进行相应的开发工具，在图形化中选择了老古董swing，这玩意估计也就是学生时代接触过了。本文主要描述swing的应用。

## 项目pom文件

项目采用maven进行架构搭建，去除一些业务相关的包之后pom文件如下所示：
```xml:n

<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.7.5</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <groupId>com.xxx</groupId>
    <artifactId>xxxxxxx</artifactId>
    <version>0.0.1-SNAPSHOT</version>

    <name>xxxxx/name>
    <description>xxxxxxx</description>


    <properties>
        <java.version>8</java.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>

</project>

```


项目采用spring容器管理各个类的创建生成。其中Application中的关键代码如下所示：

```java:n

        SpringApplicationBuilder builder = new SpringApplicationBuilder(XXXXXApplication.class);

        ApplicationContext context = builder.headless(false).web(WebApplicationType.NONE).run(args);//该项目不是web项目


        MainFrame mainFrame = context.getBean(MainFrame.class);     //MainFrame入口文件

        mainFrame.init(); //绘制窗口

```

## 主窗口函数

```java

@Component
public class MainFrame extends JFrame {

    @Resource
    private TitleJPanel titleJPanel;    //标题JPanel


    @Resource
    private BodyJPanel bodyJPanel;


    private void initChildComponent() {
        titleJPanel.init();
        bodyJPanel.init();
    }


    public void init() {


        this.initChildComponent();

        this.setSize(1920, 1080);
        this.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);    //关闭按钮
        this.setLocation(800, 200);
        this.setResizable(true);
        this.setTitle("xxxxx");

        this.setLayout(null);

        this.setResizable(false);

        titleJPanel.setBorder(new LineBorder(Color.DARK_GRAY,2));
        titleJPanel.setBounds(10, 10, 1890, 200);

        bodyJPanel.setBorder(new LineBorder(Color.DARK_GRAY,2));
        bodyJPanel.setBounds(10, 250, 1890, 760);

        this.getContentPane().add(titleJPanel);
        this.getContentPane().add(bodyJPanel);
        this.setVisible(true);
    }


}

```


```java:n

@Component
public class BodyJPanel extends JPanel {

    private JPanel left;

    @Resource
    private ComJPanel comJPanel;

    @Resource
    private QsNoCheckin qsNoCheckin;


    @Resource
    private RightJPanel rightJPanel;


    public BodyJPanel() {
        //配置body画板上组件的字体
        FontUIResource fontRes = new FontUIResource(new Font("alias", Font.PLAIN, 30));

        for (Enumeration<Object> keys = UIManager.getDefaults().keys();
             keys.hasMoreElements(); ) {

            Object key = keys.nextElement();

            Object value = UIManager.get(key);

            if (value instanceof FontUIResource) {

                UIManager.put(key, fontRes);

            }
        }
    }

    public void init() {
        GridLayout gridLayout = new GridLayout(1,2);
        this.setLayout(gridLayout);//设置布局方式

        FlowLayout flowLayout = new FlowLayout(FlowLayout.LEFT,5,10);
        left = new JPanel();
        left.setLayout(flowLayout);
        left.add(comJPanel);
        left.add(qsNoCheckin);

        this.add(left);
        this.add(rightJPanel);


    }


}

```