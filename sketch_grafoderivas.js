let COUNT =1;
let pt;
let style;

let inter;

var t;

let pause = false; //globale Variable für Pause


//posiciones XY para el array de letters
var letters = ["D","E","R","I","V","A","D","E","L","L","I","B","R","O"];
var xPerlinPositions = [];
var yPerlinPositions = [];

// tamaños de fuente aleatorios
var PerlinSizes = [];

var touchColors = [];


function setup() {
    createCanvas(windowWidth,windowHeight, WEBGL);

    //randomSeed(7); // use this to get the same result each time

    smooth(8);
	frameRate(24);
	background(0);

	inter = loadFont('assets/Tickerbit-mono.otf');

	textFont(inter);
	pt = new Array(7 * COUNT); // rotx, roty, deg, rad, w, h, speed

    // creando grafos
    let index = 0;
    for (let i = 0; i < COUNT; i++) {
        pt[index++] = random(-TAU,TAU); // Random X axis rotation
        pt[index++] = random(-TAU,TAU); // Random Y axis rotation
        pt[index++] = random(-10, 10); // Short to quarter-circle arcs

        pt[index++] = int(random(TAU,50)); // Radius. Space them out nicely
        pt[index++] = 150; // Width of band
        pt[index++] = 110; // Height of band
        pt[index++] = radians(1); // Speed of rotation
    }

	// posiciones random perlin
	for (var x = 0; x < letters.length; x++) {
		var nx = map(x, 0, letters.length, 0, width);
		var mx = width * noise(nx);
		xPerlinPositions.push(mx);
  	}
  	for (var z = 0; z < letters.length; z++) {
		var nz = map(z, 0, letters.length, 0, height);
		var mz = height * noise(nz);
		yPerlinPositions.push(mz);
  	}
  	// tamaños random perlin
  	for (var t = 0; t < letters.length; t++) {
		var tz = map(t, 0, letters.length, 0, width);
		var rz = random(50,140) * noise(tz);
		PerlinSizes.push(rz);
  	}

}

function draw() {

    push();
    	grafo();
    pop();





    cursor();

}


function grafo() {
    let i = 0.1;
    let index = 0;
    rectMode(CENTER);
    
    translate(0, 0); 
    
    rotateX(width);
    rotateY(height);

    // Ajustamos wave1 para que su rango sea la altura total (de arriba a abajo)
    let wave0 = map(noise(frameCount * 0.01), 0, 1, 0, width/2);
    let wave1 = map(noise(frameCount * 0.01), 0, 1, -height/2, height/2); 
    
    let sizeMult = map(noise(frameCount * 0.01 + i), 0, 1, 1, 4);

    for (let i = 0; i < COUNT; i++) {
        for (let j = 0; j < COUNT; j++) { 
            push();
            translate(0, 0); 
            let tColor = map(pmouseX, width, 0, 0, 100);
            let lColor = map(pmouseY, height, 0, 0, 100);
            fill(0, 0);
            strokeWeight(1);
            stroke(255, 10);

            rotateX(pt[index++] + wave0 / 100); 
            rotateY(pt[index++] + wave1 / 100);

            let noiseStep = noise(frameCount * 0.001) * 0.1; 
            
            // Sumamos wave1 a la coordenada Y para generar el movimiento vertical
            rect( 
                pt[index++] * noiseStep, 
                pt[index++] * (-noiseStep) + wave1, 
                pt[index++] * sizeMult, 
                pt[index++] * sizeMult  
            );            
            
            pt[index - 5] += pt[index];
            pt[index - 4] += pt[index++];
            pop();
        }
    }
}




function cursor(){
	  background(204);
	  //make the ellipse follow your mouse
	  ellipse(pmouseX,pmouseY,20,20);
}

function stopit(){
	frameRate(0);
}



/*
function mouseClicked(){
  save('myCanvas.png');
}
*/
