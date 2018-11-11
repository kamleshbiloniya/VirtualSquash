var id,local_id=1;
var state=0;

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {

    if (this.readyState == 4 && this.status == 200) {
   		updatepos(this);
    }
  };
  if(local_id==2)
  xhttp.open("GET", "data1.xml?t="+Math.random(), true);
  if(local_id==1)
  xhttp.open("GET", "data2.xml?t="+Math.random(), true);
  	
  xhttp.send();
}


var x1=300,x2=800,y1=450,y2=450,z1=-200,z2=-200,xr1=0,xr2=0,yr1=0,yr2=0,zr1=0,zr2=0;

var xpos=300;
var ypos=900;
var zpos=-200;

var vx=0;
var vy=0;
var vz=0;
var ay=0;

var dt=0.01;
var e=0.9;


function updatepos(xml)
{
	var xmldoc = xml.responseXML;
	if(local_id==2)
	{		
		z1 = xmldoc.getElementsByTagName('z1')[0].childNodes[0].nodeValue;
		x1 = xmldoc.getElementsByTagName('x1')[0].childNodes[0].nodeValue;
		y1 = xmldoc.getElementsByTagName('y1')[0].childNodes[0].nodeValue;

		

		xr1 = xmldoc.getElementsByTagName('xr1')[0].childNodes[0].nodeValue;
		yr1 = xmldoc.getElementsByTagName('yr1')[0].childNodes[0].nodeValue;
		zr1 = xmldoc.getElementsByTagName('zr1')[0].childNodes[0].nodeValue;

		xpos = xmldoc.getElementsByTagName('xpos')[0].childNodes[0].nodeValue;
		ypos = xmldoc.getElementsByTagName('ypos')[0].childNodes[0].nodeValue;
		zpos = xmldoc.getElementsByTagName('zpos')[0].childNodes[0].nodeValue;

		document.getElementById('ball').style.transform = 'translateX('+xpos+'px) translateY('+ypos+'px) translateZ('+zpos+'px)';
		document.getElementById('ball_sh').style.transform = 'translateX('+xpos+'px) translateY(900px) translateZ('+zpos+'px)';

	}
	if(local_id==1)
	{
		z2 = xmldoc.getElementsByTagName('z2')[0].childNodes[0].nodeValue;
		x2 = xmldoc.getElementsByTagName('x2')[0].childNodes[0].nodeValue;
		y2 = xmldoc.getElementsByTagName('y2')[0].childNodes[0].nodeValue;



		xr2 = xmldoc.getElementsByTagName('xr2')[0].childNodes[0].nodeValue;
		yr2 = xmldoc.getElementsByTagName('yr2')[0].childNodes[0].nodeValue;
		zr2 = xmldoc.getElementsByTagName('zr2')[0].childNodes[0].nodeValue;

		
	}
		document.getElementById('racket1_pos').style.transform = 'translateX(' + x1 +'px) translateY(' + y1 + 'px) translateZ(' + z1 + 'px)';

		document.getElementById('racket1').style.transform = 'rotateX('+xr1+'deg) rotateY('+yr1+'deg) rotateZ('+zr1+'deg)';

		var sy1 =1730+z1/1;
		var sx1 =x1/1;
		document.getElementById('racket1_spos').style.transform = 'translateY('+sy1+'px) translateX('+sx1+'px)';

		var xd1 =  0 - 80 + xr1/1;
		document.getElementById('racket1_shadow').style.transform = 'rotateX('+xd1+'deg)';


		document.getElementById('racket2_pos').style.transform = 'translateX(' + x2 +'px) translateY(' + y2 + 'px) translateZ(' + z2 + 'px)';
		document.getElementById('racket2').style.transform = 'rotateX('+xr2+'deg) rotateY('+yr2+'deg) rotateZ('+zr2+'deg)';

		var sy2 =1730+z2/1;
		var sx2 =x2/1;
		document.getElementById('racket2_spos').style.transform = 'translateY('+sy2+'px) translateX('+sx2+'px)';

		var xd2 =  xr2/1 -80; 
		document.getElementById('racket2_shadow').style.transform = 'rotateX('+xd2+'deg) rotateY('+zr2+'deg)';
}



var y=setInterval(loadDoc,40);	


function ball()
{
	xpos = xpos + (vx*dt);
	ypos = ypos + (vy*dt);
	zpos = zpos + (vz*dt);

	if(ypos<900)
	{
	vy = vy + ay*dt;
	}

	if(xpos<0)
	{
		xpos=0;
		vx=-e*vx;
	}
	if(xpos>1280)
	{
		xpos=1280;
		vx=-e*vx;
	}
	if(ypos>900)
	{
		vz=0.95*vz;
		ypos=900;
		vy=-e*vy;
	}
	if(zpos<-2080)
	{
		zpos=-2080;
		vz=-e*vz;
	}

	if(zpos>10)
	{
		zpos=10;
		vz=0;
		vy=0;
		state=0;
		xpos=300;
		ypos=900;
		zpos=-300;

		vx=0;
		vy=0;
		vz=0;
		ay=0;

	}
	var nnn = collide();
	if( nnn )
	{
		collision(nnn);
	}

	document.getElementById('ball').style.transform = 'translateX('+xpos+'px) translateY('+ypos+'px) translateZ('+zpos+'px)';
	document.getElementById('ball_sh').style.transform = 'translateX('+xpos+'px) translateY(900px) translateZ('+zpos+'px)';

}

