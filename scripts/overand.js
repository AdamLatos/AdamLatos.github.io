var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();
ctx.fillStyle = "#AAAAAA";
ctx.fillRect(0,0,800,600);
ctx.closePath();

ctx.beginPath();
ctx.rect(20, 40, 50, 50);
ctx.fillStyle = "#FF0000";
ctx.fill();
ctx.closePath();

ctx.strokeStyle = "FFFFFF";
ctx.moveTo(0,400);
ctx.lineTo(800,400);
ctx.stroke();

ctx.beginPath();
ctx.arc(400,200,300,0, 2*Math.PI, false);
ctx.stroke();

var grd = ctx.createRadialGradient(400,200,20, 400,200,300);
grd.addColorStop(0,"red");
grd.addColorStop(1,"gray");

ctx.fillStyle = "#550000";
ctx.fill();


ctx.beginPath();
ctx.arc(240, 160, 20, 0, Math.PI*2, false);
ctx.fillStyle = "green";
ctx.fill();
ctx.closePath();