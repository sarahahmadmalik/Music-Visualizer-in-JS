class CircularWaves {
  constructor() {
    // Visualization name
    this.name = "circularwaves";
    // Initial angle and rotation speed of the circular waves
    this.angle = 0;
    this.angleSpeed = 0.02;
    // Radius of the circular pattern
    this.radius = 200;
    // Amplitude of the waves
    this.waveAmplitude = 50;
  }

  draw() {
    // Translate to the center of the canvas
    translate(width / 2, height / 2);

    // Draw circular waves
    let waveform = fourier.waveform();
    push();
    noFill();
    stroke(0, 0, 255);
    beginShape();

    // Loop through different radii for creating the circular pattern
    for (let r = this.radius; r > 0; r -= 10) {
      // Loop through angles to create points along the circle
      for (let a = 0; a < TWO_PI; a += 0.1) {
        // Map the current angle to an index in the waveform data
        let index = floor(map(a, 0, TWO_PI, 0, waveform.length));
        // Get the amplitude from the waveform data
        let amplitude = waveform[index];
        // Calculate the x and y coordinates for the vertex
        let x = (this.radius + amplitude * 50) * cos(a + this.angle);
        let y = (this.radius + amplitude * 50) * sin(a + this.angle);
        // Add the vertex to the shape
        vertex(x, y);
      }
    }

    endShape(CLOSE);
    pop();
    
    // Increment the angle for animation
    this.angle += this.angleSpeed;
  }
}
