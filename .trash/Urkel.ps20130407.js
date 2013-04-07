
var Particle = function (x,y,r,vx,vy,bounce,color) {
	this.x = Math.floor(x);
	this.y = Math.floor(y);
	this.r = r;
	this.vx = vx;
	this.vy = vy;
	this.bounce = bounce;
	this.color = "#" + color;
	this.lineWidth = 1;
}

Particle.prototype.draw = function (context) {
	context.beginPath();
	context.lineWidth = this.lineWidth;
	context.strokeStyle = this.color;
	context.arc(this.x,this.y,this.r,0,2*Math.PI);
	context.closePath();
	context.stroke();
}

var Graviton = function (x,y,r,gravity,color) {
	this.x = x;
	this.y = y;
	this.r = r;
	if (gravity) {
		this.gravity = gravity;
	} else {
		this.gravity = this.r *= .5;
	}
	this.color = color;
	this.lineWidth = 1;
}

Graviton.prototype.draw = function (context) {
	context.beginPath();
	context.lineWidth = this.lineWidth;
	context.strokeStyle = this.color;
	context.arc(this.x,this.y,this.r,0,2*Math.PI);
	context.closePath();
	context.stroke();
}

var ParticleToParticleCollision = function (particle1,particle2) {
	var dx = particle1.x - particle2.x;
	var dy = particle1.y - particle2.y;
	var d = Math.sqrt((dx * dx) + (dy * dy));
	return d <= (particle1.r + particle2.r);
}

var ParticleToParticleFusion = function (particle1,particle2) {
	var dx = particle1.x - particle2.x;
	var dy = particle1.y - particle2.y;
	var d = Math.sqrt((dx * dx) + (dy * dy));
	return d <= (particle1.r + particle2.gravity);
}

var Urkel = Urkel || {};

Urkel.RandomColor = function () {return "#" + (Math.random()*0xffffff<<0).toString(16)}

Urkel._50bitParticle = function (particles) {
	particles.push(
		new Particle(
			Math.random()*canvas.width,
			Math.random()*canvas.height,
			50,
			Math.random()*10-5,
			Math.random()*10-5,
			-1,
			"000000"
			//(Math.random()*0xffffff<<0).toString(16)
		)
	);
}

Urkel._50bitGraviton = function (particles) {
	particles.push(
		new Graviton(
			Math.random()*canvas.width,
			Math.random()*canvas.height,
			50,
			null,
			"000000"
		)
	);
}

Urkel._1bitParticle = function (particles) {
	particles.push(
		new Particle(
			Math.random()*canvas.width,
			Math.random()*canvas.height,
			1,
			Math.random()*10-5,
			Math.random()*10-5,
			-1,
			"000000"
		)
	);
}

Urkel._1bitBlackhole = function (particles) {
	delete particles.pop();
}

Urkel.CanvasEraser = function () {
	canvasContext.fillStyle = "#ffffff";
	canvasContext.fillRect(0,0,canvas.width,canvas.height);
}

Urkel.Output = {};

Urkel.Output.NumberOfParticles = function () {
	document.getElementById("numberOfParticles").innerHTML = "particles: " + particles.length;
	if (particles.length == 100) {
		particles = [];
	}
}

Urkel.BasicUpdater = function () {

	new Urkel.CanvasEraser();
	new Urkel.Output.NumberOfParticles();

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
				if (ParticleToParticleCollision(p,t)) {
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
				if (ParticleToParticleCollision(p,t)) {
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

Urkel.BasicUpdater = function () {

	new Urkel.CanvasEraser();
	new Urkel.Output.NumberOfParticles();

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
				if (ParticleToParticleCollision(p,t)) {
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
				if (ParticleToParticleCollision(p,t)) {
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

Urkel.BasicGravityDriveUpdater = function () {

	new Urkel.CanvasEraser();
	new Urkel.Output.NumberOfParticles();

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
		// check to see if a current particles fuse
		for (var j in particles) {
			var t = particles[j];
			if (i != j && !t.gravity) {
				if (ParticleToParticleFusion(p,t)) {

					t.vx *= t.bounce;
					t.x += t.vx;

					t.vy *= t.bounce;
					t.y += t.vy;

				}
			}
		}
		p.draw(canvasContext);
	}

}

Urkel.BasicPainter = function () {

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
				if (ParticleToParticleCollision(p,t)) {
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
				if (ParticleToParticleCollision(p,t)) {
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

Urkel.Basic1bitExplosion = function () {

	new Urkel.CanvasEraser();
	new Urkel.Output.NumberOfParticles();

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
				if (ParticleToParticleCollision(p,t)) {
					p.vx *= p.bounce;
					p.x += p.vx;

					t.vx *= t.bounce;
					t.x += t.vx;

					p.vy *= p.bounce;
					p.y += p.vy;

					t.vy *= t.bounce;
					t.y += t.vy;

					new Urkel._1bitParticle(particles,t.x,t.y,p.x,p.y);
				}
				// check twice because particles are prone to sticking to each other.
				if (ParticleToParticleCollision(p,t)) {
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

Urkel.Basic1bitImplosion = function () {

	new Urkel.CanvasEraser();
	new Urkel.Output.NumberOfParticles();

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
				if (ParticleToParticleCollision(p,t)) {
					p.vx *= p.bounce;
					p.x -= p.vx;

					t.vx *= t.bounce;
					t.x -= t.vx;

					p.vy *= p.bounce;
					p.y -= p.vy;

					t.vy *= t.bounce;
					t.y -= t.vy;

					new Urkel._1bitBlackhole(particles,t.x,t.y,p.x,p.y);
				}
				// check twice because particles are prone to sticking to each other.
				if (ParticleToParticleCollision(p,t)) {
					p.vx *= p.bounce;
					p.x -= 1;

					t.vx *= t.bounce;
					t.x -= t.vx;

					p.vy *= p.bounce;
					p.y -= p.vy;

					t.vy *= t.bounce;
					t.y -= t.vy;
				}
			}
		}
		p.draw(canvasContext);
	}
}

Urkel.Basic1bitExplosionPainting = function () {

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
				if (ParticleToParticleCollision(p,t)) {
					p.vx *= p.bounce;
					p.x += p.vx;

					t.vx *= t.bounce;
					t.x += t.vx;

					p.vy *= p.bounce;
					p.y += p.vy;

					t.vy *= t.bounce;
					t.y += t.vy;

					t.color = Urkel.RandomColor();
					p.color = Urkel.RandomColor();
					new Urkel._1bitParticle(particles,t.x,t.y,p.x,p.y);
				}
				// check twice because particles are prone to sticking to each other.
				if (ParticleToParticleCollision(p,t)) {
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

// Begin Program// Begin Program// Begin Program// Begin Program// Begin Program// Begin Program// Begin Program// Begin Program
// Begin Program

/*Urkel.BasicParticleSystem = function () {

if (window.HTMLCanvasElement) {
	var canvas = document.getElementById("myCanvas");
	canvas.height = 600;
	canvas.width = 800;
	var canvasContext = canvas.getContext("2d");
	var particles = [];

	for (var i = 0; i <= 50; i++) {
		new Urkel._1bitParticle(particles);
	}

	window.setInterval(Urkel.BasicUpdater,10);
}*/

if (window.HTMLCanvasElement) {
	var canvas = document.getElementById("myCanvas");
	canvas.height = 600;
	canvas.width = 800;
	var canvasContext = canvas.getContext("2d");
	var particles = [];

	new Urkel._1bitParticle(particles);
	new Urkel._50bitGraviton(particles);

	window.setInterval(Urkel.BasicGravityDriveUpdater,10);
}