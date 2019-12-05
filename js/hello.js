let canvas = document.querySelector('.stage'),
	inputField = document.querySelector('.userCharacter'),
	width = canvas.width,
	height = canvas.height,
	linearRows = 40,
	gutter = 8,
	dotColour = '#00ff41',
	repaintColour = 'rgba(0,0,0, 0.2)',
	matteLookup = [],
	maxSpeed = .9,
	maxSize = .4,
	systemSize = 1500,
	matteCharacter = '☻', // ♠♣♥♦♫☺☻
	running = false,
	ctx = canvas.getContext('2d');

function createTextMatte(){
	// clear the screen
	ctx.clearRect(0, 0, width, height);
	/* Draw something to use as matte
	And make it red, as we use that pixel colour value */
	ctx.fillStyle = '#f00';
	ctx.font = 650 +'px Titillium Web';
	ctx.textAlign = 'center';
	ctx.fillText(matteCharacter, width * .5, height - 32);
	// Capture and store all alpha values to array
	gatherPixelData();
	// clear the matte
	ctx.fillStyle = '#000';
	ctx.fillRect(0, 0, width, height);
	// start the animation
	if(!running){
		running = true;
		animate();
	}
}
function gatherPixelData(){
	matteLookup.length = 0;
	var imageData = ctx.getImageData(0, 0, width, height),
	pixelData = imageData.data;
	for (let loop = width * height, i = 0; i < loop * 4; i += 4){
		matteLookup.push((Math.round(pixelData[i])) / 255);
	}
}

let ParticleSystem = function(num){
	this.numParticles = num;
	this.allParticles = [];
	this.colour = dotColour;
	this.x = width * .5;
	this.y = height * .5;
	this.generate();
}
ParticleSystem.prototype.generate = function(){
	for(let i=0; i<this.numParticles; i++){
		let vo = {};
		vo.colour = getRandomColour();
		vo.radius = maxSize;
		vo.speed = Math.random() * maxSpeed * 2 - maxSpeed,
		vo.parent = this;
		this.allParticles.push(new Particle(vo));
	}
}
ParticleSystem.prototype.update = function(){
	for(let i=0; i<this.allParticles.length; i++){
		this.allParticles[i].update();
	}
}
ParticleSystem.prototype.scatter = function(){
	for(let i=0; i<this.allParticles.length; i++){
		this.allParticles[i].setPosition();
	}
}

let Particle = function(vo){
	this.colour = vo.colour;
	this.locked = false;
	this.parent = vo.parent;
	this.radius = vo.radius;
	this.speed = vo.speed;
	this.setPosition();
}
Particle.prototype.setPosition = function(){
	this.x = Math.random() * width;
	this.y = Math.round(Math.random() * linearRows) * ((height - gutter) / linearRows) + (gutter * .5);
	this.locked = (reportMatte(Math.round(this.x), Math.round(this.y)) === 0) ? false : true;
}
Particle.prototype.update = function(){
	// If outside matte, pick a new position, otherwise, just step
	if(reportMatte(Math.round(this.x), Math.round(this.y)) === 0){
		this.speed *= -1;
		if(!this.locked){
			this.setPosition();
		}
	}
	this.x += this.speed;
}

function getRandomColour() {
	let r = Math.round(Math.random()*100+150).toString(16),
	g = Math.round(Math.random()*100+150).toString(16),
	b = Math.round(Math.random()*100+130).toString(16);
	return '#' + r + g + b;
}

function reportMatte(x,y){
	let redValue = matteLookup[ (y * width) + x ];
	return redValue === undefined ? 0 : redValue ;
}

function update(){
	system.update();
}
function draw(){
	ctx.fillStyle = repaintColour;
	ctx.fillRect(0, 0, width, height);
	
	ctx.fillStyle = system.colour;
	for(let i=0; i<system.numParticles; i++){
		let p = system.allParticles[i];
		let s = p.speed < 0 ? p.radius : p.radius * p.speed * 4;
		ctx.fillRect(p.x, p.y, s, s);
	}
}
function animate(){
	update();
	draw();
	requestAnimationFrame(animate);
}
setMatteCharacter();
let system = new ParticleSystem(systemSize);

function setupEvents(){
	inputField.addEventListener('input', (e) => {
		matteCharacter = e.target.value.slice(-1).toUpperCase();
		setMatteCharacter();
		createTextMatte();
		system.scatter();
	} );
}
function setMatteCharacter(){
	inputField.value = matteCharacter;
}
document.fonts.ready.then(function () {
	document.querySelector('.loadFont').style.display = 'none';
	setupEvents();
	createTextMatte();
});
