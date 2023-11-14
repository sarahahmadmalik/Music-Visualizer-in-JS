// ParticlePattern class represents a visualization that generates circular waves
// when beats are detected in the audio spectrum.
class ParticlePattern {
    constructor() {
      // Visualization name
      this.name = 'particlepattern';
      
      // Array to store circular wave instances
      this.circles = [];
  
      // Threshold for detecting beats
      this.beatThreshold = 1.5;
  
      // Previous energy level to compare with the current energy
      this.prevEnergy = 0;
    }
  
    // Analyze audio data to detect beats and generate circular waves
    analyzeAudio() {
      // Analyze audio data and detect beats
      const spectrum = fourier.analyze();
      const energy = spectrum.reduce((sum, value) => sum + value, 0);
  
      // Compare current energy with previous energy to detect beats
      if (energy > this.prevEnergy + this.beatThreshold) {
        // Generate circular waves when a beat is detected
        this.generateCircles();
      }
  
      this.prevEnergy = energy;
    }
  
    // Generate a new circular wave and add it to the array
    generateCircles() {
      const circle = new CircularWave();
      this.circles.push(circle);
    }
  
    // Update and display circular waves
    update() {
      for (let i = this.circles.length - 1; i >= 0; i--) {
        const circle = this.circles[i];
        circle.update();
        if (circle.isDone()) {
          this.circles.splice(i, 1); // Remove completed circular waves
        }
      }
    }
  
    // Display circular waves
    draw() {
      for (const circle of this.circles) {
        circle.draw();
      }
    }
  }
  
  // CircularWave class represents a single expanding circular wave.
  class CircularWave {
    constructor() {
      // Center of the circular wave
      this.center = createVector(width / 2, height / 2);
  
      // Initial radius of the wave
      this.radius = 50;
  
      // Maximum radius the wave can expand to
      this.maxRadius = 200;
  
      // Opacity of the wave
      this.opacity = 255;
  
      // Array to store particles in the wave
      this.particles = [];
    }
  
    // Update the circular wave (expand and generate particles)
    update() {
      this.radius += 5; // Adjust the expansion speed as needed
      this.opacity -= 10; // Adjust opacity reduction speed as needed
  
      // Generate particles as the wave expands
      if (this.radius % 20 === 0) { // Adjust particle generation rate as needed
        const numParticles = 10; // Adjust the number of particles per step
        for (let i = 0; i < numParticles; i++) {
          const angle = random(TWO_PI);
          const x = this.center.x + this.radius * cos(angle);
          const y = this.center.y + this.radius * sin(angle);
          this.particles.push(new Particle(x, y));
        }
      }
    }
  
    // Check if the wave has expanded beyond the maximum radius
    isDone() {
      return this.radius > this.maxRadius;
    }
  
    // Draw the circular wave and its particles
    draw() {
      noFill();
      stroke(255, this.opacity);
      strokeWeight(2);
      ellipse(this.center.x, this.center.y, this.radius * 2);
  
      for (const particle of this.particles) {
        particle.show();
      }
    }
  }
  
  // Particle class represents individual particles in the circular wave.
  class Particle {
    constructor(x, y) {
      // Particle position
      this.pos = createVector(x, y);
  
      // Particle velocity with random direction and speed
      this.vel = p5.Vector.random2D().mult(random(2, 5));
  
      // Particle acceleration
      this.acc = createVector(0, 0);
  
      // Particle size
      this.size = random(3, 5);
  
      // Particle color
      this.color = [random(200, 255), random(200, 255), random(200, 255)];
    }
  
    // Apply a force to the particle
    applyForce(force) {
      this.acc.add(force);
    }
  
    // Update particle position based on velocity and acceleration
    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0); // Reset acceleration
    }
  
    // Check if the particle has moved outside the canvas boundaries
    edges() {
      if (
        this.pos.x < -width / 2 ||
        this.pos.x > width / 2 ||
        this.pos.y < -height / 2 ||
        this.pos.y > height / 2
      ) {
        return true; // Particle is outside the canvas
      } else {
        return false; // Particle is inside the canvas
      }
    }
  
    // Display the particle as an ellipse with the specified color
    show() {
      noStroke();
      fill(this.color);
      ellipse(this.pos.x, this.pos.y, this.size);
    }
  }
  
  // Expose ParticlePattern class to the global window object
  window.ParticlePattern = ParticlePattern;
  