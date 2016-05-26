window.onload = function(){
	oDiv = document.querySelector('#oDiv');
	al = document.querySelector('.alert');
	aDiv = document.querySelector('#div1');
	grey = document.querySelector('.grey');
	btn = document.querySelector('#btn');
	btn1 = document.querySelector('#btn1');
	var aNum = 0;

	oDiv.ondragenter = function(){
		// alert(111);
		grey.style.display = "block";
		al.className = 'col-md-2 alert alert-warning';
		al.style.display = 'block';
		al.innerHTML = '可以释放了';
	};
	oDiv.ondragover = function(ev){
		ev.preventDefault();	
	};
	oDiv.ondragleave = function(){
		al.className = 'col-md-2 alert alert-success';
		al.innerHTML = '将文件拖拽到上区域';
		al.style.display = 'block';
	};
	oDiv.ondrop = function(ev){
		ev.preventDefault();
		var fs = ev.dataTransfer.files;
		var len = fs.length;
		if(len > 24 ) {
			al.style.display = 'block';
			al.className = 'col-md-2 alert alert-danger';
			al.innerHTML = '最多上传24张!';
			return ;
		}
		for(var i = 0;i < len;i++){
			if(fs[i].type.indexOf('image') != -1){

				var fd = new FileReader();
				fd.readAsDataURL(fs[i]);

				fd.onload = function(){
					// frag = document.createDocumentFragment();
					var oImg = document.createElement('img');
					oImg.src = this.result;
					// frag.appendChild(oImg);
					aDiv.appendChild(oImg);
					al.className = 'col-md-2 alert alert-info';
					al.innerHTML = '请点击上传';	
					btn.onclick = function(){
						var flag = true;
						al.className = 'col-md-2 alert alert-success';
						al.innerHTML = '上传'+ len+'张照片成功';
						//清除照片
						//code...
						var oImg = document.getElementsByTagName('img');
					
						for(var i = 0;i <= oImg.length-1;++i){
							oImg[i].parentNode.removeChild(oImg[i]);	

						}
						alert(oImg.length);	
						//点击上传2秒后，清除灰层。设置falg,防止未点击上传，也清除灰层
						setInterval(function(){
							if(flag)
							grey.style.display = 'none';
							flag = false;
						},2000);
						
					};
				};

			}else{
				al.style.display = 'block';
				al.className = 'col-md-2 alert alert-danger';
				al.innerHTML = '请上传图片!';
			}
		}

	};
	
	btn1.onclick = function(){
		grey.style.display = 'none';		
	};
};