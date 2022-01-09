---
title: java中创建对象的几种方法
toc: true
author: mirsery
comments: false
date: 2022-01-09 21:38:03
updated: 2022-01-09 21:38:03
tags:
categories:
excerpt: 
---


<!-- toc -->

常见的对象常见方法有4种：
1. 使用**new**关键字
2. 使用**clone**方法
3. 反射机制
4. 反序列化

其中采用1，3新建对象时会调用构造函数，2和4并不会调用构造函数

## 测试代码，看运行结果
- 简单的bean类 Car
```java
public class Car implements Cloneable, Serializable {
    private String name;

    public void setName(String name) {
        this.name = name;
    }

    @Override
    protected Object clone() throws CloneNotSupportedException {
        return super.clone();
    }

    public Car(String name) {
        this.name = name;
        System.out.println("create car");
    }


    public void run() {
        System.out.println(this.name + " is run !");
    }
}
```

- 测试类的Main方法

```java
public static void main(String[] args) throw Exception {

        try {
            //new 关键字创建对象
            Car car1 = new Car("mike1");
            car1.run();
            System.out.println("=================");

            //序列化
            ObjectOutput objectOutput = new ObjectOutputStream(new FileOutputStream("Car"));
            objectOutput.writeObject(car1);
            objectOutput.close();
            //

            //clone 创建对象
            Car car2 = (Car) car1.clone();
            car2.setName("mike2");
            car2.run();
            System.out.println("=================");

            //反射创建对象
            Class carClass = Class.forName(Car.class.getName());
            Car car3 = (Car) carClass.getDeclaredConstructor(new Class[]{String.class}).newInstance("mike3");
            car3.run();
            System.out.println("=================");

            //反序列化创建对象
            ObjectInputStream inputStream = new ObjectInputStream(new FileInputStream("Car"));
            Car car4 = (Car) inputStream.readObject();
            car4.setName("mike4");
            car4.run();

        }
    }
```

下面是测试代码输出结果
```
create car
mike1 is run !
=================
mike2 is run !
=================
create car
mike3 is run !
=================
mike4 is run !
```
从结果中可以得出最直接的结论，Clone和反序列化都没有执行类的构造函数。


## Clone 
clone拷贝对象返回的是一个新的对象，而不是一个对象的引用地址；拷贝对象已经包含原来对象的信息，而不是对象的初始信息，即每次拷贝动作不是针对一个全新对象的创建。

利用clone，在内存中进行数据块的拷贝，复制已有的对象，也是生成对象的一种方式。前提是类实现Cloneable接口，Cloneable接口没有任何方法，是一个空接口，也可以称这样的接口为标志接口，只有实现了该接口，才会支持clone操作。有的人也许会问了，java中的对象都有一个默认的父类Object。
Object中有一个clone方法，为什么还必须要实现Cloneable接口呢，这就是cloneable接口这个标志接口的意义，只有实现了这个接口才能实现复制操作，因为jvm在复制对象的时候，会检查对象的类是否实现了Cloneable这个接口，如果没有实现，则会报CloneNotSupportedException异常。类似这样的接口还有Serializable接口、RandomAccess接口等。
还有值得一提的是在执行clone操作的时候，不会调用构造函数。