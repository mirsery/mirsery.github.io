---
date: 2016-06-26 16:39
status: public
title: linux文件远程拷贝命令scp的使用
categories:
    - linux
tags:
    - linux  
---

在linux系统中，我们知道，要查看一个命令可以有两种方式：一种是通过 –help/-h；另一种是通过 man命令。为了简单，我们使用—help/-h来查看scp都有哪些选项。
```
\# scp –help
scp [-1246BCpqrv] [-c cipher] [-F ssh_config] [-i identity_file] [-l limit] [-o ssh_option] [-P port] [-S program] [[user@]host1:]file1 [...] [[user@]host2:]file2
```
我们看到scp包含以上所有的选项，下面我们分别介绍

    -1 强制scp使用ssh1 协议。
    -2 强势scp使用ssh2 协议。
    -4 强制scp使用 IPV4格式地址。
    -6 强制scp使用IPV6格式地址。
    -B 使用批处理模式（传输之前不再询问密码或者口令）。
    -C 启用压缩模式，将-C传递给ssh协议，从而打开压缩功能。
    -p 保留源文件的修改时间、访问时间还有访问权限。
    -q 禁用传输进度条。-r 递归拷贝指定的整个文件夹。
    -c cipher 选择cipher方式来加密传输的数据，该选项将直接传递给ssh使用。
    -F ssh_config 指定一个可用来替代ssh的配置文件，该选项直接传递给ssh使用。
    -i identity_file 从指定的文件中读取用于RSA 验证的密钥，该选项直接传递给ssh使用。
    -l limit 限定用户可以使用的宽带，以Kbit/s为速度单位。
    -P port 这里的P是大写。指定连接远程主机用的端口。
    -S program 指定加密传输连接时使用的加密程序。
    -o ssh_option 使用在ssh_config(5)所用的格式将参数传递给ssh。

Scp使用示例

例一

\# scp /phppro/Db.php root@192.168.18.130:/Db.php

这种方式因为指定了用户名root，所以仅需要输入密码。这是将本地/phppro/Db.php文件远程拷贝到主机192.168.18.130的根目录下。

例二

\# scp /phppro/Db.php 192.168.18.130:/Db.php

这种方式因为没有指定用户名，所以需要手动输入用户名和密码。注意，有的系统下如果你没有指定用户名，默认会是root用户。

例三

\# scp –r /phppro root@192.168.18.130:/phppro

递归拷贝整个文件夹的内容到目标文件夹内。同样，如果目标文件夹phppro不存在，会先创建该文件夹。

Scp不用输入密码传输方式

通过上面的使用示例我们发现，按照上面的方式每次都必须得输入密码，这样使用起来真的不是很方便。尤其是如果我们需要在脚本中使用该命令来实现自动拷贝的话，那问题就更尖锐了。所以说我们需要一种方式来实现不用输入密码进行传输。

这时候我们可以使用下面的方法
```
\# ssh-keygen –t rsa
Generating public/private rsa key pair.
Enter file in which to save the key (/root/.ssh/id_rsa):
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
Your identification has been saved in /root/.ssh/id_rsa.
Your public key has been saved in /root/.ssh/id_rsa.pub.
The key fingerprint is:
f6:f7:1d:1e:43:79:a9:72:ed:1c:60:e6:74:8b:a4:8c root@localhost.localdomain
```
我们看第二行（Enter file in which to save the key (/root/.ssh/id_rsa):），在这里会要求我们输入保存路径，直接回车，使用默认即可。再看第三行（Enter passphrase (empty for no passphrase): ）和第四行（Enter same passphrase again：），这里是要我们输入验证的口令，在这里输入的口令将取代目标主机指定账户的密码。也就是说如果我们指定了目标主机的root账户，该用户的密码是123456。而我们在口令设置那里设置了abcdef，那么在每次传输之前系统要求我们输入口令abcdef而不是root账户的密码123456。

当然了，我们需要的是每次传输都不用输入任何的密码或口令。所以说，这里我们应该在第三行和第四行直接回车，不输入任何字串。

上面的命令执行完以后，会在$HOME/.ssh/目录中生成三个文件：id_rsa（私钥文件）、id_rsa.pub（公钥文件）和knonw_hosts文件。接下来我们将id_rsa.pub（公钥文件）拷贝到目标主机的$HOME/.ssh 目录下面，拷贝完成以后将目标主机下的id_rsa.pub文件重命名为authorized_keys。这些都做完以后，再使用scp远程拷贝文件的时候就不再需要输入密码或者口令这些东西了。