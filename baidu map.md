百度地图异步加载

API 地址 "http://api.map.baidu.com/api?v=2.0&ak=您的密钥";

我们需要异步加载, 例如 Vue 组件
this.$el.append()

看到警告
'Document': It isn't possible to write into a document from an asynchronously-loaded external script unless it is explicitly opened.

查看源码
(function(){ window.BMap_loadScriptTime = (new Date).getTime(); document.write('<script type="text/javascript" src="http://api.map.baidu.com/getscript?v=3.0&ak=EC0bfdef7be7f8ba6a2c4dbd8d758ca5&services=&t=20200415105918"></script>');})();

异步加载外部脚本不能使用 document.write

解决方法
"http://api.map.baidu.com/api?v=2.0&ak=您的密钥&callback=initialize";

思考异步脚本(外部内部) document.write 


参考
(Baidu API guide)[https://lbsyun.baidu.com/index.php?title=jspopular3.0/guide/usage]
(MDN script)[https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLScriptElement]