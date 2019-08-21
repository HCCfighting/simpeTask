// 判断arr是否为一个数组，返回一个bool值
function  isArray(arr) {
/*   instanceof 用于判断一个变量是否为某个对象的实例 object instanceof constructor;
     因为typeof检查对象类型有局限性,只能区分基本类型"number","string","undefined","boolean","object","function"
     所以在实际应用中，它基本只用于检测一个对象是否已经定义或是否已赋值。typeof(x) !== 'undefined';
     Object.prototype.toString.call()能精确判断对象的类型，
     返回一种标准格式字符串'[object Number]','[object String]','[object Undefined]'...
     return(arr instanceof Array);此方法不建议使用，因为判断Object也返回true*/
    return(Object.prototype.toString.call(arr) === '[object Array]');
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return(Object.prototype.toString.call(fn) === '[object Function]');
}

// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
/*   通常情况下，可以使用JSON.parse()与JSON.stringify()来实现对象的深拷贝，JSON.parse(JSON.stringify(obj));
     但是这种方法只适用于纯数据json对象的深拷贝，因为它会忽略值为function和undefined的字段，对date类型的支持
     也不友好，而且它只能克隆原始对象自身的值，不能克隆它继承的值。*/
    var newObj = src;
    if (src instanceof Date){
        return new Date(src.getDate());
    }
    if (src instanceof Array){
        newObj = [];
        for (var i in src){
            newObj[key] = cloneObject(src[key]);
        }
        return newObj;
    }
    if (src instanceof Object){
        newObj = {};
        for (var i in src){
            if (src.hasOwnProperty(key)){ //不考虑继承属性
                newObj[key] = cloneObject(src[key]);
            }
        }
        return newObj;
    }
    return newObj;
}

// 测试用例：
/*var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a); //2
console.log(abObj.b.b1[0]);  //"Hello"
console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"*/

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
/*uniqArray01:不借助任何方法，最初级的写法*/
function uniqArray01(arr) {
    for (var i= 0;i<arr.length-1;i++){
        for (var j = i+1;j<arr.length;j++){
            if (arr[i] == arr[j]){
                arr.splice(j,1);
                j --;
            }
        }
    }
    return arr;
}
/*uniqArray02:若不考虑兼容性，用indexof()方法*/
function uniqArray02(arr) {
    var res = [];
    for (var i=0;i<arr.length;i++){
        var obj = arr[i];
        if (res.indexOf(obj) == -1){
            res.push(obj);
        }
    }
    return res;
}
/*uniqArray03：利用ES5数组里的filter(callback),它使用指定的函数测试所有元素，并创建一个包含通过测试的元素
的新数组。callback被调用时传入三个参数：元素的值、元素的索引、被遍历的数组。filter不会改变原数组。*/
function uniqArray03(arr) {
    var res = arr.filter(function (item,index,array) {
        return array.indexOf(item) === index;
    });
    return res;
}
/*uniqArray04：hash法*/
function uniqArray04(arr) {
    var obj = {};
    var res = [];
    for (var i =0;i < arr.length;i++){
        var key = arr[i];
        if (!obj[key]){
            res.push(key);
            obj[key] = true;
        }
    }
    return res;
}
/*uniqArray05：ES6的Set和Array.from方法
Array.from()方法就是将一个类数组对象或者可遍历对象转换成一个真正的数组
set对象允许存储任何类型的唯一值,无论是原始值或者是对象引用*/
function uniqArray05(arr) {
    return Array.from(new Set(arr));
}
// 使用示例
/*
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray05(a);
console.log(b); // [1, 3, 5, 7]*/

// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    var i,j;
    for (i = 0;i < str.length;i++){ //从头遍历
        if (str.charAt(i) !== "" && str.charAt(i) !== "\t") { //当不为空时
            break; //跳出循环
        }
    }
    for (j = str.length - 1;j >= 0;j--) { //从尾遍历
        if (str.charAt(j) !== "" && str.charAt(j) !== "\t") {
            break;
        }
    }
    return str.slice(i,j+1); //返回中间字符串
} //未能实现，前面的空格没有去除，不知道原因

// 真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    return str.replace(/^\s+|\s+$/g,'');
//   匹配开头和结尾的空白字符，并全局匹配
}

// 使用示例
/*
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'*/

// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
// 其中fn函数可以接受两个参数：item和index
function each(arr, fn) {
    for (var i = 0;i < arr.length;i++){
        fn(arr[i],i);
    }
}

// 使用示例1
/*var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html*/
// 使用示例2
/*
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html*/

// 获取一个对象里面第一层元素的数量，返回一个整数
/*
* Object的hasOwnProperty()方法返回一个布尔值，判断对象是否包含特定的自身（非继承）属性
* */
function getObjectLength(obj) {
    var len = 0;
    for (var i in obj){
        if (obj.hasOwnProperty(i)){
            len ++;
        }
    }
    return len;
}
// 使用示例
/*var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3*/

