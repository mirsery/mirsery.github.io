---
title: Swagger-ui 使用
author: mirsery
date: 2021-06-09
tags: 
    - springboot
categories: 
    - java  
---


# Swagger-ui 使用

<!-- toc -->

## 引入相关依赖jar包
```xml
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>
```

## 启用 swagger
下面是swagger-ui 配置样例:
```java
import java.util.ArrayList;
import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.ApiKey;
import springfox.documentation.service.AuthorizationScope;
import springfox.documentation.service.SecurityReference;
import springfox.documentation.service.SecurityScheme;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spi.service.contexts.SecurityContext;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

/**
 * @description:
 * @author: misery
 * @create: 2021-06-04 16:26
 **/
@Configuration
@EnableSwagger2
public class SwaggerConfig {

    @Value("${swagger.enable:false}")
    private boolean swagger2Enable;

    @Bean
    public Docket createRestApi() {
        return new Docket(DocumentationType.OAS_30).apiInfo(apiInfo())
                .enable(swagger2Enable)
                .groupName("所有")
                .select()
                .apis(RequestHandlerSelectors.any())
                .paths(PathSelectors.any())
                .paths(PathSelectors.regex("(?!/error.*).*"))     // 去除默认basicController
                .paths(PathSelectors.regex("(?!/actuator.*).*"))    //去除actuator
                .build()
                .securityContexts(securityContext())
                .securitySchemes(security());
    }

    @Bean
    public Docket appApi() {
        return new Docket(DocumentationType.OAS_30).apiInfo(apiInfo())
                .enable(swagger2Enable)
                .groupName("groupName")
                .select()
                .apis(RequestHandlerSelectors.basePackage("com.xxxx.xxx"))
                .paths(PathSelectors.any())
                .build()
                .securityContexts(securityContext())
                .securitySchemes(security());
    }

    private ApiInfo apiInfo() {
        return new ApiInfoBuilder()
                .title("title")
                .description("description")
                .version("0.0.1")
                .build();
    }

    private List<SecurityScheme> security() {
        SecurityScheme token = new ApiKey("token", "token", "header");
        List<SecurityScheme> securitySchemeList = new ArrayList<>();
        securitySchemeList.add(token);
        return securitySchemeList;
    }

    List<SecurityReference> defaultAuth() {
        AuthorizationScope authorizationScope
                = new AuthorizationScope("global", "accessEverything");
        AuthorizationScope[] authorizationScopes = new AuthorizationScope[1];
        authorizationScopes[0] = authorizationScope;
        List<SecurityReference> lists = new ArrayList<>();
        lists.add(new SecurityReference("token", authorizationScopes));
        return lists;
    }

    private List<SecurityContext> securityContext() {
        SecurityContext securityContext = SecurityContext.builder()
                .securityReferences(defaultAuth())
                .build();
        List<SecurityContext> list = new ArrayList<>();
        list.add(securityContext);
        return list;
    }

}
```

## Controller 添加描述信息
@Api 可以对Controller进行描述
```java
@Api(tags = "xxx相关接口")
public class TestController{
    ...
}
```

## 接口添加描述信息
@ApiOperation 可以对接口进行描述
```java
@GETMapping("/hi")
@ApiOperation("xxxxx接口")
public void hello(){
    ...
}
```

- ***@ApiOperation 注解属性***
|注解属性| 类型 |描述|
|---|---|---|
|value |String |接口说明|
|notes| String| 接口发布说明|
|tags |Stirng[] |标签|
|response| Class<?>| 接口返回类型|
|httpMethod |String |接口请求方式|

- ***@ApiIgnore***
    Swagger 文档不会显示拥有该注解的接口。
- ***@ApiImplicitParams***
    用于描述接口的非对象参数集。
- ***@ApiImplicitParam***
    用于描述接口的非对象参数，一般与 ***@ApiImplicitParams*** 组合使用
    
<table>
    <tr>
        <td rowspan="15">@ApiImplicitParam</td>
    </tr>
    <tr>
        <td colspan="3">用在@ApiImplicitParams注解中，指定一个请求参数的各个方面</td>
    </tr>
    <tr>
        <td>name</td>
        <td colspan="2">参数名</td>
    </tr>
    <tr>
       <td>value</td>
        <td colspan="2">参数的汉字说明、解释</td>
    </tr>
    <tr>
       <td>required</td>
        <td colspan="2">参数是否必须传</td>
    </tr>
    <tr>
       <td>dataType</td>
       <td colspan="2">参数类型，默认String，其它值dataType="Integer"</td>
    </tr>
    <tr>
       <td>defaultValue</td>
        <td colspan="2">参数的默认值</td>
    </tr>
    <tr>
       <td rowspan="8">paramType</td>
   </tr>
    <tr>
       <td colspan="2">参数放在哪个地方</td>
    </tr>
 <tr>
       <td>header</td>
        <td>请求参数的获取@RequestHeader</td>
 </tr>
 <tr>
       <td>header</td>
        <td>请求参数的获取@RequestHeader</td>
 </tr>
 <tr>
       <td>query</td>
        <td>请求参数的获取@RequestParam</td>
 </tr>
 <tr>
       <td>path</td>
        <td>请求参数的获取@PathVariable</td>
 </tr>
 <tr>
       <td>body</td>
        <td>请求参数的获取@RequestBody</td>
 </tr>
 <tr>
       <td>form</td>
        <td>普通表单提交</td>
 </tr>

</table>

## 给实体类添加描述信息
```java
@ApiModel("用户实体")
public class Entity {
    @ApiModelProperty("用户 id")
    private int id;
}

```

- @ApiModelProperty 主要属性

|注解属性| 类型 |描述|
|---|---|---|
|value |String |字段说明|
|name |String |重写字段名称|
|dataType| Stirng |重写字段类型|
|required| boolean 是否必填|
|example| Stirng| 举例说明|
|hidden |boolean |是否在文档中隐藏该字段|
|allowEmptyValue| boolean |是否允许为空|
|allowableValues| String| 该字段允许的值，当我们 API 的某个参数为枚举类型时，使用这个属性就可以清楚地告诉 API 使用者该参数所能允许传入的值|