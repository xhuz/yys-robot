<!--
 * @Author: huz
 * @Date: 2019-10-02 19:04:19
 * @LastEditTime: 2019-10-04 01:00:25
 -->
# yys-robot
网易阴阳师自动挂机脚本，支持多开挂机业原火，御灵，双开组队挂机御魂

### 先决条件

1. 仅支持32位版本的nodejs
2. 需要先安装node-gyp和windows-build-tools
3. 需要将阴阳师桌面版分辨率调整为480*852
```
npm install -g windows-build-tools
npm install -g node-gyp
```

### 用法

克隆本仓库
```
git clone https://github.com/xhuz/yys-robot.git
```
安装依赖

```
npm install
```

编译ts

```
npm run compile
```

根据不同的需求双击single.bat / team.bat

### 其他
都用python写yys脚本，经过我自己研究发现js完全也可以实现，就有了本仓库  
多线程问题解决，尝试通过node的实验性功能worker_threads，实现多线程，发现不能共享TSPlug实例，pass  
最后通过node的child_process实现，但是会出现重复定义模块的问题（不知道是否是ts编译的问题），通过避免在子进程中import其他方法或模块import过的模块实现，这样子就出现了很多额外重复代码,有没有大神有其他办法可以实现，请和我联系  
仅供参考学习

