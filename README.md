>  本项目是基于vue2最新实战项目，vue2 +vue-router2 + es6 +webpack 高仿饿了么app,是适合新手进阶的绝佳教程。

###首先

***
>  * 喜欢的请点心，关注，star ,fork,这些是我坚持下去的动力
>  * demo地址 [demo](http://liangxiaojuan.github.io/elem/index#/goods) （请用chrome的手机模式预览）
>  *本项目地址[github地址](https://github.com/liangxiaojuan/elemei)
>  * 我的另外一个vue开源项目 [Meizi](https://github.com/liangxiaojuan/vue-Meizi) 用了vuex，和其他比较火的包，才刚刚上传，代码更加简单，设计更加简洁，注释更加多！喜欢vue的朋友赶紧去看看。
>  * 手机扫一扫


![1484297893.png](http://upload-images.jianshu.io/upload_images/4249223-decb94b45122f9de.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)



### 项目技术架构
***
*  vue-cli
*  vue
*  vue-resource
*  vue-router
*  vue-infinite-scroll
*  stylus
*  webpack

###上图
***
* 加入购物车动画

![11.gif](http://upload-images.jianshu.io/upload_images/4249223-8d462b93150db24e.gif?imageMogr2/auto-orient/strip)

* 弹出购物车 商品详情页

![2222.gif](http://upload-images.jianshu.io/upload_images/4249223-71b66b4249d868bd.gif?imageMogr2/auto-orient/strip)

* 分类切换 图片左右滑动

![3333.gif](http://upload-images.jianshu.io/upload_images/4249223-f0921b44740f6d4f.gif?imageMogr2/auto-orient/strip)

###安装
***
项目地址：（`git clone`）
```shell
git clone https://github.com/liangxiaojuan/eleme.git
```
通过`npm`安装本地服务第三方依赖模块(需要已安装[Node.js](https://nodejs.org/))

```
npm install
```
启动服务(http://localhost:8080)

```
npm run dev
```
发布代码

```
npm run build
```
### 安装注意
安装 vue-cli
```
npm install -g vue-cli
```
安装 vue-cli eslint
```
npm install -g eslint
```
安装依赖 friendly-errors-webpack-plugin
```
npm install friendly-errors-webpack-plugin --save-dev
```
###目录结构
***
<pre>
├── build              // 构建服务和webpack配置
├── config             // 项目不同环境的配置
├── dist               // 项目build目录
├── index.html         // 项目入口文件
├── package.json       // 项目配置文件
├── src                // 生产目录
│   ├── assets         // 图片资源
│   ├── common          // 公共的css js 资源
│   ├── components     // 各种组件
│   ├── App.vue         // 主页面 
│   └── main.js        // Webpack 预编译入口
</pre>

###实现的功能
***
* 商品滚动 ，商品滚轮滚动
* 商品联动
* 加入购物车，移除购物车
* 显示评论 评论筛选
* 图片左右滑动
* 商品详情  父子组件的通信
* 等等

### 正在实现的功能
***
* vuex
* 无限滚动
*  上拉刷新
* 更多更精彩的内容

### 最后
***
* 我的另外一个vue开源项目 [Meizi](https://github.com/liangxiaojuan/vue-Meizi) 用了vuex，和其他比较火的包，才刚刚上传，代码更加简单，设计更加简洁，注释更加多！喜欢vue的朋友赶紧去看看。
* 如果喜欢一定要 star哈!!!（谢谢!!）
* 如果有意见和问题 请在 lssues提出，我会在线解答。
* 我年后要离职了 对我感兴趣的可以联系我 [简历](https://github.com/liangxiaojuan/resume)
