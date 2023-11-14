class Spectrum {
	constructor() {
	  // Initialize the name property for identifying the visualization
	  this.name = "spectrum";
	}
  
	draw() {
	  // Push the current drawing state onto a stack
	  push();
  
	  // Analyze the audio spectrum using the p5.js Fourier Transform
	  const spectrum = fourier.analyze();
  
	  // Disable stroke (outline) for shapes
	  noStroke();
  
	  // Fill the shapes with green color
	  fill(0, 255, 0);
  
	  // Iterate through each frequency bin in the spectrum
	  for (let i = 0; i < spectrum.length; i++) {
		// Fade the color of the bin from green to red based on its intensity
		const g = map(spectrum[i], 0, 255, 255, 0);
		fill(spectrum[i], g, 0);
  
		// Calculate the vertical position (y) for the current bin
		const y = map(i, 0, spectrum.length, 0, height);
  
		// Calculate the width (w) of the rectangle based on the intensity
		const w = map(spectrum[i], 0, 255, 0, width);
  
		// Draw a rectangle representing the current frequency bin
		rect(0, y, w, height / spectrum.length);
	  }
  
	  // Restore the previous drawing state from the stack
	  pop();
	}
  }
  