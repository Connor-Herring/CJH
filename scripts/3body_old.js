
const G = 100; // Gravitational constant (scaled for visualization)
let positions, velocities, accelerations; // Declare variables for setup initialization
const dt = 0.2; // Time step

function setup() {
  createCanvas(windowWidth, windowHeight/1.25, WEBGL);
  noStroke();

  // Initialize positions, velocities, and accelerations in setup

  // Initialize masses randomly between 0.5 and 2
  masses = [
    random(100, 105),
    random(100, 105),
    random(100, 105)
  ];

  positions = [
    createVector(200, 0, 0),
    createVector(-100, 173.2, 0),
    createVector(-100, -173.2, 0)
  ];

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
}

function draw() {
  background(255);
  lights();

  // Calculate forces and update positions
  calculateAccelerations();
  updateBodies();

  // Draw the three bodies
  for (let i = 0; i < positions.length; i++) {
    push();
    translate(positions[i].x, positions[i].y, positions[i].z);
    //fill(i === 0 ? 0 : i === 1 ? 100 : 150); // Different colors for each body
    fill(i === 0 ? color(255, 0, 0) : i === 1 ? color(0, 255, 0) : color(0, 0, 255)); // Sphere colors
    sphere(20);
    pop();
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
