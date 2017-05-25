$(document).ready(function () {
	Main();
});

var Board = function(width,height){
	this.width=width;
	this.height=height;
	this.playing=false;
	this.game_over=false;
	this.bars=[];
	this.ball=null;
};
	
Board.prototype={
	get elements(){
		var elementos= this.bars.map(function(bar){return bar;});
		elementos.push(this.ball);
		return elementos;
	}
};

var Ball = function (x,y,radius,board){
	this.x=x;
	this.y=y;
	this.radius=radius;
	this.speedx=3;
	this.speedy=0;
	this.speed=3;
	this.direction=1;
	this.bounce_angle=0;
	this.max_bounce_angle=Math.PI/12;
	this.board=board;
	board.ball= this;
	this.kind="circle";

};
Ball.prototype={
	get height(){
		return this.radius * 2;
	},
	get width(){
		return this.radius * 2;
	},
	move: function(){
		this.x+=(this.speedx * this.direction);
		this.y+=(this.speedy);
	},
	collition: function(bar){
		var relative_intersect_y= (bar.y+(bar.height/2))-this.y;
		var normalized_intersect_y=relative_intersect_y/(bar.height/2);
		this.bounce_angle=normalized_intersect_y*this.max_bounce_angle;
		this.speedy=this.speed * -Math.sin(this.bounce_angle);
		this.speedx=this.speed * Math.cos(this.bounce_angle);
		if(this.x>(this.board.width/2)) this.direction=-1;
		else this.direction=1;
	}
};

var Bar = function (x,y,width,height,board) {
	this.x=x;
	this.y=y;
	this.width=width;
	this.height=height;
	this.board=board;
	this.board.bars.push(this);
	this.kind="rectangle";
	this.speed=10;
};
Bar.prototype={
	down: function () {
		this.y+= this.speed;
	},
	up: function () {
		this.y-= this.speed;
	},
	toString: function () {
		return "x: "+ this.x+" y: "+this.y;
	}
};



var BoardView = function(tagcanvas,board){
	this.canvas= tagcanvas;
	this.canvas.width=board.width;
	this.canvas.height=board.height;
	this.board=board;
	this.contexto=canvas.getContext("2d");

};

function draw(ctx,element){
	switch(element.kind){
		case "rectangle":
			ctx.fillRect(element.x,element.y,element.width,element.height);
			break;
		case "circle":
			ctx.beginPath();
			ctx.arc(element.x,element.y,element.radius,0,7);
			ctx.fill();
			ctx.closePath();
			break;
		default:
		break;
	}
}
function hit(a,b){
	var hit = false;
	if(b.x+b.width >= a.x && b.x<a.x+a.width){
		if(b.y+b.height >= a.y && b.y<a.y+a.height){
			hit=true;
		}
	}
	//collicion de a con b
	if(b.x <= a.x && b.x + b.width >= a.x+a.width){
		if(b.y <= a.y && b.y + b.height >= a.y + a.height){
			hit=true;
		}
	}
	//collicion de b con a
	if(a.x <= b.x && a.x + a.width >= b.x+b.width){
		if(a.y <= b.y && a.y + a.height >= b.y + b.height){
			hit=true;
		}
	}
	return hit;
}

BoardView.prototype={
	draw: function () {
		for (var i = this.board.elements.length - 1; i >= 0; i--) {
			
			var el = this.board.elements[i];
			
			draw(this.contexto,el);
		}
	},
	clean: function (){
		this.contexto.clearRect(0,0,this.board.width,this.board.height);
	},
	play: function () {
		if(this.board.playing){
			this.clean();
			this.draw();
			this.collitions();
			this.board.ball.move();
		}
	},
	collitions: function(){
		for (var i = this.board.bars.length - 1; i >= 0; i--) {
			var bar = this.board.bars[i];
			if(hit(bar,this.board.ball)){
				this.board.ball.collition(bar);
			}
		}
	}
};

var board;
var bar;
var bar2;
var ball;
var canvas;
var board_view;

function Main() {
	board = new Board(800,400);
	bar = new Bar(20, 100, 40, 100, board);
	bar2 = new Bar(735, 100, 40, 100, board);
	ball = new Ball(350,100,10,board);
	canvas = document.getElementById("canvas");
	board_view = new BoardView(canvas, board);


	window.addEventListener("keydown",function (Evento) {
		
		if(Evento.keyCode==38){
			Evento.preventDefault();
			bar.up();
		}
		else if(Evento.keyCode==40){
			Evento.preventDefault();
			bar.down();
		}
		else if(Evento.keyCode==87){
			Evento.preventDefault();
			bar2.up();
		}
		else if(Evento.keyCode==83){
			Evento.preventDefault();
			bar2.down();
		}
		else if(Evento.keyCode==32){
			Evento.preventDefault();
			board.playing=!board.playing;
		}
	});
	board_view.draw();
	window.requestAnimationFrame(Animate);
}

function Animate(){
	board_view.play();
	window.requestAnimationFrame(Animate);
}