if(local_id==1)
var z=setInterval(ball,10);

document.getElementById('test').innerHTML = 'working';


function collide()
{
	document.getElementById('test').innerHTML = 'working';
				
	if(x1/1 -10 <xpos && xpos<70+x1/1)
	{
			
					
		if(y1/1 - 10 <ypos && ypos<150+y1/1 )
		{
			document.getElementById('test').innerHTML = 'colworkingy';
					
			
			if(-350<zpos && zpos<-300)
			{
				document.getElementById('test').innerHTML = 'colworkingz';
				return 1;
			}
		}
	}

	if(x2/1 -10 <xpos && xpos<70+x2/1)
	{
			
					
		if(y2/1 - 10 <ypos && ypos<150+y2/1 )
		{
			document.getElementById('test').innerHTML = 'colworkingy';
					
			
			if(-350<zpos && zpos<-300)
			{
				document.getElementById('test').innerHTML = 'colworkingz';
				return 2;
			}
		}
	}


		if(-500<zpos && zpos<-300)
		{
			//	document.getElementById('test').innerHTML = 'colworki';
				
		}

	
}


var map = {65:false, 83:false, 87:false, 68:false, 74:false, 75:false, 76:false, 78:false};

onkeydown = onkeyup = function(event){

 	map[event.which] = event.type == 'keydown';
    

    
}

function collision(bat){

	vz = -1500;
	vy = -600;
	if(bat==1)
	{
	if(yr1==40)
		vx=-300;
	else if(yr1==-40)
		vx=300;
	else
		vx=0;
	}

	if(bat==2)
	{
	if(yr2==40)
		vx=-300;
	else if(yr2==-40)
		vx=300;
	else
		vx=0;
	}
}


function fun(){
	
	if(map[78])
	{
		xpos=300;
		ypos=650;
		zpos=-200;

		vx=0;
		vy=-600;
		vz=-1500;
		ay=1000;
	}

	if(local_id==1)
	{
		if(map[65] && x1>0)
			x1=x1-18;
		if(map[68] && x1<1200)
			x1=x1+18;
		if(map[87] && y1>0)
			y1=y1-18;
		if(map[83] && y1<600)
			y1=y1+18;

		if(map[75] || map[74] || map[76])
			xr1=45;
		else
			xr1=0;

		if(map[74])
		{
			yr1=40;
			zr1=-20;
		}
		else if(map[76]&&!map[74])
		{
			yr1=-40;
			zr1=20;
		}

		else
		{
			yr1=0;
			zr1=0;
		}



	}
	if(local_id==2)
	{
		if(map[65] && x2>0)
			x2=x2-18;
		if(map[68] && x2<1200)
			x2=x2+18;
		if(map[87] && y2>0)
			y2=y2-18;
		if(map[83] && y2<600)
			y2=y2+18;

		if(map[75] || map[74] || map[76])
			xr2=45;
		else
			xr2=0;

		if(map[74])
		{
			yr2=40;
			zr2=-20;
		}
		else if(map[76]&&!map[74])
		{
			yr2=-40;
			zr2=20;
		}

		else
		{
			yr2=0;
			zr2=0;
		}


	}

}
var bb = setInterval(fun,40);

function sendinfo(){

	var xtp = new XMLHttpRequest();
	xtp.onreadystatechange = function(){
		if(this.readyState==4 && this.status==200)
		{
			document.getElementById('test1').innerHTML = this.responseText;
		}
	}
	if(local_id==1)
	xtp.open("GET", "script.php?local_id=1&x="+x1+"&y="+y1+"&z="+z1+"&xr="+xr1+"&yr="+yr1+"&zr="+zr1+"&xpos="+xpos+"&ypos="+ypos+"&zpos="+zpos ,true);
	if(local_id==2)
	xtp.open("GET", "script.php?local_id=2&x="+x2+"&y="+y2+"&z="+z2+"&xr="+xr2+"&yr="+yr2+"&zr="+zr2, true);	
	xtp.send();
}


var m = setInterval(sendinfo, 20);
sendinfo();


function change_local_id()
{
	local_id=2;
	clearInterval(z);
	x2=700;
	y2=450;
	z2=-200;
}

/*

BALL COLLIDES WITH BAT 1 if xpos, ypos and zpos are near to this ::: 

	xpos = x1/1 + 20+ 200*Math.sin(zr1*Math.PI/180);
	ypos = y1/1 + 220 - 200*Math.cos(zr1*Math.PI/180)*Math.cos(xr1*Math.PI/180);
	zpos = z1/1 - 200*Math.cos(zr1*Math.PI/180)*Math.sin(xr1*Math.PI/180) ;



on pressing n
(if game state is 0)

xpos=300;
ypos=650;
zpos=-200;

vx=0;
vy=-600;
vz=-1500;
ay=1000;

var dt=0.01;
var e=0.9;


*/