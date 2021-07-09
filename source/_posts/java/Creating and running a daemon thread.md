---
title: 'Creating and running a daemon thread'
date: 2016-07-11 13:40:01
tags: 
  - 线程
categories: 
  - java
---


Java has a special kind of thread called daemon thread. These kind of threads have very low priority and normally only executes when no other thread of the same program is running. When daemon threads are the only threads running in a program, the JVM ends the program finishing these threads.
With these characteristics, the daemon threads are normally used as service providers for normal (also called user) threads running in the same program. They usually have an infinite loop that waits for the service request or performs the tasks of the thread. They can't do important jobs because we don't know when they are going to have CPU time and they can finish any time if there aren't any other threads running. A typical example of these kind of threads is the Java garbage collector.
In this recipe, we will learn how to create a daemon thread developing an example with two threads; one user thread that writes events on a queue and a daemon one that cleans that queue, removing the events which were generated more than 10 seconds ago.
# How to do it ...
- Create the Event class. This class only stores information about the events our program will work with. Declare two private attributes, one called date of java.util.Date type and the other called event of String type. Generate the methods to write and read their values.
- Create the WriterTask class and specify that it implements the Runnable interface.
public class WriterTask implements Runnable {
- Declare the queue that stores the events and implement the constructor of the class, which initializes this queue.
```java
private Deque<Event> deque;
public WriterTask (Deque<Event> deque){
    this.deque = deque;  
}
```
- Implatement the run() method of the task.This method will have a loop with 100 oterations.In each iteration,we create a new Event,save it inthe queue,and sleep for one second.
```java
@override
public void run(){
    Event event=new Event();
      event.setDate(new Date());
      event.setEvent(String.format("The thread %s has generated an event",Thread.currentThread().getId()));
      deque.addFirst(event);
      try {
        TimeUnit.SECONDS.sleep(1);
      } catch (InterruptedException e) {
        e.printStackTrace();
      }
    }
```
- Create the CleanerTask class and specify that it extends the Thread class.
    public class CleanerTask extends Thread{
- Declare the queue that stores the events and implatement the constructor of the class,which initializes this queue.In the constructor,mark this thread as a daemon thread with the setDaemon() method.
```java
private Deque<Event> deque;
public CleanerTask(Deque<Event> deque){
    this.deque = deque;
    
}
```
- Implement the run() method. It has an infinite loop that gets the actual date and calls the clean() method.
```java
  @Override
  public void run() {
    while (true) {
      Date date = new Date();
      clean(date);
    }      
  }
```
- Implement the clean() method. It gets the last event and, if it was created more than 10 seconds ago, it deletes it and checks the next event. If an event is deleted, it writes the message of the event and the new size of the queue, so you can see its evolution.
```java
  private void clean(Date date) {
    long difference;
    boolean delete;
    
    if (deque.size()==0) {
      return;
    }
    delete=false;
    do {
      Event e = deque.getLast();
      difference = date.getTime() - e.getDate().getTime();
      if (difference > 10000) {
        System.out.printf("Cleaner: %s\n",e.getEvent());
        deque.removeLast();
        delete=true;
      }  
    } while (difference > 10000);
    if (delete){
      System.out.printf("Cleaner: Size of the queue: %d\n",deque.size());
    }
  }
```
- Now, implement the main class. Create a class called Main with a main() method.
```java
public class Main {
  public static void main(String[] args) {
Create the queue to store the events using the Deque class.
    Deque<Event> deque=new ArrayDeque<Event>();
Create and start three WriterTask threads and one CleanerTask.
    WriterTask writer=new WriterTask(deque);
    for (int i=0; i<3; i++){
      Thread thread=new Thread(writer);
      thread.start();
    }
    CleanerTask cleaner=new CleanerTask(deque);
    cleaner.start();
```
- Run the program and see the results.

# How it works...
If you analyze the output of one execution of the program, you can see how the queue begins to grow until it has 30 events and then, its size will vary between 27 and 30 events until the end of the execution.
The program starts with three WriterTask threads. Each Thread writes an event and sleeps for one second. After the first 10 seconds, we have 30 threads in the queue. During these 10 seconds, CleanerTasks has been executing while the three WriterTask threads were sleeping, but it hasn't deleted any event, because all of them were generated less than 10 seconds ago. During the rest of the execution, CleanerTask deletes three events every second and the three WriterTask threads write another three, so the size of the queue varies between 27 and 30 events.
You can play with the time until the WriterTask threads are sleeping. If you use a smaller value, you will see that CleanerTask has less CPU time and the size of the queue will increase because CleanerTask doesn't delete any event.