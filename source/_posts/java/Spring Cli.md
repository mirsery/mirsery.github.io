---
title:  Developing the Spring Boot microservice using the CLI
author: mirsery
tags: 
    - springboot
categories: 
    - java  
---

# Developing the Spring Boot microservice using the CLI

The easiest way to develop and demonstrate Spring Boot's capabilities is using the Spring Boot CLI, a command-line tool. Perform the following steps:

Install the Spring Boot command-line tool by downloading the spring-boot-cli-1.3.5.RELEASE-bin.zip file from http://repo.spring.io/release/org/springframework/boot/spring-boot-cli/1.3.5.RELEASE/spring-boot-cli-1.3.5.RELEASE-bin.zip.
Unzip the file into a directory of your choice. Open a terminal window and change the terminal prompt to the bin folder.
Ensure that the bin folder is added to the system path so that Spring Boot can be run from any location.

Verify the installation with the following command. If successful, the Spring CLI version will be printed in the console:
```zsh
$spring –-version
Spring CLI v1.3.5.RELEASE
```
As the next step, a quick REST service will be developed in Groovy, which is supported out of the box in Spring Boot. To do so, copy and paste the following code using any editor of choice and save it as myfirstapp.groovy in any folder:
@RestController
class HelloworldController {
    @RequestMapping("/")
    String sayHello() {
        "Hello World!"
    }
}
In order to run this Groovy application, go to the folder where myfirstapp.groovy is saved and execute the following command. The last few lines of the server start-up log will be similar to the following:
```zsh
$spring run myfirstapp.groovy 

2016-05-09 18:13:55.351  INFO 35861 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : FrameworkServlet 'dispatcherServlet': initialization started
2016-05-09 18:13:55.375  INFO 35861 --- [nio-8080-exec-1] o.s.web.servlet.DispatcherServlet        : FrameworkServlet 'dispatcherServlet': initialization completed in 24 ms
```

Open a browser window and go to http://localhost:8080; the browser will display the following message:
Hello World!

There is no war file created, and no Tomcat server was run. Spring Boot automatically picked up Tomcat as the webserver and embedded it into the application. This is a very basic, minimal microservice. The @RestController annotation, used in the previous code, will be examined in detail in the next example.