// 判断是否为邮箱地址
function isEmail(emailStr) {
    var regEx = /^[\w]+([-.][a-z\d]+)*@([a-z\d]+[-.])+[a-z\d]{2,4}$/i;
    console.log(regEx.test(emailStr));
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var regEx = /^(13[0-9]|14[57]|15[012356789]|17[678]|18[0-9])[\d]{8}$/;
    console.log(regEx.test(phone));
}

// 为element增加一个样式名为newClassName的新样式
/*
* 要注意检查元素自身是否已经有class
* */
function addClass(element, newClassName) {
    var oldClassName = element.className; //获取原有样式
    if (oldClassName === ''){
        element.className = newClassName;
    } else{
        element.className = oldClassName + ' ' + newClassName;
    }
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var originClass = element.className; //获取原有样式
    element.className = trim(originClass.replace(oldClassName,''));
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
/*
* getBoundingClientRect用于获取某个元素相对于视窗的位置集合，集合中有top，right，bottom，left等属性。
* document.body返回html dom中的body节点，即<body>
* document.documentElement返回html dom中的root节点，即<html>
* */
function getPosition(element) {
    var pos = {};
    pos.x = element.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft,document.body.scrollLeft);
    pos.y = element.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop,document.body.scrollTop);
}

// 实现一个简单的JQuery
function $(selector) {
    if(!selector){
        return null;
    }
    var str = trim(selector);
    if (str.search(/\s+/g) == -1){
        var firstEle = str.charAt(0);
        var reg = /^\[|\]$/g; //开头结尾符号[]
        switch(firstEle){
            case "#":
                var newStr01 = str.replace(firstEle,"");
                return document.getElementById(newStr01);
            break;
            case ".":
                var newStr02 = str.replace(firstEle,"");
                return document.getElementsByClassName(newStr02)[0];
            break;
            case "[":
                var elem = document.getElementsByTagName("*");
                if (str.search(/=/g) == -1){ //无属性值的情况
                    var newStr03 = str.replace(reg,"");
                    var arrT01 = [];
                    for (var i = 0;i<elem.length;i++){
                        if (elem[i].attributes.length > 0){
                            for (var j = 0;j<elem.length;j++) {
                                if (elem[i].attributes[j].name == newStr03){
                                    arrT01.push(elem[i]);
                                    break;
                                }
                            }
                        } 
                    } 
                    return arrT01;
                } else { //有属性值的情况
                    var newStr04 = str.replace(reg,"");
                    var arrStr = newStr04.split("=");
                    var attrName = arrStr[0];
                    var attrValue = arrStr[1];
                    var arrT02 = [];
                    for (var i = 0;i<elem.length;i++){
                        if (elem[i].attributes.length > 0){
                            for (var j = 0;j<elem[i].attributes.length;j++){
                                if (elem[i].attributes[j].name == attrName){
                                    if (elem[i].attributes[j].value == attrValue){
                                        arrT02.push(elem[i]);
                                        break;
                                    }
                                }
                            }
                        }
                    }
                    return arrT02;
                }
            break;

            default:
                return document.getElementsByTagName(str)[0];
        }
    } else{
        var partArr = str.split(" ");
        var reg = /^\[|\]$/g;
        var sParent = partArr[0].replace(reg,'');
        var sSon = partArr[1].replace(reg,'');
        var oParent = $(sParent);
        if (partArr[1].charAt(0) == "."){ // class的情况
            var sStr = sSon.replace('.','');
            return oParent.getElementsByClassName(sStr);
        }else { //tag的情况
            return oParent.getElementsByTagName(sSon)[0];
        }
    }
}

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(element.addEventListener){
        element.addEventListener(event,listener,false); //DOM2.0
    }else if(element.attachEvent){
        element.attachEvent("on" + event,listener); //IE5+
    }else {
        element["on" + event] = listener; //DOM 0
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListener){
        element.removeEventListener(event,listener,false);
    } else if (element.detachEvent){
        element.detachEvent("on" + event,listener);
    }  else {
        element["on" + event] = null;
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element,'click',listener);
}

// 实现对于按Enter键时的事件绑定
/*
* Enter键的keyCode是13
* */
function addEnterEvent(element, listener) {
    addEvent(element,'keydown',function (e) {
        var event = e || window.event;
        var keyCode = event.keyCode;
        if (keyCode === 13){
            listener();
        }
    })
}

// 接下来我们把上面几个函数和$做一下结合，把他们变成$对象的一些方法
$.on = addEvent;
$.un = removeEvent;
$.click = addClickEvent;
$.enter = addEnterEvent;

