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

    // 1. Creamos un factor que va de 0 a 1 en los primeros 150 frames (suavizado)
    let startCenter = constrain(map(frameCount, 0, 150, 0, 1), 0, 1);

    // 2. Multiplicamos el mapeo por startCenter para que inicie en 0 (el centro exacto)
    let wave0 = map(noise(frameCount * 0.01), 0, 1, -width / 2, width / 2) * startCenter;
    let wave1 = map(noise(frameCount * 0.01 + 500), 0, 1, -height / 2, height / 2) * startCenter; 
    
    // El tamaño también inicia en 1 gracias al lerp
    let sizeNoise = map(noise(frameCount * 0.01 + i), 0, 1, 0.5, 2.5);
    let sizeMult = lerp(1, sizeNoise, startCenter);

    for (let i = 0; i < COUNT; i++) {
        for (let j = 0; j < COUNT; j++) { 
            push();
            fill(0, 0);
            strokeWeight(1);
            stroke(255, 10);

            rotateX(pt[index++] + wave0 / 360); 
            rotateY(pt[index++] + wave1 / 360);

            index += 2; 
            
            // Al ser wave0 y wave1 = 0 al inicio, el rect aparece en el centro
            rect( 
                wave0, 
                wave1, 
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
