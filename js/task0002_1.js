// 第一阶段
$.click("#btn1",getHobby);
function getHobby() {
    var str = $("#txt1").value;
    var reg = /,/g;
    if (reg.test(str)){
        var arr = str.split(',');
        for (var i = 0;i < arr.length;i++){
            arr[i].replace(/[\s]/g,'');
        }
        var uniqArr = uniqArray01(arr); //去重
        var cont = $("#hobby1");
        for (var i = 0;i < uniqArr.length;i++){
            if (uniqArr[i] == ''){
                uniqArr.splice(i,1);
                i--;
            }
        }
        var pStr = '<p>'+ uniqArr +'</p>';
        cont.innerHTML = pStr;
    } else {
        alert("请用半角逗号将爱好分隔开");
    }
}

// 第二阶段
$.click("#btn2", getHobby2);
function getHobby2() {
    var sTr = $("#txt2").value;
    var sep = /[,\s;\n\t]+/g
    var replaceStr = sTr.replace(sep, " ");
    var arr = replaceStr.split(" ");
    var uniqArr = uniqArray01(arr);
    var oP = document.createElement("p");
    $("#div2").appendChild(oP);
    for (var i = 0; i<uniqArr.length; i++) {
        if (uniqArr[i].match(/\s+/g)) {
            uniqArr.splice(i,1);
            i--;
        }
    }
    oP.innerHTML = uniqArr;
}

// 第三阶段
$.click("#btn3", getHobby3);
var oTip = document.createElement('p');
$("#div3").insertBefore(oTip,$("#btn3"));
function getHobby3() {
    $("#check-box").innerHTML = "";
    var sTr = $("#txt3").value;

    if (sTr != "") {
        var sep = /[,\s;\n\t]+/g
        //先将字符转换成以空格为间隔的形式
        var replaceStr = sTr.replace(sep, " ");
        var arr = replaceStr.split(" ");
        if (arr.length >= 0 && arr.length <= 10) {
            oTip.innerHTML = "";
            var uniqArr = uniqArray01(arr);
            for (var i = 0; i<uniqArr.length; i++) {
                //将去重得到的空数组的空值去掉
                if (uniqArr[i].match(/\s+/g)) {
                    uniqArr.splice(i,1);
                    i--;
                }
            }
            //循环生成chenkbox
            for (var j in uniqArr) {
                var oLabel = document.createElement("label");
                var sCheckName = document.createTextNode(uniqArr[j]);
                oLabel.appendChild(sCheckName);
                $("#check-box").appendChild(oLabel);
                var oInput = document.createElement("input");
                oInput.setAttribute("type", "checkbox");
                $("#check-box").appendChild(oInput);
                $("#check-box").appendChild(document.createElement("br"));
            }
        }else {
            oTip.innerHTML = "请输入小于等于10个兴趣";
        }
    }else {
        oTip.innerHTML = "请输入你的爱好";
    }
}