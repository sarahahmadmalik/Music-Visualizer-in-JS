class Needles {
	constructor() {
	  // Visualization name
	  this.name = "needles";
  
	  // Minimum and maximum angle for the needle plot
	  this.minAngle = PI + PI / 10;
	  this.maxAngle = TWO_PI - PI / 10;
  
	  // Number of plots across and down
	  this.plotsAcross = 2;
	  this.plotsDown = 2;
  
	  // Frequency bins used by the energy function to retrieve values
	  this.frequencyBins = ["bass", "lowMid", "highMid", "treble"];
  
	  // Padding around the plots
	  this.pad = width / 20;
  
	  // Call onResize to set initial values when the object is created
	  this.onResize();
	}
  
	// Handles resizing of the visualization
	onResize() {
	  this.plotWidth = (width - this.pad) / this.plotsAcross;
	  this.plotHeight = (height - this.pad) / this.plotsDown;
	  this.dialRadius = (this.plotWidth - this.pad) / 2 - 5;
	}
  
	// Draws the needle plots to the screen
	draw() {
	  // Analyze the audio spectrum
	  const spectrum = fourier.analyze();
  
	  // Iterator for selecting frequency bins
	  let currentBin = 0;
  
	  push();
	  fill('#f0f2d2');
  
	  // Nested loops to place plots in a grid
	  for (let i = 0; i < this.plotsDown; i++) {
		for (let j = 0; j < this.plotsAcross; j++) {
		  // Calculate the position and size of each plot
		  const x = this.pad + j * this.plotWidth;
		  const y = this.pad + i * this.plotHeight;
		  const w = this.plotWidth - this.pad;
		  const h = this.plotHeight - this.pad;
  
		  // Draw a rectangle for the plot
		  rect(x, y, w, h);
  
		  // Add ticks and needles
		  this.ticks(x + w / 2, y + h, this.frequencyBins[currentBin]);
		  const energy = fourier.getEnergy(this.frequencyBins[currentBin]);
		  this.needle(energy, x + w / 2, y + h);
  
		  currentBin++;
		}
	  }
  
	  pop();
	}
  
	// Draws a needle for an individual plot
	needle(energy, centreX, bottomY) {
	  push();
	  stroke('#333333');
  
	  // Translate the coordinate system so that 0 is at the bottom of the needle
	  translate(centreX, bottomY);
  
	  // Map energy to the angle for the plot
	  const theta = map(energy, 0, 255, this.minAngle, this.maxAngle);
  
	  // Calculate the x and y coordinates for the length of the needle
	  const x = this.dialRadius * cos(theta);
	  const y = this.dialRadius * sin(theta);
  
	  // Draw the needle
	  line(0, 0, x, y);
	  pop();
	}
  
	// Draws the graph ticks on an individual plot
	ticks(centreX, bottomY, freqLabel) {
	  // Starting angle for ticks
	  let nextTickAngle = this.minAngle;
  
	  push();
	  stroke('#333333');
	  fill('#333333');
  
	  // Translate the coordinate system
	  translate(centreX, bottomY);
  
	  // Draw a semi-circle for the bottom of the needle
	  arc(0, 0, 20, 20, PI, 2 * PI);
  
	  // Set text alignment and size for frequency label
	  textAlign(CENTER);
	  textSize(12);
	  text(freqLabel, 0, -(this.plotHeight / 2));
  
	  // Draw ticks around the plot
	  for (let i = 0; i < 9; i++) {
		// Calculate start and end coordinates for each tick
		const x = this.dialRadius * cos(nextTickAngle);
		const x1 = (this.dialRadius - 5) * cos(nextTickAngle);
		const y = this.dialRadius * sin(nextTickAngle);
		const y1 = (this.dialRadius - 5) * sin(nextTickAngle);
  
		// Draw the tick line
		line(x, y, x1, y1);
  
		// Increment the angle for the next tick
		nextTickAngle += PI / 10;
	  }
	  pop();
	}
  }
  