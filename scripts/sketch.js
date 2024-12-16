    let a = 0;               // Angle of rotation
    const offset = Math.PI / 30.0; // Angle offset between boxes
    const num = 13;          // Number of boxes
    const canvasWidth = 1000;
    const canvasHeight = 500;
    function setup() {
      //createCanvas(windowWidth, windowHeight, WEBGL); // Full window canvas
      createCanvas(windowWidth, canvasHeight, WEBGL)
      noStroke();
    }

    function draw() {
      background(255); // Set background to white
      translate(0, 0, -50); // Center and pull back the view for better framing

      for (let i = 0; i < num; i++) {
        push();
        //fill(i*10)
        //fill(color(random(0,255),random(0,255) , random(0,255)))
        fill(color(i*(255/num),i*(255/num), i*(255/num)))
        rotateY(a + offset * i);
        rotateX(a / 2 + offset * i);
        ellipse(252, 144, 72, 72);
        box(100)
        //polygon(2, 2, 82, 3); // Triangle
        //polygon(2, 2, 82, 4); // Triangle
        pop();
      }

      a += 0.01;
    }

    function polygon(x, y, radius, npoints) {
      const angle = TWO_PI / npoints;
      beginShape();
      for (let a = 0; a < TWO_PI; a += angle) {
        const sx = x + cos(a) * radius;
        const sy = y + sin(a) * radius;
        vertex(sx, sy);
      }
      endShape(CLOSE);
    }

    function windowResized() {
      resizeCanvas(windowWidth, windowHeight); // Adjust canvas size on window resize
    }