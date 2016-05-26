window.onload = function(){
	var oV = document.getElementById('v1');
	var btn = document.getElementsByTagName('button');
	var span = document.getElementsByTagName('span');
	var oPro = document.getElementById('oPro');
	var curTime = document.querySelector('.curTime');
	var totalTime = document.querySelector('.totalTime');
	var volBnt = document.getElementById('volBtn');
	var fullscreen = document.querySelector('.fullscreen');
	var pro = document.getElementById('pro');
	var ivolume = document.getElementById('ivolume');
	var timer = null;
	var vScale = 0.5;
	//播放/暂停
	btn[0].onclick = function(){
		if(oV.paused){
			oV.play();
			span[0].className = 'glyphicon glyphicon-pause';
			nowTime();
			timer = setInterval(nowTime,1000);
		}else{
			oV.pause();
			span[0].className = 'glyphicon glyphicon-play';
			clearInterval(timer);
		}
	};
	//是否静音
	volBtn.onclick = function(){
		var volSpan = document.getElementById('volSpan');
		if(oV.muted){
			oV.muted = false;
			volSpan.className = 'glyphicon glyphicon-volume-up';
		}else{
			oV.muted = true;
			volSpan.className = 'glyphicon glyphicon-volume-off';
			vScale = 0;
		}
	};
	//是否全屏
	fullscreen.onclick = function(){
		if(oV.webkitRequestFullScreen)
			oV.webkitRequestFullScreen();
		else if(oV.mozRequestFullScreen)
			oV.mozRequestFullScreen();
		else
			oV.requestFullscreen();
	};
	//总时间
	totalTime.innerHTML = changeTime(oV.duration);

	//当前时间
	function nowTime(ev){
		var scale = 0;
		curTime.innerHTML = changeTime(oV.currentTime);
		var scale = oV.currentTime/oV.duration;
		// 判断视频是否播放完
		if(oV.ended){
			span[0].className = 'glyphicon glyphicon-play';
			scale = 0;
		}
		oPro.style.width = scale*100 +'%';
		oPro.style.transition = 'width 1s linear 0s';
		oPro.style.webkitTransition = 'width 1s linear 0s';
		oPro.style.mozTransition = 'width 1s linear 0s';
	}

	//点击进度条更改播放进度
	pro.onclick = function(ev){
		ev = ev || window.event;
		var currentLeft = ev.offsetX;
		var scale = currentLeft/320;
		oPro.style.width = scale*100 +'%';
		
		oV.currentTime = scale * oV.duration;
		// console.log(scale);
		nowTime();
		oPro.style.transition = 'none';
		oPro.style.webkitTransition = 'none';
		oPro.style.mozTransition = 'none';
	};

	//点击进度条控制声音大小
	ivolume.onclick = function(ev){
		ev =ev || window.event;
		var volPro = document.getElementById('volPro');
		var currentLeft = ev.offsetX;
		vScale = currentLeft/55;
		if(vScale == 0){
			oV.muted = true;
			volSpan.className = 'glyphicon glyphicon-volume-off';
		}else{
			volSpan.className = 'glyphicon glyphicon-volume-up';
		}
		oV.volume = vScale;
		volPro.style.width = vScale*100 + '%';
	};

	//将时间转变格式
	function changeTime(iNum){
		iNum = parseInt(iNum);

		var iH = toZero(Math.floor(iNum/3600));
		var iM = toZero(Math.floor(iNum%3600/60));
		var iS = toZero(Math.floor(iNum%60));

		return iH+':'+iM+':'+iS;
	}
	//将小于9的数字自动补零
	function toZero(num){
		return num <= 9?'0' + num:num;
	}
};	