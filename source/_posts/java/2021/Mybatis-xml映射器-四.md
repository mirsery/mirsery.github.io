---
title: Mybatis xml映射器(四)
toc: true
author: mirsery
comments: false
date: 2021-08-24 16:55:24
updated: 2021-08-24 16:55:24
tags:
    - mybatis
categories:
    - java
excerpt: '关联嵌套结果映射和关联嵌套查询'    
---


<!-- toc -->

> 该文档摘抄自https://blog.mybatis.org。

# 关联的嵌套 Select 查询

|属性|描述 |
|---|---|
|column|数据中的列名或者是列的别名。一般情况下，这和传递给**resultSet.getString(columnName)** 方法的参数一样。 注意：在使用复合主键的时候，你可以使用**column="{prop1=col1,prop2=col2}"**这样的语法来指定多个传递给嵌套**Select**查询语句的列名。这会使得**prop1**和**prop2**作为参数对象，被设置为对应嵌套 Select 语句的参数。|
|select|用于加载复杂类型属性的映射语句的 ID，它会从**column**属性指定的列中检索数据，作为参数传递给目标**select**语句。 具体请参考下面的例子。注意：在使用复合主键的时候，你可以使用**column="{prop1=col1,prop2=col2}"**这样的语法来指定多个传递给嵌套**Select**查询语句的列名。这会使得**prop1**和**prop2**作为参数对象，被设置为对应嵌套**Select**语句的参数。|
|fetchType|可选的，有效值为**lazy**和**eager**.该属性设置会覆盖全局配置参数lazyLoadingEnabled|


## 使用示例

```xml
<resultMap id="blogResult" type="Blog">
  <association property="author" column="author_id" javaType="Author" select="selectAuthor"/>
</resultMap>

<select id="selectBlog" resultMap="blogResult">
  SELECT * FROM BLOG WHERE ID = #{id}
</select>

<select id="selectAuthor" resultType="Author">
  SELECT * FROM AUTHOR WHERE ID = #{id}
</select>
```

