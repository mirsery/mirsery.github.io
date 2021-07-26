---
title: mac 改变lauchpad图标的大小
date: 2018-10-07 19:52:11
author: mirsery
tags: 
	- mac
categories:	
	- mac os	
excerpt: 'defaults write com.apple.dock springboard-rows -int 7...'	
---

# mac 改变lauchpad图标的大小
1、调整每一列显示图标数量，7 表示每一列显示7个，在我的电脑上，7个个人觉得比较不错

defaults write com.apple.dock springboard-rows -int 7

2、调整每一行显示图标数量，这里我用的是8

defaults write com.apple.dock springboard-columns -int 8

3、由于修改了每一页显示图标数量，可能需要重置Launchpad

defaults write com.apple.dock ResetLaunchPad -bool TRUE;killall Dock