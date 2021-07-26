---
title: 'Grouping threads into a group'
date: 2016-07-18 15:42:00
tags: 
  - 线程
categories: 
  - java
---

# Grouping threads into a group


<!-- toc -->


An interesting functionality offered by the concurrency API of Java is the ability to group the threads. This allows us to treat the threads of a group as a single unit and provides access to the Thread objects that belong to a group to do an operation with them. For example, you have some threads doing the same task and you want to control them, irrespective of how many threads are still running, the status of each one will interrupt all of them with a single call.
Java provides the ThreadGroup class to work with groups of threads. A ThreadGroup object can be formed by Thread objects and by another ThreadGroup object, generating a tree structure of threads.
In this recipe, we will learn to work with ThreadGroup objects developing a simple example. We will have 10 threads sleeping during a random period of time (simulating a search, for example) and, when one of them finishes, we are going to interrupt the rest.

## How to do 
-  First, create a class called Result. It will store the name of Thread that finishes first. Declare a privateString attribute called name and the methods to read and set the value.
- Create a class called SearchTask and specify that it implements the Runnable interface.
- Declare a private attribute of the Result class and implement the constructor of the class that initializes this attribute.
- Implement the run() method. It will call the doTask() method and wait for it to finish or for a InterruptedException exception. The method will write messages to indicate the start, end, or interruption of this Thread.
- Implement the doTask() method. It will create a Random object to generate a random number and call the sleep() method with that random number.
- Now, create the main class of the example by creating a class called Main and implement the main() method.
- First, create a ThreadGroup object and call them Searcher.
- Then, create a SearchTask object and a Result object.
- Now, create 10 Thread objects using the SearchTask object. When you call the constructor of the Thread class, pass it as the first argument of the ThreadGroup object.
- Write information about the ThreadGroup object using the list() method.
- Use the activeCount() and enumerate() methods to know how many Thread objects are associated with the ThreadGroup objects and get a list of them. We can use this method to get, for example, the state of each Thread.
- Call the method waitFinish(). We will implement this method later. It will wait until one of the threads of the ThreadGroup objects ends.
- Interrupt the rest of the threads of the group using the interrupt() method.
- Implement the waitFinish() method. It will use the activeCount() method to control the end of one of the threads.

## code

### the code about the thread class
```java
import java.util.Date;
import java.util.Random;
import java.util.concurrent.TimeUnit;

import javax.xml.transform.Result;

public class SearchTask implements Runnable{
	
	private Result result;
	
	public SearchTask(Result result) {
		this.result = result;
	}

	@Override
	public void run() {
		String name = Thread.currentThread().getName();
		System.out.printf("Thread %s: Start\n",name);
		try{
			doTask();
			result.setSystemId(name);
		}catch(InterruptedException e){
			System.out.printf("Thread %s: Interrupted\n",name);
			return;
		}
		System.out.printf("Thread %s: End\n",name);
	}
	
	private void doTask() throws InterruptedException{
		Random random = new Random((new Date()).getTime());
		int value = (int)(random.nextDouble()*100);
		System.out.printf("Thread %s: %d\n",
		  Thread.currentThread().getName(),value);
		TimeUnit.SECONDS.sleep(value);
	}
	
}
    
```

### the code about Main() methods
```java

import java.util.concurrent.TimeUnit;

import javax.xml.transform.Result;

public class Main {
	public static void main(String[] args) {
		ThreadGroup threadGroup = new ThreadGroup("Searcher");
		Result result = new Result() {
			private String systemId;

			@Override
			public void setSystemId(String systemId) {
				this.systemId = systemId;
			}

			@Override
			public String getSystemId() {
				return systemId;
			}
		};

		SearchTask searchTask = new SearchTask(result);

		for (int i = 0; i < 5; i++) {
			Thread thread = new Thread(threadGroup, searchTask);
			thread.start();
			try {
				TimeUnit.SECONDS.sleep(1);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		System.out.printf("Number of Threads:%d\n", threadGroup.activeCount());
		System.out.printf("Information about the Thread Group\n");
		threadGroup.list();

		Thread[] threads = new Thread[threadGroup.activeCount()];
		threadGroup.enumerate(threads);
		for (int i = 0; i < threadGroup.activeCount(); i++) {
			System.out.printf("thread %s: %s\n", threads[i].getName(), 
			threads[i].getState());
		}
		waitFinish(threadGroup);
		threadGroup.interrupt();
	}

	private static void waitFinish(ThreadGroup threadGroup) {
		while (threadGroup.activeCount() > 9) {
			try {
				TimeUnit.SECONDS.sleep(1);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		System.out.printf("The threadGroup has %d threads.\n", 
		threadGroup.activeCount());
	}

}

```
## How it works
In the following screenshot, you can see the output of the list() method and the output generated when we write the status of each Thread object, as shown in the following screenshot:

The ThreadGroup class stores the Thread objects and the other ThreadGroup objects associated with it, so it can access all of their information (status, for example) and perform operations over all its members (interrupt, for example).