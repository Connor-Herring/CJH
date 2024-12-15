const G = 100; // Gravitational constant (scaled for visualization)
let masses, positions, velocities, accelerations; // Declare variables for setup initialization
let trails; // Array to store trails for each body
const dt = 0.2; // Time step

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();

  // Initialize masses randomly between 0.5 and 2
  masses = [
    random(100, 102),
    random(100, 102),
    random(100, 102)
  ];

  // Initialize positions, velocities, and accelerations in setup
  positions = [
    createVector(random(50,100), 150, 0),
    createVector(random(-250,-50), random(0, 150), 0),
    createVector(random(-50,50), random(-150,0), 0)
  ];

  // Initialize velocities randomly
  velocities = [
    createVector(random(-2, 2), random(-10, 10), 0),
    createVector(random(0, 10), random(-10, 10), 0),
    createVector(random(-1, 10), random(-10, 10), 0)
  ];

  accelerations = [
    createVector(0, 0, 0),
    createVector(0, 0, 0),
    createVector(0, 0, 0)
  ];

  trails = [[], [], []]; // Initialize trails for each body
}

function draw() {
  background(255);
  //lights();

  // Calculate forces and update positions
  calculateAccelerations();
  updateBodies();

  // Draw the trails
  for (let i = 0; i < trails.length; i++) {
    beginShape();
    noFill();
    stroke(i === 0 ? 0 : i === 1 ? 100 : 150); // Match trail color to body color
    //stroke(i === 0 ? color(255, 0, 0) : i === 1 ? color(0, 255, 0) : color(0, 0, 255)); // Trail colors
    for (let pos of trails[i]) {
      vertex(pos.x, pos.y, pos.z);
    }
    endShape();
  }

  // Draw the three bodies
  for (let i = 0; i < positions.length; i++) {
    push();
    translate(positions[i].x, positions[i].y, positions[i].z);
    //fill(i === 0 ? 0 : i === 1 ? 100 : 150); // Different colors for each body
    fill(i === 0 ? color(255, 0, 0) : i === 1 ? color(0, 255, 0) : color(0, 0, 255)); // Sphere colors
    sphere(20);
    pop();

    // Add current position to trail
    trails[i].push(positions[i].copy());

    // Limit trail length
    if (trails[i].length > 500) {
      trails[i].shift();
    }
  }
}

function calculateAccelerations() {
  for (let i = 0; i < positions.length; i++) {
    let force = createVector(0, 0, 0);
    for (let j = 0; j < positions.length; j++) {
      if (i !== j) {
        const r = p5.Vector.sub(positions[j], positions[i]);
        const distance = max(r.mag(), 1); // Prevent division by zero
        const magnitude = (G * masses[j]) / (distance * distance * distance);
        force.add(r.mult(magnitude));
      }
    }
    accelerations[i] = force;
  }
}

function updateBodies() {
  for (let i = 0; i < positions.length; i++) {
    velocities[i].add(p5.Vector.mult(accelerations[i], dt));
    positions[i].add(p5.Vector.mult(velocities[i], dt));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
