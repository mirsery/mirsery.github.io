---
categories: 
    - docker
tags: 
    - docker    
date: 2018-10-22 22:38:12
status: public
title: Dockerfiler如何使用多个CMD命令
---

## Dockerfiler如何使用多个CMD命令

两个办法，一个是CMD不用中括号框起来，将命令用"&&"符号链接

直接使用 sh -c 执行多条语句使用```&&```相连接
```bash
CMD nohup sh -c 'npm start && node ./server/server.js'
```

ENTRYPOINT可以直接执行脚本命令

```bash
ENTRYPOINT ["./entrypoint.sh"]
```