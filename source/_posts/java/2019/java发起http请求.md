---
title: java发起http请求
date: 2019-09-18
tags: 
    - http
categories: 
    - java
---


## 在java中利用jdk提供的方法我们可以很轻松的发起一个http请求。
```java
    URL  realURL = new URL(url);  //java.net.URL
    URLConnection conn = realURL.openConnection( );
    //设置请求头
    connection.setRequestProperties("accept","*/*");
    conn.setRequestProperty("connection", "Keep-Alive");
    conn.setRequestProperty("Content-Type", "application/json");
    conn.setRequestProperty("user-agent","Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1;SV1)");
    // 发送POST请求必须设置如下两行
    conn.setDoOutput(true);
    conn.setDoInput(true);
     // 获取URLConnection对象对应的输出流
    out = new PrintWriter(conn.getOutputStream());
    // 发送请求参数
    out.print(param);
    out.flush();
    BufferedReader in = new BufferedReader(new InputStreamReader(conn.getInputStream()));
    String line;
    String result;
    while ((line = in.readLine()) != null) {result += line;}
```


## 发起一个post请求
``` java
    OkHttpClient client = new OkHttpClient.Builder().
        connectTimeout(10, TimeUnit.SECONDS).
        readTimeout(20, TimeUnit.SECONDS).build(); //超时时间设置
    MediaType mediaType = MediaType.parse("application/json");
        String url = "request_url";
    okhttp3.RequestBody requestBody=okhttp3.RequestBody.
        create(message, mediaType);
    Request request = new Request.Builder().url(url).post(requestBody).
    addHeader("Content-Type", "application/json").
        addHeader("header", key).build();
    try {
            Response response = client.newCall(request).execute();
            response.body().string();
     } catch (IOException e) {
            e.printStackTrace();
     }   
```