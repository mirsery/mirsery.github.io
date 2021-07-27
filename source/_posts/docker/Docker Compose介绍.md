---
categories: 
    - docker
tags: 
    - docker    
date: 2021-01-29 18:28:12
status: public
title: DockerCompose介绍
---

>  Compose 是用于定义和运行多容器 Docker 应用程序的工具。通过 Compose，您可以使用 YML 文件来配置应用程序需要的所有服务。然后，使用一个命令，就可以从 YML 文件配置中创建并启动所有服务。
## Docker compose 使用步骤
- 使用 **Dockerfile** 定义应用程序的环境。
- 使用 **docker-compose.yml**定义构成应用程序的服务，这样它们可以在隔离环境中一起运行。
- 最后，执行 **docker-compose up -d ** 命令在后台启动并运行整个应用程序。
## Docker compose 安装
- 直接下载安装
 mac os 可以安装docker的gui客户端直接包含docker compose ，[下载地址](https://docs.docker.com/docker-for-mac/install/)
windows 也可以直接安装docker的gui客户端 ,[下载地址](https://docs.docker.com/docker-for-windows/install/)
linux可以在仓库中直接下载docker-compose ，例如:**sudo apt-get install docker-compose**,或者直接下载其二进制包。
- 手动下载二进制包使用

Linux 上我们可以从 Github 上下载它的二进制包来使用，最新发行的版本地址：[https://github.com/docker/compose/releases](https://github.com/docker/compose/releases)。

```bash
sudo curl -l https://github.com/docker/compose/releases/download/1.28.2/docker-compose-$(uname -s)-$(uname -m) \ 
-o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose
sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose

```
>   **$(uname -m) 显示计算机类型，$(uname -s) 显示操作系统名称**