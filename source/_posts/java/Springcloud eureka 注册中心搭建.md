---
title: SpringCloud eureka注册中心搭建
date: 2021-05-04
author: mirsery
tags: 
    - springboot
categories: 
    - java  
---


# SpringCloud eureka注册中心搭建
>  搭建eureka注册中心，并集成springboot-admin 监控
spring-boot-starter-parent 版本号为 **2.3.10.RELEASE**
spring-cloud-dependencies 版本为 **Hoxton.SR11**

## 服务端配置
服务端直接采用idea新建一个springboot项目，选择对应的版本号以及对应的注册中心。
下面是**pom.xml**文件
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.10.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <groupId>com.hytiot.cloud</groupId>
    <artifactId>eureka-hytiot</artifactId>
    <version>1.0.0</version>
    <name>eureka-hytiot</name>
    <description>Demo project for Spring Boot</description>

    <properties>
        <java.version>1.8</java.version>
        <spring-cloud.version>Hoxton.SR11</spring-cloud.version>
        <spring-boot-admin.version>2.3.1</spring-boot-admin.version>
        <docker.image.prefix>docker.hytiot.com</docker.image.prefix>
        <docker-maven-plugin.version>1.2.2</docker-maven-plugin.version>
        <base-image.name>openjdk:8-jdk-alpine</base-image.name>
        <maintainer.email>mirsery@hytiot.com</maintainer.email>
    </properties>

    <dependencies>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-security</artifactId>
        </dependency>

        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
            <exclusions>
                <exclusion>
                    <groupId>org.junit.vintage</groupId>
                    <artifactId>junit-vintage-engine</artifactId>
                </exclusion>
            </exclusions>
        </dependency>

        <dependency>
            <groupId>de.codecentric</groupId>
            <artifactId>spring-boot-admin-starter-server</artifactId>
        </dependency>

    </dependencies>

    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
            <dependency>
                <groupId>de.codecentric</groupId>
                <artifactId>spring-boot-admin-dependencies</artifactId>
                <version>${spring-boot-admin.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>com.spotify</groupId>
                <artifactId>docker-maven-plugin</artifactId>
                <version>${docker-maven-plugin.version}</version>
                <configuration>
                    <imageName>${docker.image.prefix}/${project.artifactId}</imageName>
                    <imageTags>${project.version}</imageTags>
                    <baseImage>${base-image.name}</baseImage>
                    <maintainer>${maintainer.email}</maintainer>
                    <cmd>["java", "-version"]</cmd>
                    <entryPoint>["java", "-jar", "${project.build.finalName}.jar"]</entryPoint>
                    <resources>
                        <resource>
                            <targetPath>/</targetPath>
                            <directory>${project.build.directory}</directory>
                            <include>${project.build.finalName}.jar</include>
                            <include>*.properties</include>
                            <include>*.yml</include>
                        </resource>
                    </resources>
                </configuration>
            </plugin>
        </plugins>
    </build>
</project>
```

配置文件yml为
```xml
spring:
  application:
    name: eureka-server
  security:
    user:
      name: username
      password: password
  boot:
    admin:
        # springboot-admin的访问路径
      context-path: /admin
server:
  port: 8080
eureka:
  server:
    enable-self-preservation: false
  instance:
    hostname: localhost
    instance-id: ${spring.application.name}
  client:
    # admin need to be discovered
    register-with-eureka: true
    fetch-registry: true
    healthcheck:
      enabled: true
    service-url:
      defaultZone: http://${spring.security.user.name}:${spring.security.user.password}@${eureka.instance.hostname}:${server.port}/eureka/
management:
  endpoints:
    web:
      exposure:
        include: "*"
  endpoint:
    health:
      show-details: ALWAYS
```
同时启动类需要增加**@EnableEurekaServer** 和**@EnableAdminServer**标注,同时需要配置WebSecurity，
下面是配置文件
```java
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic()
                .and().authorizeRequests()
                .antMatchers("/actuator/**").permitAll()
                .anyRequest().authenticated()
                .and().csrf().disable();
    }
}
```

## 简易客户端的配置
下面是**pom.xml**文件内容
```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.3.10.RELEASE</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.example.actuator</groupId>
    <artifactId>actuator-client</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>actuator-client</name>
    <description>Demo project for Spring Boot</description>
    <properties>
        <java.version>11</java.version>
        <spring-cloud.version>Hoxton.SR11</spring-cloud.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-actuator</artifactId>
        </dependency>
    </dependencies>
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>
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

配置文件内容
```xml
server:
  port: 9101
spring:
  application:
    name: demo-client
eureka:
  client:
    service-url:
      defaultZone: http://username:password@serverIp:serverPort/eureka/
    healthcheck:
      enabled: true
  instance:
    prefer-ip-address: true
management:
  endpoints:
    web:
      exposure:
        include: "*"
  endpoint:
    health:
      show-details: ALWAYS
```
启动类需要增加**@EnableDiscoveryClient**标注。