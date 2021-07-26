---
date: 2016-08-06 14:28
status: public
tags: 
    - git
categories:
    - git    
title: git远程仓库的使用
---

# 查看当前的远程仓库
    git remote
    git remote -v   (v是verbose的缩写)
# 添加远程仓库
    git remote add [shortname][url]
# 从远程仓库抓取数据
    git fetch[remote-name]
    该命令会拉取远程仓库中的内容到本地
# 推送数据到远程仓库
     git push origin master
# 查看远程仓库信息
    git remote show
# 远程仓库的删除和重命名
在新版 Git 中可以用 git remote rename 命令修改某个远程仓库的简短名称，比如想把 pb 改成 paul，可以这么运行：
```bash
git remote rename pb paul
git remote
#origin
#paul
```
注意，对远程仓库的重命名，也会使对应的分支名称发生变化，原来的 pb/master 分支现在成了 paul/master。

碰到远端仓库服务器迁移，或者原来的克隆镜像不再使用，又或者某个参与者不再贡献代码，那么需要移除对应的远端仓库，可以运行 git remote rm 命令：
```bash
git remote rm paul
git remote
#origin
```