// 接下来考虑这样一个场景，我们需要对一个列表里所有的`<li>`增加点击事件的监听
// 事件代理
function delegateEvent(element, tag, eventName, listener) {
    addEvent(element,eventName,function (e) {
        var event = e || window.event;
        var target = event.target || event.srcElement;
        if (target.tagName.toLowerCase() == tag){
            listener.call(target,event);
        }
    })
}

$.delegate = delegateEvent;

// 估计有同学已经开始吐槽了，函数里面一堆$看着晕啊，那么接下来把我们的事件函数做如下封装改变：
$.on = function(selector, event, listener) {
    addEvent($(selector), event, listener);
};

$.click = function(selector, listener) {
    addClickEvent($(selector), listener);
};

$.un = function(selector, event, listener) {
    removeEvent($(selector), event, listener);
};

$.delegate = function(selector, tag, event, listener) {
    delegateEvent($(selector), tag, event, listener);
};


// 判断是否为IE浏览器，返回-1或者版本号
/*
* js的全局对象window的子属性navigator.userAgent，包含了浏览器的相关信息，包括浏览器内核
* navigator.userAgent这个值返回的是字符串，可以通过indexOf方法或正则匹配来验证关键字符串
* 而ie11和edge的userAgent是和ie8,9,10差别比较大，所以在写js时需要特别判断
* */
function isIE() {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    var isIE = userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1; //判断是否IE<11浏览器
    var isEdge = userAgent.indexOf("Edge") > -1 && !isIE; //判断是否IE的Edge浏览器
    var isIE11 = userAgent.indexOf("Trident") > -1 && userAgent.indexOf("rv:11.0") > -1; //判断是否IE11浏览器
    if(isIE) {
        var reIE = new RegExp("MSIE (\\d+\\.\\d+);");
        reIE.test(userAgent);
        var fIEVersion = parseFloat(RegExp["$1"]);
        if (fIEVersion > 6) {// IE版本：7,8,9,10
            return 'ie' + fIEVersion;
        } else { //IE版本<=6
            return 'ie6';
        }
    } else if(isEdge) {
        return 'edge';//edge
    } else if(isIE11) {
        return 'ie11'; //IE11
    } else {
        return '-1';//不是ie浏览器
    }
}

// 设置cookie
/*
* 1、每个cookie都是一个键/值对，键/值对用等号连接，并将该键/值对赋值给document.cookie即可。如：document.cookie="_uid=111";
* 2、如果是通过变量来保存值，则可以通过document.cookie="_uid="+uid;来设置
* */
function setCookie(cookieName, cookieValue, expiredays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + expiredays );
    document.cookie = cookieName + "=" + escape(cookieValue)+ ((expiredays==null) ? "" : "; expires="+exdate.toGMTString());
}

// 获取cookie值
function getCookie(cookieName) {
    if (document.cookie.length > 0) {
        var c_start = document.cookie.indexOf(cookieName + "=");
        if (c_start != -1) {
            c_start = c_start + cookieName.length + 1;
            var c_end = document.cookie.indexOf(";", c_start);
            if (c_end ==-1) {
                c_end = document.cookie.length;
            }
            return decodeURIComponent(document.cookie.substring(c_start, c_end));
        }
        return "";
    }
}

// 学习Ajax，并尝试自己封装一个Ajax方法
// options是一个对象，里面可以包括的参数为：
// - type: `post`或者`get`，可以有一个默认值
// - data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
// - onsuccess: 成功时的调用函数
// - onfail: 失败时的调用函数
function ajax(url, options) {
    //创建对象
    var xmlhttp;
    if (window.XMLHttpRequest){
        xmlhttp = new XMLHttpRequest();
    } else { //兼容IE5 IE6
        xmlhttp = new ActiveXObject('Microsoft.XMLHTTP');
    }

    //处理data,将对象序列化
    if (options.data){
        var dataArr = [];
        for (var item in options.data){
            dataArr.push(encodeURIComponent(item) + '=' + encodeURIComponent(options.data[item]));
        }
        var data = dataArr.join('&');
    }

    //处理type
    if (!options.type){
        options.type = 'GET';
    }
    options.type = options.type.toUpperCase();

    //发送请求
    if (options.type === 'GET'){
        var myURL = '';
        if (options.data){
            myURL = url + '?' + data;
        } else {
            myURL = url;
        }
        xmlhttp.open('GET',myURL,true);
        xmlhttp.send();
    } else if (options.type === 'POST'){
        xmlhttp.open('POST',url,true);
        xmlhttp.setRequestHeader('Content-type','application/x-www-form-urlencoded');
        xmlhttp.send(data);
    }

    //readyState
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4){
            if (xmlhttp.status === 200){
                if (options.onsuccess) {
                    options.onsuccess(xmlhttp.responseText,xmlhttp.responseXML);
                }
            }else {
                if (options.onfail){
                    options.onfail();
                }
            }
        }
    }

}

// 使用示例：
/*
ajax(
    'http://localhost:8080/server/ajaxtest',
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);*/
