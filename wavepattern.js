
class WavePattern {
	constructor() {
	  // Visualization name
	  this.name = "wavepattern";
	}
	
	draw() {
	  push(); // Save the current drawing state
	  
	  noFill(); // No fill color for shapes
	  stroke(255, 0, 0); // Stroke color in red (R:255, G:0, B:0)
	  strokeWeight(2); // Set the stroke weight to 2 pixels
	
	  beginShape(); // Begin defining a shape
	
	  // Calculate the waveform from the Fast Fourier Transform (FFT)
	  const wave = fourier.waveform();
	
	  for (let i = 0; i < wave.length; i++) {
		// For each element of the waveform, map it to screen coordinates
		// 'y' represents the vertical position, and 'x' represents the horizontal position.
		const y = map(i, 0, wave.length, 0, height);
		const x = map(wave[i], -1, 1, 0, width);
	
		vertex(x, y); // Create a vertex point at (x, y)
	  }
	
	  endShape(); // End defining the shape
	  pop(); // Restore the previous drawing state
	}
  }
  