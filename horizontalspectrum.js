// HorizontalSpectrum class represents a visualization that displays the audio spectrum
// as a horizontal bar graph, with each bin's height representing its magnitude.

class HorizontalSpectrum {
    constructor() {
      // Visualization name
      this.name = "horizontalspectrum";
    }
  
    // Draw the horizontal spectrum visualization
    draw() {
      push();
      
      // Analyze audio spectrum
      var spectrum = fourier.analyze();
      
      // No stroke for the rectangles
      noStroke();
      
      // Fill the rectangles with green to red gradient based on spectrum values
      fill(0, 255, 0);
  
      // Iterate through the spectrum bins
      for (var i = 0; i < spectrum.length; i++) {
        // Map the green component based on the bin's magnitude
        var g = map(spectrum[i], 0, 255, 255, 0);
        
        // Set fill color with a gradient from green to red
        fill(spectrum[i], g, 0);
  
        // Calculate the y-coordinate from the bottom of the screen
        var y = height - map(spectrum[i], 0, 255, 0, height);
  
        // Calculate the x-coordinate based on the bin's position
        var x = map(i, 0, spectrum.length, 0, width);
  
        // Calculate the height of the rectangle based on the y-coordinate
        var h = height - y;
  
        // Draw each bin as a rectangle from the bottom of the screen up vertically
        rect(x, y, width / spectrum.length, h);
      }
  
      pop(); // Restore previous drawing settings
    }
  }
  
  // Expose the HorizontalSpectrum class to the global window object
  window.HorizontalSpectrum = HorizontalSpectrum;
  