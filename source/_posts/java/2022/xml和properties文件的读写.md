---
title: xml和properties的读写
toc: true
author: mirsery
comments: false
date: 2022-07-14 22:34:31
updated: 2022-07-14 22:34:31
tags:
    - springboot
categories:
    - java
excerpt: 'Springboot读写xml和properties的文件'
---


<!-- toc -->

## 环境路径问题
SpringBoot中我们可以利用**ClassPathResource**类，利用相对路径载入**classPath**路径下的文件配置。

## xml文件的载入

```java
/*
 * 读入xml文件并序列化成javaBean
 */
    @Bean
    public DeviceList getDevice() throws IOException, JAXBException {
        String fileName = "device.xml";
        File file = new File(fileName);
        InputStream inputStream = null;
        if (!file.exists()) {
            inputStream = new ClassPathResource("device.xml").getInputStream();
        } else {
            inputStream = Files.newInputStream(file.toPath());
        }
        BufferedReader br = new BufferedReader(
                new InputStreamReader(inputStream, StandardCharsets.UTF_8));
        StringBuilder buffer = new StringBuilder();
        String line = "";
        while((line = br.readLine())!=null) {
            buffer.append(line);
        }
        br.close();

        Object xmlObject = null;
        Reader reader = null;
        JAXBContext context = JAXBContext.newInstance(DeviceList.class);
        Unmarshaller unmarshaller = context.createUnmarshaller();
        reader = new StringReader(buffer.toString());
        //以文件流的方式传入这个string
        xmlObject = unmarshaller.unmarshal(reader);
        reader.close();
        DeviceList deviceList = (DeviceList) xmlObject;
        return deviceList;
    }
```

```java
//child节点类
@XmlRootElement(name = "device")
@XmlAccessorType(XmlAccessType.FIELD)
public class Device {

    @XmlElement(name = "name")
    private String name; //channelCode

    @XmlElement(name = "deviceNo")
    private String deviceNo;

    @XmlElement(name = "address")
    private String address;

    @XmlElement(name = "enter", defaultValue = "0")
    private int enter;

    @XmlElement(name = "type", defaultValue = "0")
    private int type;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDeviceNo() {
        return deviceNo;
    }

    public void setDeviceNo(String deviceNo) {
        this.deviceNo = deviceNo;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public int getEnter() {
        return enter;
    }

    public void setEnter(int enter) {
        this.enter = enter;
    }

    public int getType() {
        return type;
    }

    public void setType(int type) {
        this.type = type;
    }
}
```

```java
@XmlRootElement(name = "devices")
@XmlAccessorType(XmlAccessType.FIELD)
public class DeviceList {

    @XmlElement(name = "device")
    private List<Device> deviceList;

    public List<Device> getDeviceList() {
        return deviceList;
    }

    public void setDeviceList(List<Device> deviceList) {
        this.deviceList = deviceList;
    }
}
```
载入的device.xml文件
```xml
<devices>
    <device>
        <name>hilee</name>
        <deviceNo>xjxjxjx</deviceNo>
        <address>xxx</address>
        <enter>0</enter> 
        <type>0</type>
    </device>
</devices>
```

## properties文件载入

```java
    @Bean
    public IccConfig getIccConfig() {
        try {
            String fileName = "icc.properties";
            Properties properties = new Properties();
            File file = new File(fileName);
            if (file.exists()) {
                properties.load(Files.newInputStream(file.toPath()));
            } else {
                properties.load(new ClassPathResource(fileName).getInputStream());
            }
            IccConfig icConfig = new IccConfig();
            icConfig.setHost(properties.getProperty("host"));
            icConfig.setUsername(properties.getProperty("username"));
            icConfig.setPassword(properties.getProperty("password"));
            icConfig.setClientId(properties.getProperty("clientId"));
            icConfig.setClientSecret(properties.getProperty("clientSecret"));
            icConfig.setPwdClientId(properties.getProperty("pwdClientId"));
            icConfig.setPwdClientSecret(properties.getProperty("pwdClientSecret"));
            return icConfig;
        } catch (IOException e) {
            throw new RuntimeException(e);
        }
    }
```

```java
public class IccConfig {

    private String host;
    private String clientId;
    private String clientSecret;
    private String pwdClientId;
    private String username;
    private String pwdClientSecret;
    private String password;

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    public String getClientSecret() {
        return clientSecret;
    }

    public void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    public String getPwdClientId() {
        return pwdClientId;
    }

    public void setPwdClientId(String pwdClientId) {
        this.pwdClientId = pwdClientId;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPwdClientSecret() {
        return pwdClientSecret;
    }

    public void setPwdClientSecret(String pwdClientSecret) {
        this.pwdClientSecret = pwdClientSecret;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
```

## xml的序列化
```java
protected void saveDeviceXML(Collection<Device> devices) {
        try {
            DocumentBuilder builder = DocumentBuilderFactory.newInstance().newDocumentBuilder();
            Document document = builder.newDocument();
            Element element = document.createElement("devices");
            devices.forEach(item -> {
                if (null!=item.getName() && !"".equals(item.getName())) {
                    Element device = document.createElement("device");
                    Element name = document.createElement("name");
                    Element deviceNo = document.createElement("deviceNo");
                    Element address = document.createElement("address");
                    Element enter = document.createElement("enter");
                    Element type = document.createElement("type");

                    name.setTextContent(item.getName());
                    deviceNo.setTextContent(item.getDeviceNo());
                    address.setTextContent(item.getAddress());
                    enter.setTextContent(String.valueOf(item.getEnter()));
                    type.setTextContent(String.valueOf(item.getType()));

                    device.appendChild(name);
                    device.appendChild(deviceNo);
                    device.appendChild(address);
                    device.appendChild(enter);
                    device.appendChild(type);

                    element.appendChild(device);
                }
            });
            document.appendChild(element);

            TransformerFactory factory = TransformerFactory.newInstance();
            Transformer transformer = factory.newTransformer();
            document.setXmlStandalone(true);
            transformer.setOutputProperty(OutputKeys.OMIT_XML_DECLARATION, "yes");

            String fileName = "device.xml";
            File file = new File(fileName);
            FileOutputStream outputStream = null;
            if (!file.exists()) {
                ClassPathResource pathResource = new ClassPathResource(fileName);
                outputStream = new FileOutputStream(pathResource.getFile());
            } else {
                outputStream = new FileOutputStream(file);
            }
            transformer.transform(new DOMSource(document), new StreamResult(outputStream));
            outputStream.close();

        } catch (ParserConfigurationException | TransformerException | IOException e) {
            throw new RuntimeException(e);
        }
    }
```

### properties序列化
```java
protected void saveIccProperties(IccConfig iccConfig) {
        try {
            Properties properties = new Properties();
            properties.setProperty("host", iccConfig.getClientId());
            properties.setProperty("username", iccConfig.getClientSecret());
            properties.setProperty("password", iccConfig.getHost());
            properties.setProperty("clientId", iccConfig.getUsername());
            properties.setProperty("clientSecret", iccConfig.getPassword());
            properties.setProperty("pwdClientId", iccConfig.getPwdClientId());
            properties.setProperty("pwdClientSecret", iccConfig.getPwdClientSecret());

            String fileName = "icc.properties";
            File file = new File(fileName);
            OutputStream outputStream = null;
            if (!file.exists()) {
                ClassPathResource pathResource = new ClassPathResource(fileName);
                outputStream = new FileOutputStream(pathResource.getFile());
            } else {
                outputStream = Files.newOutputStream(file.toPath());
            }
            properties.store(outputStream, null);

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
```