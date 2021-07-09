---
title: 关于springboot 中添加filter的方法
author: mirsery
tags: 
    - filter
    - springboot
categories: 
    - java  
---


# 关于springboot 中添加filter的方法
>  转载自(简书作者二哥很猛)[https://www.jianshu.com/p/3d421fbce734]
由于springboot基于servlet3.0+,内嵌tomcat容器 因此无法像之前一样通过web.xml中配置Filter,本文基于springboot1.5.6

- 第一种方法
```java
@WebFilter(filterName = "myFilter",urlPatterns = "/*")
public class MyFilter implements Filter {
    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
    }

    @Override
    public void destroy() {
    }
}

@SpringBootApplication
@EnableAutoConfiguration
@EnableWebMvc
@ServletComponentScan(basePackages = "com.fanyin.eghm")
public class EghmApplication {

    public static void main(String[] args) {
        SpringApplication.run(EghmApplication.class, args);
    }
}
```
@ServletComponentScan 所扫描的包路径必须包含该Filter

- 第二种
```java
@Configuration
public class FilterConfig {
    @Bean
    public FilterRegistrationBean filterRegistrationBean(){
        FilterRegistrationBean bean = new FilterRegistrationBean();
        bean.setFilter(new MyFilter2());
        bean.addUrlPatterns("/*");
        return bean;
    }
}
```
- 第三种
```java
@Bean("proxyFilter")
    public Filter filter (){
        return new Filter() {
            @Override
            public void init(javax.servlet.FilterConfig filterConfig) throws ServletException {
            }

            @Override
            public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
            }

            @Override
            public void destroy() {
            }
        };
    }

    @Bean
    public DelegatingFilterProxyRegistrationBean delegatingFilterProxyRegistrationBean(){
        DelegatingFilterProxyRegistrationBean bean = new DelegatingFilterProxyRegistrationBean("proxyFilter");
        bean.addUrlPatterns("/*");
        return bean;
    }
```

- 第四种
```java
@Bean("myFilter")
    public Filter filter (){
        return new Filter() {
            @Override
            public void init(javax.servlet.FilterConfig filterConfig) throws ServletException {
            }

            @Override
            public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) {
            }

            @Override
            public void destroy() {
            }
        };
    }
```
说明
 第二种和第三种类似,均实现了AbstractFilterRegistrationBean接口,而该接口间接实现了ServletContextInitializer，springboot在启动容器后会查找实现该接口的bean，并调用onStartup()方法添加自定义的Filter。
两者的区别 DelegatingFilterProxyRegistrationBean 通过传入的proxyFilter名字,在WebApplicationContext查找该Fillter Bean，并通过DelegatingFilterProxy生成基于该Bean的代理Filter对象，而 FilterRegistrationBean 则是直接设置一个Filter，因此该Filter可以有spring容器管理,也可不用spring管理。
注意：如果Filter声明为一个Bean，则不需要定义为FilterRegistrationBean，也会被spring发现并添加。
方法四 该方式无法定义拦截规则等，默认全局。

EmbeddedWebApplicationContext 容器启动后执行 springboot 2.0 变更为ServletWebServerApplicationContext 。
```java
private void selfInitialize(ServletContext servletContext) throws ServletException {
        prepareEmbeddedWebApplicationContext(servletContext);
        ConfigurableListableBeanFactory beanFactory = getBeanFactory();
        ExistingWebApplicationScopes existingScopes = new ExistingWebApplicationScopes(
                beanFactory);
        WebApplicationContextUtils.registerWebApplicationScopes(beanFactory,
                getServletContext());
        existingScopes.restore();
        WebApplicationContextUtils.registerEnvironmentBeans(beanFactory,
                getServletContext());
        for (ServletContextInitializer beans : getServletContextInitializerBeans()) {
            beans.onStartup(servletContext);
        }
    }
```
getServletContextInitializerBeans() 会返回实现了ServletContextInitializer接口的集合,同时初始化一些数据,如下:
```java
public ServletContextInitializerBeans(ListableBeanFactory beanFactory) {
        this.initializers = new LinkedMultiValueMap<Class<?>, ServletContextInitializer>();
        addServletContextInitializerBeans(beanFactory);
        addAdaptableBeans(beanFactory);
        List<ServletContextInitializer> sortedInitializers = new ArrayList<ServletContextInitializer>();
        for (Map.Entry<?, List<ServletContextInitializer>> entry : this.initializers
                .entrySet()) {
            AnnotationAwareOrderComparator.sort(entry.getValue());
            sortedInitializers.addAll(entry.getValue());
        }
        this.sortedList = Collections.unmodifiableList(sortedInitializers);
    }
```
addAdaptableBeans addServletContextInitializerBeans 在调用onStartup()方法之前会添加Filter与Servlet,注意Filter与Servlet必须已经声明为Bean
第一种则最终也是采用第二种方式,区别就是在springboot启动时将扫描到的包路径作为入参传递给ServletComponentRegisteringPostProcessor 而该类实现了BeanFactoryPostProcessor接口,因此在BeanFactory初始化后,会调用postProcessBeanFactory()方法,在该方法中通过之前传入的包来扫描相应的类,并将@WebFilter的类由相应的处理器转换为FilterRegistrationBean。
ServletComponentRegisteringPostProcessor
```java
    ServletComponentRegisteringPostProcessor(Set<String> packagesToScan) {
        this.packagesToScan = packagesToScan;
    }

    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory)
            throws BeansException {
        if (isRunningInEmbeddedContainer()) {
            ClassPathScanningCandidateComponentProvider componentProvider = createComponentProvider();
            for (String packageToScan : this.packagesToScan) {
                scanPackage(componentProvider, packageToScan);
            }
        }
    }

    private void scanPackage(
            ClassPathScanningCandidateComponentProvider componentProvider,
            String packageToScan) {
        for (BeanDefinition candidate : componentProvider
                .findCandidateComponents(packageToScan)) {
            if (candidate instanceof ScannedGenericBeanDefinition) {
                for (ServletComponentHandler handler : handlers) {
                    handler.handle(((ScannedGenericBeanDefinition) candidate),
                            (BeanDefinitionRegistry) this.applicationContext);
                }
            }
        }
    }
```
WebFilterHandler
```java
    WebFilterHandler() {
        super(WebFilter.class);
    }

    @Override
    public void doHandle(Map<String, Object> attributes,
            ScannedGenericBeanDefinition beanDefinition,
            BeanDefinitionRegistry registry) {
        BeanDefinitionBuilder builder = BeanDefinitionBuilder
                .rootBeanDefinition(FilterRegistrationBean.class);
        builder.addPropertyValue("asyncSupported", attributes.get("asyncSupported"));
        builder.addPropertyValue("dispatcherTypes", extractDispatcherTypes(attributes));
        builder.addPropertyValue("filter", beanDefinition);
        builder.addPropertyValue("initParameters", extractInitParameters(attributes));
        String name = determineName(attributes, beanDefinition);
        builder.addPropertyValue("name", name);
        builder.addPropertyValue("servletNames", attributes.get("servletNames"));
        builder.addPropertyValue("urlPatterns",
                extractUrlPatterns("urlPatterns", attributes));
        registry.registerBeanDefinition(name, builder.getBeanDefinition());
    }
```
添加自定义Servlet 也可采用方法一@WebServlet 或者ServletRegistrationBean
添加自定义Listener也可以采用方法一 @WebListener或者ServletListenerRegistrationBean ,注意监听事件是泛型
