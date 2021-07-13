---
title: springboot 中应用缓存（一）
author: mirsery
date: 2021-05-08
tags: 
    - cache
    - springboot
categories: 
    - java  
---

# springboot 中应用缓存（一）

<!-- toc -->

一般情况的程序的压力瓶颈在数据库。当需要重复的获取相同的数据或者获取的数据更新周期很慢时，我们会进行如果一次又一次直接进行数据库的请求或远程服务的调用会导致IO的阻塞，从而导致程序性能的恶化。
## springboot 缓存支持
springboot定义了org.springframework.cache.CacheManager和org.springframework.cache.Cache接口用来统一不通的缓存技术。其中CacheManager是Spring提供的各种缓存技术抽象接口，Cache接口包含缓存的各种操作（增加、删除、获得缓存）。

CacheManager 的实现

|CacheManager|描述|
|---|---|
|SimpleCacheManager|使用简单的Collection来存储缓存，主要用来测试用途|
|ConcurrentMapCacheManager|使用ConcurrentMap来存储缓存|
|NoOpCacheManager|仅做测试用途，不会实际存储缓存|
|EhCacheManager|使用EhCache作为缓存技术|
|GuavaCacheManager|使用Google Guava的GuavaCache做为缓存技术|
|HazelcastCacheManager|使用Hazelcast作为缓存技术|
|JCacheCacheManager|支持JCache（JSR-107)标准的实现作为缓存技术，如Apache Commons JCS|
|RedisCacheManager|使用redis作为缓存技术|

## CacheManager 的使用
> 1、 [注册bean](#CacheManager_1)
> 2、[开启声明缓存支持](#CacheManager_2)
> 3、[声明缓存规则](#CacheManager_3)
1. <span id="CacheManager_1">注册Bean</span>
    在pom.xml中引入如下:
```xml:n
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-cache</artifactId>
</dependency>
<dependency>
    <groupId>net.sf.ehcache</groupId>
    <artifactId>ehcache</artifactId>
    <version>2.10.6</version>
</dependency>
```
根据查看源码,可知**spring-boot-starter-cache** 引入**spring-context-support-5.2.2.RELEASE.jar** 包，查看源码**org.springframework.boot.autoconfigure.cache.EhCacheCacheConfiguration**

```java:n
/*
 * Copyright 2012-2019 the original author or authors.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      https://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.springframework.boot.autoconfigure.cache;

import net.sf.ehcache.Cache;
import net.sf.ehcache.CacheManager;

import org.springframework.boot.autoconfigure.condition.ConditionalOnClass;
import org.springframework.boot.autoconfigure.condition.ConditionalOnMissingBean;
import org.springframework.boot.autoconfigure.condition.ResourceCondition;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.cache.ehcache.EhCacheManagerUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Conditional;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.Resource;

/**
 * EhCache cache configuration. Only kick in if a configuration file location is set or if
 * a default configuration file exists.
 *
 * @author Eddú Meléndez
 * @author Stephane Nicoll
 * @author Madhura Bhave
 */
@Configuration(proxyBeanMethods = false)
@ConditionalOnClass({ Cache.class, EhCacheCacheManager.class })
@ConditionalOnMissingBean(org.springframework.cache.CacheManager.class)
@Conditional({ CacheCondition.class, EhCacheCacheConfiguration.ConfigAvailableCondition.class })
class EhCacheCacheConfiguration {

	@Bean
	EhCacheCacheManager cacheManager(CacheManagerCustomizers customizers, CacheManager ehCacheCacheManager) {
		return customizers.customize(new EhCacheCacheManager(ehCacheCacheManager));
	}

	@Bean
	@ConditionalOnMissingBean
	CacheManager ehCacheCacheManager(CacheProperties cacheProperties) {
		Resource location = cacheProperties.resolveConfigLocation(cacheProperties.getEhcache().getConfig());
		if (location != null) {
			return EhCacheManagerUtils.buildCacheManager(location);
		}
		return EhCacheManagerUtils.buildCacheManager();
	}
	/**
	 * Determine if the EhCache configuration is available. This either kick in if a
	 * default configuration has been found or if property referring to the file to use
	 * has been set.
	 */
	static class ConfigAvailableCondition extends ResourceCondition {
		ConfigAvailableCondition() {
			super("EhCache", "spring.cache.ehcache.config", "classpath:/ehcache.xml");
		}

	}
}
```
可以自动注册bean。配置文件默认地址是**classpath:/ehcache.xml**
1. <span id="CacheManager_2">开启声明缓存支持</span>
    开启缓存支持只需要在配置类中增加**@EnableCaching**注解即可。
3. <span id="#CacheManager_3">声明缓存规则</span>

|注解|解释|
|---|---|
@Cacheable|在方法前spring 先查看缓存中是否有数据，如果有数据，则直接返回缓存数据；若没有数据，调用方法并将方法返回值放进缓存
@CachePut|无论怎样，都会将方法的返回值放到缓存中。@CachePut的属性与@Cacheable保存一致。
@CacheEvict|将一条或多条数据从缓存中删除
@Caching|可以通过@Caching注解组合多个注解策略在一个方法上