---
title: NIO SelectionKey 类解析
date: 2021-01-06
tags: 
  - nio
  - socket
categories: 
  - java
excerpt: 'A token representing the registration of a SelectableChannel with a Selector.....'  
---


# NIO SelectionKey 类解析
>  A token representing the registration of a SelectableChannel with a Selector.


<!-- toc -->


## SelectionKey类解释以及用法

![](./_image/2021/969959BD-AB3E-4F9B-9133-ACDF5C67AEF6.png)
以下是 **javadoc** 对 **SelectionKey** 的解释：
A token representing the registration of a SelectableChannel with a Selector.

A selection key is created each time a channel is registered with a selector. A key remains valid until it is cancelled by invoking its cancel method, by closing its channel, or by closing its selector. Cancelling a key does not immediately remove it from its selector; it is instead added to the selector's cancelled-key set for removal during the next selection operation. The validity of a key may be tested by invoking its isValid method.

A selection key contains two operation sets represented as integer values. Each bit of an operation set denotes a category of selectable operations that are supported by the key's channel.

The interest set determines which operation categories will be tested for readiness the next time one of the selector's selection methods is invoked. The interest set is initialized with the value given when the key is created; it may later be changed via the interestOps(int) method.

The ready set identifies the operation categories for which the key's channel has been detected to be ready by the key's selector. The ready set is initialized to zero when the key is created; it may later be updated by the selector during a selection operation, but it cannot be updated directly.

That a selection key's ready set indicates that its channel is ready for some operation category is a hint, but not a guarantee, that an operation in such a category may be performed by a thread without causing the thread to block. A ready set is most likely to be accurate immediately after the completion of a selection operation. It is likely to be made inaccurate by external events and by I/O operations that are invoked upon the corresponding channel.

This class defines all known operation-set bits, but precisely which bits are supported by a given channel depends upon the type of the channel. Each subclass of SelectableChannel defines an validOps() method which returns a set identifying just those operations that are supported by the channel. An attempt to set or test an operation-set bit that is not supported by a key's channel will result in an appropriate run-time exception.

It is often necessary to associate some application-specific data with a selection key, for example an object that represents the state of a higher-level protocol and handles readiness notifications in order to implement that protocol. Selection keys therefore support the attachment of a single arbitrary object to a key. An object can be attached via the attach method and then later retrieved via the attachment method.

Selection keys are safe for use by multiple concurrent threads.The operations of reading and writing the interest set will, in general, be synchronized with certain operations of the selector.Exactly how this synchronization is performed is implementation-dependent: In a naive implementation, reading or writing the interest set may block indefinitely if a selection operation is already in progress; in a high-performance implementation, reading or writing the interest set may block briefly, if at all. In any case, a selection operation will always use the interest-set value that was current at the moment that the operation began.


> selector is thread safe but Selectionkeys's set is not!

## 变量
### **OP_ACCEPT**  1 << 4
>  Operation-set bit for socket-accept operations
Suppose that a selection key's interest set contains **OP_ACCEPT** at the start of a selection operation. If the selector detects that the corresponding server-socket channel is ready to accept another connection, or has an error pending, then it will add **OP_ACCEPT** to the key's ready set and add the key to its **selected-key set**.

### **OP_CONNECT** 1 << 3
> Operation-set bit for socket-connect operations.
Operation-set bit for socket-connect operations.
Suppose that a selection key's interest set contains **OP_CONNECT** at the start of a selection operation. If the selector detects that the corresponding socket channel is ready to complete its connection sequence, or has an error pending, then it will add **OP_CONNECT** to the key's ready set and add the key to its **selected-key set**.

### **OP_READ** 1 << 0
> Operation-set bit for read operations.
Operation-set bit for read operations.
Suppose that a selection key's interest set contains **OP_READ** at the start of a selection operation. If the selector detects that the corresponding channel is ready for reading, has reached end-of-stream, has been remotely shut down for further reading, or has an error pending, then it will add **OP_READ** to the key's ready-operation set and add the key to its **selected-key set**.
### **OP_WRITE** 1 << 2
>  Operation-set bit for write operations.
Operation-set bit for write operations.
Suppose that a selection key's interest set contains **OP_WRITE** at the start of a selection operation. If the selector detects that the corresponding channel is ready for writing, has been remotely shut down for further writing, or has an error pending, then it will add **OP_WRITE** to the key's ready set and add the key to its **selected-key set**.

## 方法
### **public abstract SelectableChannel channel()**
>  Returns the channel for which this key was created.
 This method will continue to return the selector even after the key is cancelled.