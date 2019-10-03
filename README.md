<!--
 * @Author: huz
 * @Date: 2019-10-02 19:04:19
 * @LastEditTime: 2019-10-04 01:00:25
 -->
# yys-robot
网易阴阳师自动挂机脚本

### 先决条件

仅支持32位版本的nodejs
需要先安装node-gyp和windows-build-tools
需要将阴阳师桌面版分辨率调整为480*852
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
