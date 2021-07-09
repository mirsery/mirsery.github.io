---
title: java Annotation示例
tags: 
  - annotation
categories: 
  - java
---

# Annotation 
From Core Java SE9 for the Impatient
Annotations are tags that you insert into your source code so that some tool can process them. The tools can operate on the source level, or they can process class files into which the compiler has placed annotations.
Annotations do not change the way your programs are compiled. The Java compiler generates the same virtual machine instructions with or without the annotations.
To benefit from annotations, you need to select a processing tool and use annotations that your processing tool understands, before you can apply that tool to your code.
There is a wide range of uses for annotations. For example, JUnit uses annotations to mark methods that execute tests and to specify how the tests should be run. The Java Persistence Architecture uses annotations to define mappings between classes and database tables, so that objects can be persisted automatically without the developer having to write SQL queries.



<!-- toc -->


## using Annotations
### simple annotation
```java
public class CacheTest {
    ...
    @Test public void checkRandomInsertions()
}
```
### annotation elements
Annotation can hava key/value pairs called elements,such as 
@Test(timeout=10000)
An annotation element is one of the following:
• A primitive type value
• A String
• A Class object
• An instance of an enum
• An annotation
• An array of the preceding (but not an array of arrays)
### Multilple and Repeated Annotations
An item can have multiple annotations:
@Test
@BugReport(showStopper=true,reportedBy="Joe")
public void checkRandomInsertions( )
If the author of an annotation declared it to be repeatable, you can repeat the same annotation multiple times:
@BugReport(showStopper=true, reportedBy="Joe")
@BugReport(reportedBy={"Harry", "Carl"})
public void checkRandomInsertions()
### Annotating Declarations
They fail into two categories : ```declarations``` and ``` type uses```.Declaration annotations can appear at the declarations of  
- Classes(including enum) and interfaces (including annotation interfaces)
- Methods
- Constructors
- Instance variable (including enum constants)
- Local variables (including those deckared in for and try-with-resources statements)
- Parameter variables and catch clasuse parameters
- Type parameters
- Packages
### Annotating Type Users
A declaration annotation provides some information about the item being declared.
```java
public User getUser(@NotNull String userId)
```
It is arrerted that userId parameter is not null.
### Making Receivers Explicit
Suppose you want to annotate parameters that are not being mutated by a method.

## defineing Annotations
@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
public @interface Test {
    long timeout();
    ...
}
The @interface declaration creates an actual Java interface. Tools that process annotations receive objects that implement the annotation interface. When the JUnit test runner tool gets an object that implements Test, it simply invokes the timeout method to retrieve the timeout element of a particular Test annotation.
## Annotations for Compilation
The @Deprecated annotation can be attached to any items whose use is no longer encouraged. The compiler will warn when you use a deprecated item. This annotation has the same role as the @deprecated Javadoc tag. However, the annotation persists until runtime.
## Annotations for Managing Resources
```
@Resource(name="jdbc/employeedb")
private DataSource source;
```
