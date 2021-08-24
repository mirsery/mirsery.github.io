---
title: Mybatis xml映射器(四)
toc: true
author: mirsery
comments: false
date: 2021-08-24 21:50:24
updated: 2021-08-24 21:50:24
tags:
    - mybatis
categories:
    - java
excerpt: 'mybatis鉴别器discriminator和自动映射'    
---


<!-- toc -->

> 该文档摘抄自https://blog.mybatis.org。


# discriminator 鉴别器
有时候，一个数据库查询可能会返回多个不同的结果集（但总体上还是有一定的联系的）。 鉴别器（discriminator）元素就是被设计来应对这种情况的，另外也能处理其它情况，例如类的继承层次结构。 鉴别器的概念很好理解——它很像 Java 语言中的 switch 语句。

## discriminator 鉴别器用法示例

```xml
<discriminator javaType="int" column="draft">
  <case value="1" resultType="DraftPost"/>
</discriminator>
```

一个鉴别器的定义需要指定 column 和 javaType 属性。column 指定了 MyBatis 查询被比较值的地方。 而 javaType 用来确保使用正确的相等测试（虽然很多情况下字符串的相等测试都可以工作）。例如：
```xml
<resultMap id="vehicleResult" type="Vehicle">
  <id property="id" column="id" />
  <result property="vin" column="vin"/>
  <result property="year" column="year"/>
  <result property="make" column="make"/>
  <result property="model" column="model"/>
  <result property="color" column="color"/>
  <discriminator javaType="int" column="vehicle_type">
    <case value="1" resultMap="carResult"/>
    <case value="2" resultMap="truckResult"/>
    <case value="3" resultMap="vanResult"/>
    <case value="4" resultMap="suvResult"/>
  </discriminator>
</resultMap>
```
在这个示例中，MyBatis 会从结果集中得到每条记录，然后比较它的 vehicle type 值。 如果它匹配任意一个鉴别器的 case，就会使用这个 case 指定的结果映射。 这个过程是互斥的，也就是说，剩余的结果映射将被忽略（除非它是扩展的，我们将在稍后讨论它）。 如果不能匹配任何一个 case，MyBatis 就只会使用鉴别器块外定义的结果映射。 所以，如果 carResult 的声明如下：
```xml
<resultMap id="carResult" type="Car">
  <result property="doorCount" column="door_count" />
</resultMap>
```
那么只有 doorCount 属性会被加载。这是为了即使鉴别器的 case 之间都能分为完全独立的一组，尽管和父结果映射可能没有什么关系。在上面的例子中，我们当然知道 cars 和 vehicles 之间有关系，也就是 Car 是一个 Vehicle。因此，我们希望剩余的属性也能被加载。而这只需要一个小修改。
```xml
<resultMap id="carResult" type="Car" extends="vehicleResult">
  <result property="doorCount" column="door_count" />
</resultMap>
```
现在 vehicleResult 和 carResult 的属性都会被加载了，下面是等同的简洁风格:
```xml
<resultMap id="vehicleResult" type="Vehicle">
  <id property="id" column="id" />
  <result property="vin" column="vin"/>
  <result property="year" column="year"/>
  <result property="make" column="make"/>
  <result property="model" column="model"/>
  <result property="color" column="color"/>
  <discriminator javaType="int" column="vehicle_type">
    <case value="1" resultType="carResult">
      <result property="doorCount" column="door_count" />
    </case>
    <case value="2" resultType="truckResult">
      <result property="boxSize" column="box_size" />
      <result property="extendedCab" column="extended_cab" />
    </case>
    <case value="3" resultType="vanResult">
      <result property="powerSlidingDoor" column="power_sliding_door" />
    </case>
    <case value="4" resultType="suvResult">
      <result property="allWheelDrive" column="all_wheel_drive" />
    </case>
  </discriminator>
</resultMap>
```

# 自动映射
当自动映射查询结果时，MyBatis 会获取结果中返回的列名并在 Java 类中查找相同名字的属性（忽略大小写）。 这意味着如果发现了 ID 列和 id 属性，MyBatis 会将列 ID 的值赋给 id 属性。
通常**数据库列使用大写字母组成的单词命名，单词间用下划线分隔**；而 **Java 属性一般遵循驼峰命名法约定**。为了在这两种命名方式之间启用自动映射，需要将 **mapUnderscoreToCamelCase** 设置为 **true**。

## 自动映射例子
提供了结果映射后，自动映射也能工作。在这种情况下，对于每一个结果映射，在 ResultSet 出现的列，如果没有设置手动映射，将被自动映射。在自动映射处理完毕后，再处理手动映射。 在下面的例子中，id 和 userName 列将被自动映射，hashed_password 列将根据配置进行映射.
```xml
<select id="selectUsers" resultMap="userResultMap">
  select
    user_id             as "id",
    user_name           as "userName",
    hashed_password
  from some_table
  where id = #{id}
</select>

<resultMap id="userResultMap" type="User">
  <result property="password" column="hashed_password"/>
</resultMap>
```
## 自动映射等级
有三种自动映射等级：
- NONE - 禁用自动映射。仅对手动映射的属性进行映射。
- PARTIAL - 对除在内部定义了嵌套结果映射（也就是连接的属性）以外的属性进行映射(DEFAULT 默认等级s)
- FULL - 自动映射所有属性。

> 默认值是 PARTIAL，这是有原因的。当对连接查询的结果使用 FULL 时，连接查询会在同一行中获取多个不同实体的数据，因此可能导致非预期的映射。 

下面是可能导致风险的例子
```xml
<select id="selectBlog" resultMap="blogResult">
  select
    B.id,
    B.title,
    A.username,
  from Blog B left outer join Author A on B.author_id = A.id
  where B.id = #{id}
</select>

<resultMap id="blogResult" type="Blog">
  <association property="author" resultMap="authorResult"/>
</resultMap>

<resultMap id="authorResult" type="Author">
  <result property="username" column="author_username"/>
</resultMap>

```
在该结果映射中，Blog 和 Author 均将被自动映射。但是注意 Author 有一个 id 属性，在 ResultSet 中也有一个名为 id 的列，所以 Author 的 id 将填入 Blog 的 id，这可不是你期望的行为。 所以，要谨慎使用 FULL。无论设置的自动映射等级是哪种，你都可以通过在结果映射上设置 autoMapping 属性来为指定的结果映射设置启用/禁用自动映射。
```xml
<resultMap id="userResultMap" type="User" autoMapping="false">
  <result property="password" column="hashed_password"/>
</resultMap>
```