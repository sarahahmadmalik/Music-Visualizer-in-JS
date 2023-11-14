class wheelpattern {
  constructor() {
    // Visualization name
    this.name = "wheelpattern";

    // Current angle of rotation
    this.angle = 0;

    // Speed at which the pattern rotates
    this.angleSpeed = 0.02;

    // Radius of the circular pattern
    this.radius = 200;

    // Array to store real-time audio waveform data
    this.audioData = [];
  }

  draw() {
    // Translate the coordinate system to the center of the canvas
    translate(width / 2, height / 2);

    // Analyze audio data in real-time and store it in this.audioData
    this.audioData = fourier.waveform();

    // Draw leaf-like lines for the pattern
    push();
    stroke(0, 0, 255); // Set the stroke color to blue

    // Loop through concentric circles with decreasing radii
    for (let r = this.radius; r > 0; r -= 10) {
      // Loop through angles around each circle
      for (let a = 0; a < TWO_PI; a += 0.1) {
        // Map the current angle to an index in the audioData array
        let index = floor(map(a, 0, TWO_PI, 0, this.audioData.length));

        // Get the amplitude (audio signal strength) at the calculated index
        let amplitude = this.audioData[index];

        // Map the amplitude to a color gradient from green to red
        let fromColor = color(0, 255, 0); // Green
        let toColor = color(255, 0, 0);   // Red
        let lerpedColor = lerpColor(fromColor, toColor, amplitude);

        // Set the stroke color to the lerped color
        stroke(lerpedColor);

        // Set the stroke weight (line thickness) to 3
        strokeWeight(3);

        // Calculate the coordinates of the line endpoints
        let x1 = r * cos(a + this.angle);
        let y1 = r * sin(a + this.angle);
        let x2 = (r + amplitude * 50) * cos(a + this.angle);
        let y2 = (r + amplitude * 50) * sin(a + this.angle);

        // Draw a line connecting the calculated points
        line(x1, y1, x2, y2);
      }
    }

    pop(); // Restore the previous drawing style settings
    this.angle += this.angleSpeed; // Increment the rotation angle
  }
}
