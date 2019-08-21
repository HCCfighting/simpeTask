window.onload = function () {
    $.click("#timeBtn", clickListener);
    function clickListener() {
        var timer = null;
        var oTimeBox = $("#time");
        var sTr = oTimeBox.value;
        var arr = sTr.split("-");
        console.log(arr);
        //Date.parse()函数的返回值为Number类型，返回参数字符串所表示的日期与 1970 年 1 月 1 日午夜之间相差的毫秒数
        //参数规则：短日期可使用/日期分隔符，但是必须符合月/日/年的格式，例如7/20/96或6/15/2008
        var oInpuDay = Date.parse(arr[1] + "/" + arr[2] + "/" + arr[0]);
        var sMinutes = 60 * 1000;
        var sHours = sMinutes * 60;
        var sDays = sHours * 24;
        timer = setInterval(function () {
            var oD = new Date();
            //getTime()返回距 1970 年 1 月 1 日之间的毫秒数：
            var oCurDay = oD.getTime();
            console.log(oCurDay);
            var oDifferTime = oInpuDay - oCurDay; //时间差
            var leftDays = Math.floor(oDifferTime / sDays);
            var toDays = oDifferTime % sDays;
            var toHours = toDays % sHours;
            var toMinutes = toHours % sMinutes;
            //计算非整数时间
            var leftHours = Math.floor(toDays / sHours);
            var leftMinutes = Math.floor(toHours / sMinutes);
            var leftSeconds = Math.ceil(toMinutes / 1000);
            // console.log(leftSeconds);
            // console.log(1 % 2)
            $("#timeTips").innerHTML = "距离" + arr[0] + "年" +arr[1] + "月" + arr[2] + "日 还有" + leftDays + "天" + leftHours+ "小时" + leftMinutes+ "分钟" + leftSeconds+ "秒";
            if (oDifferTime == 0) {
                clearInterval(timer);
            }
        }, 1000)
    }
}