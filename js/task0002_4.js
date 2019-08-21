var suggestData = ['a', 'abandon', 'ability', 'able', 'about', 'above', 'fiction', 'fierce', 'fight', 'test2', 'test3','boom','bob','baby','cinema','can','cross','day','dad','delightful','exam','exchange','gap','gentle','gas','high','height','img','jacket','kfc','kite','lemon','metro','nice','option','proto','que','rest','use','we','vise','x-ray','yellow','zone'];

// 给input加监听
var inputArea = $("input");
var ulArea = $("ul");

addInputListener();//监听input
clickLi(); //鼠标点击li
keydownLi(); //键盘事件

//未兼容IE9以下浏览器
function addInputListener() {
    inputArea.addEventListener("input", OnInput);
}

function OnInput(event) {
    var inputValue = event.target.value;
    handleInput(inputValue);
}

function handleInput(inputValue) {
    console.log(inputValue);
    var liString = "";
    var reg = new RegExp("^" + inputValue, "i"); //获取开头相同的字符串

    if (inputValue === "") {
        ulArea.style.display = "none";
    } else {
        for (var i = 0; i < suggestData.length; i++) {
            if (suggestData[i].match(reg)) {
                console.log(suggestData[i]);
                liString += "<li><span>" + inputValue + "</span>" + suggestData[i].substr(inputValue.length) + "</li>";
            }
        }
        ulArea.innerHTML = liString;
        ulArea.style.display = "block";
    }
}

function clickLi() {
    console.log("clickLi");
    delegateEvent(ulArea, "li", "mouseover", function() {
        addClass(this, "active");
    });
    delegateEvent(ulArea, "li", "mouseout", function() {
        removeClass(this, "active");
    });
    delegateEvent(ulArea, "li", "click", function() {
        inputArea.value = deleteSpan(this.innerHTML);
        ulArea.style.display = "none";
    });
}

function keydownLi() {
    addEvent(inputArea, "keydown", function(event) {
        var highLightLi = $(".active");
        // console.log(highLightLi);
        //down键
        if (event.keyCode == 40) {
            if (highLightLi) {
                var nextLi = highLightLi.nextSibling;
                if (nextLi) {
                    removeClass(highLightLi, "active");
                    addClass(nextLi, "active");
                }
            } else {
                addClass($("li"), "active");
            }
        }
        //up键
        if (event.keyCode == 38) {
            if (highLightLi) {
                var preLi = highLightLi.previousSibling;
                if (preLi) {
                    removeClass(highLightLi, "active");
                    addClass(preLi, "active");
                }
            } else {
                addClass($("li"), "active");
            }
        }
        //enter键
        if (event.keyCode == 13) {
            if (highLightLi) {
                inputArea.value = deleteSpan(highLightLi.innerHTML);
                ulArea.style.display = "none";
            }
        }
    });
}

function deleteSpan(string) {
    var reg = /^<span>(\w+)<\/span>(\w+)$/;
    var stringArr = string.match(reg);
    console.log(stringArr);
    console.log(stringArr[1]);
    console.log(stringArr[2]);
    return stringArr[1] + stringArr[2];
}