---
date: 2018-06-07 22:01
status: public
title: unix|linux命令技巧
categories:
    - linux
tags:
    - linux
---

##删除一个大文件
删除一个巨大的文件（200G）我们需要输入
```shell
> /path/to/file.log
```
或者使用如下格式
```shell
: > /path/to/file.log
```
然后删除它
```shell
rm /path/to/file.log
```

##还原被删除的/tmp文件夹
```bash
mkdir /tmp
chmod 1777 /tmp
chown root:root /tmp
ls -ld /tmp
```

##锁定一个文件夹
```bash
chmod 0000 /downloads
root用户可以访问，而ls和cd命令不工作，还原它
chmod 0755 /downloads
```

##在vim中使用密码保护文件
```bash
vim +X filename
```
或者，在推出vim之前使用X命令来加密文件，vim会提示你输入一个密码

##清除屏幕上的乱码
```bash
reset
```

##易读格式
传递-h或者-H（和其他选项）选项给GNU或者BSD工具来获取像ls、df、du等命令以易读的格式输出
```bash
free -b

free -k

free -m

free -g

# 以易读的格式输出 (比如 1K 234M 2G)

du -h

# 以易读的格式显示文件系统权限

stat -c %A /boot

# 比较易读的数字

sort -h -a file

# 在Linux上以易读的形式显示cpu信息

lscpu

lscpu -e

lscpu -e=cpu,node

# 以易读的形式显示每个文件的大小

tree -h

tree -h /boot
```

##在Linux系统中显示已知的用户信息

```bash
## linux 版本 ##

lslogins

## BSD 版本 ##

logins

```

##删除意外在当前文件夹解压的文件

我意外在/var/www/html/而不是/home/projects/www/current下解压了一个tarball。它搞乱了/var/www/html下的文件，你甚至不知道哪些是误解压出来的。最简单修复这个问题的方法是：

```bash
cd /var/www/html/

/bin/rm -f "$(tar ztf /path/to/file.tar.gz)"
```

##想要再次运行相同的命令

只需要输入!!。比如：
```bash
/myhome/dir/script/name arg1 arg2

# 要再次运行相同的命令

!!

## 以root用户运行最后运行的命令

sudo !!

!!会运行最近使用的命令。要运行最近运行的以“foo”开头命令：

!foo

# 以root用户运行上一次以“service”开头的命令

sudo !service

!$用于运行带上最后一个参数的命令：

# 编辑 nginx.conf

sudo vi /etc/nginx/nginx.conf

# 测试 nginx.conf

/sbin/nginx -t -c /etc/nginx/nginx.conf

# 测试完 "/sbin/nginx -t -c /etc/nginx/nginx.conf"你可以用vi再次编辑这个文件了

sudo vi !$
```

##列出你系统中所有文件和目录
```bash
find / -type d | less

# 列出$HOME 所有目录

find $HOME -type d -ls | less
```
要看到所有的文件运行：
```bash
find / -type f | less

# 列出 $HOME 中所有的文件

find $HOME -type f -ls | less
```

##创建目录树
你可以用mkdir加上-p选项一次创建一颗目录树：
```bash
mkdir -p /jail/{dev,bin,sbin,etc,usr,lib,lib64}

ls -l /jail/
```

##将文件复制到多个目录中
```bash
echo /usr/dir1 /var/dir2 /nas/dir3 | xargs -n 1 cp -v /path/to/file
```
等同于
```bash
cp /path/to/file /usr/dir1

cp /path/to/file /var/dir2

cp /path/to/file /nas/dir3
```

##快速找出两个目录的不同
diff命令会按行比较文件。但是它也可以比较两个目录：
```bash
ls -l /tmp/r

ls -l /tmp/s

# 使用 diff 比较两个文件夹

diff /tmp/r/ /tmp/s/

Fig. : Finding differences between folders
```

##文本格式化
你可以用fmt命令重新格式化每个段落。在本例中，我要用分割超长的行并且填充短行：

```bash
fmt file.txt
```
你也可以分割长的行，但是不重新填充，也就是说分割长行，但是不填充短行：

```bash
fmt -s file.txt
```

##可以看见输出并将其写入到一个文件中

如下使用tee命令在屏幕上看见输出并同样写入到日志文件my.log中：
```bash
mycoolapp arg1 arg2 input.file | tee my.log
```
tee可以保证你同时在屏幕上看到mycoolapp的输出并写入文件  my.log

## 查看目录下文件的大小
sudo du -h --max-depth=1
