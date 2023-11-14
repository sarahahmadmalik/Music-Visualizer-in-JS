class Visualisations {
	constructor() {
	  // Initialize an array to store visualizations.
	  this.visuals = [];
	  // Initialize a property to keep track of the currently selected visualization (starts as null).
	  this.selectedVisual = null;
	}
  
	// Method to add a new visualization to the collection.
	// @param vis: A visualization object to add to the collection.
	add(vis) {
	  // Push the provided visualization object into the visuals array.
	  this.visuals.push(vis);
	  
	  // If no visualization is currently selected, set the newly added visualization as the selected one.
	  if (this.selectedVisual === null) {
		this.selectVisual(vis.name);
	  }
	}
  
	// Method to select a visualization based on its name.
	// @param visName: The name of the visualization to select.
	selectVisual(visName) {
	  // Use the find method to search for a visualization with the specified name in the visuals array.
	  // When found, set it as the selected visualization.
	  this.selectedVisual = this.visuals.find((vis) => vis.name === visName);
	}
  }
  