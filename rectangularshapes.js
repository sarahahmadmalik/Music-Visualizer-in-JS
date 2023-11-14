class RectangularShapes {
    constructor() {
      this.name = "rectangularshapes";
      this.rectangles = [];
    }
  
    draw() {
      const spectrum = fourier.analyze();
      const numRectangles = spectrum.length;
  
      // Adjust the width of each rectangle based on your desired value
      const rectWidth = width / numRectangles * 10; // Change 1.5 to your desired width factor
  
      // Loop through each frequency bin and create rectangles
      for (let i = 0; i < numRectangles; i++) {
        const freqAmplitude = map(spectrum[i], 0, 255, 10, height); // Adjust the scaling as needed
        const x = i * rectWidth;
        const y = height - freqAmplitude;
        const rectHeight = height - y;
  
        // Choose a color based on frequency amplitude
        const fillColor = color(map(freqAmplitude, 0, height, 0, 255), 100, 100);
  
        // Draw the rectangle
        fill(fillColor);
        rect(x, y, rectWidth, rectHeight);
      }
    }
  }
  