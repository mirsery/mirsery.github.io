---
title: mybatis插入数据后返回自增主键id
author: mirsery
tags: 
  - mybatis
  - sql
categories: 
  - java
---

# [mybatis] 插入数据后返回自增主键id
## xml映射
在xml中定义**useGeneratedKeys**为true,返回主键id的值,**keyProperty**和**keyColumn**分别代表数据库记录主键字段和java对象成员属性名
```xml
 <!-- 插入数据:返回记录主键id值 -->
<insert id="insert" useGeneratedKeys="true" keyProperty="id"  keyColumn="id">
        insert  into stu (name,age) values (#{name},#{age})
</insert>
```
## 接口映射器
在接口映射器中通过注解@Options分别设置参数useGeneratedKeys，keyProperty，keyColumn值
```java
// 返回主键字段id值
@Options(useGeneratedKeys = true, keyProperty = "id", keyColumn = "id")
@Insert("insert  into stu (name,age) values (#{name},#{age})")
void insert(Student stu);
```
## 获取新添加记录主键字段值
需要注意的是，在MyBatis中添加操作返回的是记录数并非记录主键id。因此，如果需要获取新添加记录的主键值，需要在执行添加操作之后，直接读取Java对象的主键属性。
```java
Integer rows = sqlSession.getMapper(StuMapper.class).insertOneTest(student);
System.out.println("rows = " + rows); // 添加操作返回记录数
System.out.println("id = " + student.getId()); // 执行添加操作之后通过Java对象获取主键属性值
```
## 添加批量记录时返回主键ID
如果希望执行批量添加并返回各记录主键字段值，只能在xml映射器中实现，在接口映射器中无法做到。
```xml
<!-- 批量添加数据,并返回主键字段 -->
<insert id="insert" useGeneratedKeys="true" keyProperty="id">
        insert  into stu (name,age) values
        <foreach collection="list" separator="," item="t">
            (#{t.name},#{t.age})
        </foreach>
</insert>
```
可以看到,执行批量添加并返回记录主键值的xml映射器配置,跟添加单条记录时是一致的. 不同的地方仅仅是使用了foreach元素构建批量添加语句. 