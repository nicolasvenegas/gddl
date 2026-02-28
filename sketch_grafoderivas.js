let COUNT = 1; 
let pt;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);
    smooth(8);
    frameRate(24);
    background(0);
    
    pt = new Array(7 * COUNT);
    let index = 0;
    for (let i = 0; i < COUNT; i++) {
        pt[index++] = random(-TAU, TAU);
        pt[index++] = random(-TAU, TAU);
        pt[index++] = random(-10, 10);
        pt[index++] = int(random(TAU, 50));
        pt[index++] = 150;
        pt[index++] = 110;
        pt[index++] = radians(1);
    }
}

function draw() {
    push();
    grafo();
    pop();
    cursor();
}

function grafo() {
    let index = 0;
    rectMode(CENTER);
    rotateX(width);
    rotateY(height);

    let startCenter = constrain(map(frameCount, 0, 150, 0, 1), 0, 1);

    for (let i = 0; i < COUNT; i++) {
        push();
        
        // CÁLCULO INDIVIDUAL: Sumamos 'i' al ruido para que cada uno tenga su propia ruta
        let wave0 = map(noise(frameCount * 0.01 + i * 10), 0, 1, -width / 2, width / 2) * startCenter;
        let wave1 = map(noise(frameCount * 0.01 + i * 20 + 500), 0, 1, -height / 2, height / 2) * startCenter;

        let sizeNoise = map(noise(frameCount * 0.01 + i * 5), 0, 1, 0.5, 1.5);
        let sizeMult = lerp(1, sizeNoise, startCenter);

        fill(0, 0);
        strokeWeight(1);
        stroke(255, 7); 

        rotateX(pt[index++] + wave0 / 360);
        rotateY(pt[index++] + wave1 / 360);

        index += 2;

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

function cursor() {
    background(204);
    ellipse(pmouseX - width / 2, pmouseY - height / 2, 20, 20);
}

function stopit() {
    frameRate(0);
}
