window.onload=begin;
function begin(){
	var slide=document.querySelector(".slide");
	var slideWidth=parseInt(getComputedStyle(slide).width);
	var prev=document.getElementById("prev");
	var next=document.getElementById("next");
	var imgSrc=document.getElementById("imgSrc").getAttribute("src");
	var imgBox=document.getElementsByClassName("imgBox")[0];
	var btn=document.getElementsByClassName("btn")[0];
	var imgCon=document.getElementById("imgCon");
	var arc=document.querySelector(".arc");
	var slideDiv=slide.querySelector("div");
	var timer;
	var texta=imgCon.querySelector(".text");
	var textArr=['《天才捕手》定档3.10 科林·费斯调教裘德·洛','《西游记》的N种可能','《爱乐之城》 - 北京147家影院上映1122场','《极限特工：终极回归》 - 北京152家影院上映1623场','《非凡任务》曝预告海报 黄轩变身硬汉大秀肌肉'];
	imgCon.onmousemove=function(){
		btn.style.display="block";				
	}
	imgCon.onmouseout=function(){
		btn.style.display="none";
	}
	var arcSpan=document.getElementsByClassName("arc")[0].children;	
	for (var i = 0; i < arcSpan.length; i++) {	
	    arcSpan[i].index=i;
		arcSpan[i].onmouseover=function(){	
			clearTimeout(timer);
			slide.style.display="block";
			slide.style.left=this.offsetLeft+this.offsetWidth/2+arc.offsetLeft-slideWidth/2+"px";			
			slideDiv.style.left=-(this.index*slideWidth)+"px";
		}
		arcSpan[i].onmouseout=function(){
			timer=setTimeout(function(){
				slide.style.display="none";
			},200)//每次移动后后台都会有一个set在等待执行，所以要clear			
		}
		arcSpan[i].onclick=function(){			
			if(this.index==ln){
				return false;
			}
			cn=this.index;
			if(this.index>ln){				
				creatDom(-h);					
			}
			else{
				creatDom(h);
			}			
		}
	}
	var n=0;
	var col=15;
	var w=imgBox.offsetWidth/15;
	var h=imgBox.offsetHeight;
	var cn=0;
	var ln=0;
	next.onclick=function(){
		
		cn++;
		if (cn>4) {
			cn=0;
		}
		creatDom(-h);		
	}
	prev.onclick=function(){
		cn--;		
		if(cn==-1){
			cn=4;
		}
		creatDom(h);
	}
	function creatDom(t){
		var str="";	
		//imgBox.style.backgroundImage="url(img/0.jpg)";
		for (var i = 0; i < col; i++) {
			var l=i*w;
			 pl=imgBox.offsetWidth-l;
			//str+='<div style="width:'+w+'px;height:'+h+'px;left:'+l+'px;top:'+'px;background:url(images/'+0+'.jpg) -'+l+'px;"></div>
		    str+="<div style='width:"+w+"px;height:"+h+"px;top:"+t+"px;left:"+l+"px;opacity:0;background:url(img/"+cn+".jpg) -"+l+"px'></div>"		    
		}
		
		imgBox.innerHTML+=str;
		move();
	}
	function move(){
		arcSpan[ln].className="";
		arcSpan[cn].className="active";
		texta.style.bottom="-40px";
		var divs=imgBox.getElementsByTagName("div");
		for (var i = 0; i < divs.length; i++) {
			(function(i){
				setTimeout(function(){
					var img=imgBox.querySelector("img");
					img.style.opacity=0.6;
					divs[i].style.top="0";
					divs[i].style.opacity=1;
				},i*50);
			})(i);
			
		}
		divs[divs.length-1].addEventListener("transitionend",function(){
				ln=cn;
			imgBox.innerHTML="<img src=img/"+cn+".jpg>";	
			texta.style.bottom=0;
			texta.innerHTML=textArr[cn];
		})			
	}		
}
