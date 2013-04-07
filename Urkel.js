
var Circle = function (x,y,r,vx,vy,bounce,color) {
	this.x = Math.floor(x);
	this.y = Math.floor(y);
	this.r = r;
	this.vx = vx;
	this.vy = vy;
	this.bounce = bounce;
	this.color = "#" + color;
	this.lineWidth = 1;
}

Circle.prototype.draw = function (context) {
	context.beginPath();
	context.lineWidth = this.lineWidth;
	context.strokeStyle = this.color;
	context.arc(this.x,this.y,this.r,0,2*Math.PI);
	context.closePath();
	context.stroke();
}

var CircleToCircleCollision = function (circle1,circle2) {
	var dx = circle1.x - circle2.x;
	var dy = circle1.y - circle2.y;
	var d = Math.sqrt((dx * dx) + (dy * dy));
	return d <= (circle1.r + circle2.r);
}

var update = function () {
	canvas.width = canvas.width;
	canvasContext.fillStyle = "#000000";
	canvasContext.fillRect(0,0,canvas.width,canvas.height);
	for (var i in particles) {
		var p = particles[i];
		p.x += p.vx;
		p.y += p.vy;

		if (p.x > (canvas.width - (p.r))) {
			p.x = canvas.width - p.r;
			p.vx *= p.bounce;
		} else if ((p.x - p.r) < 0) {
			p.x = p.r;
			p.vx *= p.bounce;
		}

		if (p.y > (canvas.height - p.r)) {
			p.y = canvas.height - p.r;
			p.vy *= p.bounce;
		} else if ((p.y - p.r) < 0) {
			p.y = p.r;
			p.vy *= p.bounce;
		}
		// check to see if a current particle collides
		for (var j in particles) {
			var t = particles[j];
			if (i != j) {
				if (CircleToCircleCollision(p,t)) {
					p.vx *= p.bounce;
					p.x += p.vx;

					t.vx *= t.bounce;
					t.x += t.vx;

					p.vy *= p.bounce;
					p.y += p.vy;

					t.vy *= t.bounce;
					t.y += t.vy;
				}
				// check twice because particles are prone to sticking to each other.
				if (CircleToCircleCollision(p,t)) {
					p.vx *= p.bounce;
					p.x += 1;

					t.vx *= t.bounce;
					t.x += t.vx;

					p.vy *= p.bounce;
					p.y += p.vy;

					t.vy *= t.bounce;
					t.y += t.vy;
				}
			}
		}
		p.draw(canvasContext);
	}
}

if (window.HTMLCanvasElement) {
	var canvas = document.getElementById("myCanvas");
	canvas.height = 600;
	canvas.width = 800;
	var canvasContext = canvas.getContext("2d");
	var particles = [];

	for (var i = 0; i <= 99; i++) {
		particles.push(
			new Circle(
				Math.random()*canvas.width,
				Math.random()*canvas.height,
				2,
				Math.random()*10-5,
				Math.random()*10-5,
				-1,
				"ffffff"
				//(Math.random()*0xffffff<<0).toString(16)
			)
		);
	}

	window.setInterval(update,10);
}