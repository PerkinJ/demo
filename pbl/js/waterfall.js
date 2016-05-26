window.onload = function(){
	waterfall('main','pin');
	var dataInt = {"data":[{"src":'0.jpg'},{"src":'1.jpg'},{"src":'2.jpg'},{"src":'3.jpg'},{"src":'4.jpg'},{"src":'5.jpg'},{"src":'6.jpg'},{"src":'7.jpg'},{"src":'8.jpg'},{"src":'9.jpg'},{"src":'10.jpg'},{"src":'11.jpg'}
,{"src":'12.jpg'},{"src":'13.jpg'},{"src":'14.jpg'},{"src":'15.jpg'},{"src":'16.jpg'},{"src":'17.jpg'},{"src":'18.jpg'},{"src":'19.jpg'}]};
	window.onscroll = function(){
		if(checkScrollSlide){
			var oParent = document.getElementById('main');
			// 将数据库渲染到页面的尾部
			for(var i = 0;i < dataInt.data.length;i++){
				var oBox = document.createElement('div');
				oBox.className = 'pin';
				oParent.appendChild(oBox);
				var oPic = document.createElement('div');
				oPic.className = 'box';
				oBox.appendChild(oPic);
				var oImg = document.createElement('img');
				oImg.src = "images/" + dataInt.data[i].src;
				oPic.appendChild(oImg);
			}
			waterfall('main','pin');
		}
	};
};

function waterfall(parent,pin){
	var oParent = document.getElementById(parent);
	var aPin = getClassObj(oParent,pin);  	// 获取存储块框pin的数组aPin
	// console.log(aPin.length);
	var aPinW = aPin[0].offsetWidth;		// 获取一块框的宽度
	var num = Math.floor(document.documentElement.clientWidth/aPinW);	//每行中能容纳的pin个数
	// console.log(num);
	oParent.style.cssText = 'width:' + aPinW*num + 'px;margin:0 auto;'; //设置父级居中样式：定宽+自动水平外边距

	var hArr =[];		//用于存储每列中的所有块框相加的高度
	for(var i = 0,len = aPin.length;i < len;i++){
		var aPinH = aPin[i].offsetHeight;
		if(i < num) 	hArr[i] = aPinH;	//第一行中的num个块框pin 先添加进数组hArr
		else{
			var minH = Math.min.apply(null,hArr);	// 数组hArr中的最小值minH
			var minHIndex = getminHIndex(hArr,minH);
			aPin[i].style.position = 'absolute';
			aPin[i].style.top = minH + 'px';
			aPin[i].style.left = aPin[minHIndex].offsetLeft +'px';
			//数组 最小高元素的高 + 添加上的aPin[i]块框高
            hArr[minHIndex]+=aPin[i].offsetHeight;//更新添加了块框后的列高
		}
	}
}
/**
*通过父级和子元素的class类 获取该同类子元素的数组
*/
function getClassObj(parent,className){
	var obj = parent.getElementsByTagName('*');	//获取父级的所有子集
	var pins = [];
	for(var i = 0,len = obj.length;i < len;i++){
		if(obj[i].className == className){
			pins.push(obj[i]);
		}
	}
	return pins;
}

/**
*获取 pin高度 最小值的索引index
*/
function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}

/**
 * 检测是否具备了滚动条加载数据块条件
 */
function checkScrollSlide(){
	var oParent = document.getElementById('main');
	var oBoxs = getClassObj(oParent,'pin');
	var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight/2) + 'px';
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop; //混杂模式跟标准模式
	var height = document.documentElement.clientHeight || document.body.clientHeight;
	return (lastBoxH < scrollTop+height)?true:false;
}
