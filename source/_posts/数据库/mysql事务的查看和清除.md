---
title: mysql事务的查看和清除
toc: true
author: mirsery
comments: false
date: 2022-07-16 17:03:53
updated: 2022-07-16 17:03:53
tags:
categories:
excerpt:
---


<!-- toc -->

## 查看当前打开的表

```sql
show open tables;
```

## 查看当前的线程数和表的关系

```sql
show OPEN TABLES  where In_use > 0;
```

## 查看正在执行的事务

```sql
SELECT * FROM information_schema.INNODB_TRX;
```
若**trx_state为LOCK WAIT**或者**trx_rows_locked > 0**均表示有锁的等待

## 结束连接
```sql
kill <PID>
```

## 查看正在锁的事务

```sql
SELECT * FROM information_schema.INNODB_LOCKS;
```

## 查看正在等待锁的事务

```sql
SELECT * FROM INFORMATION_SCHEMA.INNODB_LOCK_WAITS;
```

## 查看当前运行的现成列表

```sql
show processlist;

show full processlist;
```