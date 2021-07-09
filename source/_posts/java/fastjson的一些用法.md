---
title: fastjson的简单用法
tags: 
  - json
  - fastjson
categories: 
  - java
---


# fastjson的简单用法
>  最近项目中接触到fastjson 随手记录下关于fastjson的使用


<!-- toc -->


## 导入依赖
``` xml
<dependency>
  <groupId>com.alibaba</groupId>
  <artifactId>fastjson</artifactId>
  <version>1.2.60</version>
</dependency>
```
## JSON字符串 -> 类实例
###  简单json字符串 -> java对象 
app.java
```java
public class App 
{
    public static void main( String[] args )
    {
        String msg = "{\"name\":\"java\",\"sex\":\"unknown\",\"age\":24}";
        User user = JSON.parseObject(msg, User.class);
        System.out.println(user);
    }
}
```
User.java
```java
public class User {
    @JSONField(name = "name")
    private String name;
    @JSONField(name = "sex")
    private String sex;
    @JSONField(name = "age")
    private int age;
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }
    public String getSex() {
        return sex;
    }
    public void setSex(String sex) {
        this.sex = sex;
    }
    public int getAge() {
        return age;
    }
    public void setAge(int age) {
        this.age = age;
    }
    @Override
    public String toString() {
        return "User{" +
                "name='" + name + '\'' +
                ", sex='" + sex + '\'' +
                ", age=" + age +
                '}';
    }
}
```
###  简单json字符串 -> Json对象
```java
 String msg = "{\"name\":\"java\",\"sex\":\"unknown\",\"age\":24}";
 JSONObject jsonObject = JSON.parseObject(msg);
 System.out.println(jsonObject);
```

### 稍复杂json字符串 ->Json对象
``` java
  String msg = "{\"name\":\"java\",\"sex\":\"unknown\",\"age\":24,\"pets\":[{\"nick_name\":\"coco\",\"type\":\"cat\"},{\"nick_name\":\"kimi\",\"type\":\"dog\"}]}";
    JSONObject jsonObject = JSON.parseObject(msg);
```

### 稍复杂json字符串 ->Java对象
```java
 public static void main( String[] args )
    {
        String msg = "{\"name\":\"java\",\"sex\":\"unknown\",\"age\":24,\"pets\":[{\"nick_name\":\"coco\",\"type\":\"cat\"},{\"nick_name\":\"kimi\",\"type\":\"dog\"}]}";
        User user = JSON.parseObject(msg, new TypeReference<User<Pet>>(){});
        System.out.println(user);
    }
```
User.java
```java
public class User<T> {

    @JSONField(name = "name")
    private String name;
    @JSONField(name = "sex")
    private String sex;
    @JSONField(name = "age")
    private int age;
    @JSONField(name = "pets")
    private T[] pets;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public T[] getPets() {
        return pets;
    }

    public void setPets(T[] pets) {
        this.pets = pets;
    }
}
```

Pet.java
```java
public class Pet {

    @JSONField(name = "nick_name")
    private String nickName;

    @JSONField(name = "type")
    private String type;

    public String getNickName() {
        return nickName;
    }

    public void setNickName(String nickName) {
        this.nickName = nickName;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }
}
```