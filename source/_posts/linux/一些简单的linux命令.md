---
date: 2016-04-14 13:35
status: public
title: 一些简单的linux命令
categories:
    - linux
tags:
    - linux
---

#显示系统当前日期和时间date
    date    默认显示日期和时间
    cal     默认显示当前月份的日历 
#查看磁盘剩余空间的数量df
    df
#显示空闲内存的数量free
    free
#打印当前目录名pwd
    pwd
#更改目录cd    
    cd
    cd - 更改目录到先前的工作目录
    cd ~user_name 更改工作目录到用户家目录。例如, cd ~bob 会更改工作目录到用户“bob”的家目录。
#列出目录内容ls    
    ls 
    ls /[目录名]列出指定目录
    ls -l 以长模式输出目录内容
    ls -a --all                列出所有文件，甚至包括文件名以圆点开头的默认会被隐藏的隐藏文件。
    ls -d --directory     通常，如果指定了目录名，ls 命令会列出这个目录中的内容，而不是目录本身。 把这个选项与 -l 选项结合使用，可以看到所指定目录的详细信息，而不是目录中的内容.
    ls -F --classify            这个选项会在每个所列出的名字后面加上一个指示符。
    ls -h --human-readable      当以长格式列出时以人们可读的格式而不是以字节数来显示文件的大小。
    ls -r --reverse             以相反的顺序来显示结果。ls 命令的输出结果按照字母升序排列。 
    ls -S                       命令输出结果按照文件大小来排序
    ls -t                       按照修改时间来排序。
#确定文件类型file
    file [file_name]
#浏览文件内容less
    less [file_name]
#复制文件和目录cp
#移动/重命名文件和目录mv
#创建目录mkdir
#删除文件和目录rm
#创建硬链接和符号链接ln