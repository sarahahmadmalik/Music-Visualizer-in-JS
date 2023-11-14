class ControlsAndInput {
	constructor() {
	  // Initialize properties
	  this.menuDisplayed = true; // Indicates whether the menu is currently displayed
	  this.playbackButton = new PlaybackButton(); // Creates an instance of the PlaybackButton class
	  this.playbackButtonHidden = true; // Indicates whether the playback button is hidden
	  this.userSelectedVisualization = false; // Indicates whether the user has selected a visualization
	  this.selectedVisualization = ''; // Stores the name of the selected visualization
	  this.visualizationIndex = 0; // Stores the index of the currently selected visualization
	}
  
	// Toggles the menu display on and off
	toggleMenu() {
	  console.log('toggled');
	  this.menuDisplayed = !this.menuDisplayed;
	}
  
	// Selects the 'Circular Waves' visualization and updates related properties
	selectCircularWavesVisualization() {
	  this.toggleMenu();
	  this.selectedVisualization = 'Circular Waves';
	  this.userSelectedVisualization = true;
	  this.playbackButtonHidden = false;
	}
  
	// Switches to the next visualization in the list
	switchToNextVisualization() {
	  this.visualizationIndex = (this.visualizationIndex + 1) % vis.visuals.length;
	  console.log(this.visualizationIndex);
	  this.selectedVisualization = vis.visuals[this.visualizationIndex].name;
	  vis.selectVisual(vis.visuals[this.visualizationIndex].name);
	}
  
	// Handles key presses and responds to menu options
	keyPressed(keycode) {
	  console.log(keycode);
	  if (this.menuDisplayed) {
		var visNumber = keycode - 49;
		if (keycode > 48 && keycode < 52) {
		  this.toggleMenu();
		  vis.selectVisual(vis.visuals[visNumber].name);
		  this.selectedVisualization = vis.visuals[visNumber].name;
		  this.userSelectedVisualization = true;
		  this.playbackButtonHidden = false;
		} else if (keycode === 52) {
		  this.selectCircularWavesVisualization();
		  vis.selectVisual(vis.visuals[visNumber].name);
		} else if (keycode === 53) {
		  this.toggleMenu();
		  vis.selectVisual('LeafPattern');
		  this.selectedVisualization = 'LeafPattern';
		  this.userSelectedVisualization = true;
		  this.playbackButtonHidden = false;
		  vis.selectVisual(vis.visuals[visNumber].name);
		} else if (keycode === 54) {
		  this.toggleMenu();
		  vis.selectVisual('particlepattern');
		  this.selectedVisualization = 'particlepattern';
		  this.userSelectedVisualization = true;
		  this.playbackButtonHidden = false;
		  vis.selectVisual(vis.visuals[visNumber].name);
		} else if (keycode === 55) {
		  this.toggleMenu();
		  vis.selectVisual('horizontalspectrum');
		  this.selectedVisualization = 'horizontalspectrum';
		  this.userSelectedVisualization = true;
		  this.playbackButtonHidden = false;
		  vis.selectVisual(vis.visuals[visNumber].name);
		} 
		else if (keycode === 56) {
			this.toggleMenu();
			vis.selectVisual('rectangularshapes');
			this.selectedVisualization = 'rectangularshapes';
			this.userSelectedVisualization = true;
			this.playbackButtonHidden = false;
			vis.selectVisual(vis.visuals[visNumber].name);
		  }else {
		  displayErrorMessage();
		}
	  }
  
	  if (keycode == 32 && sound.isPlaying()) {
		console.log("enter-key-pressed");
		this.switchToNextVisualization();
	  } else {
		this.toggleMenu();
	  }
	}
  
	// Handles mouse clicks, specifically checks the playback button
	mousePressed() {
	  this.playbackButton.hitCheck();
	}
  
	// Draws the UI elements including the playback button and menu
	draw() {
	  push();
	  fill("white");
	  strokeWeight(2);
	  textSize(34);
  
	  const centerX = width / 2;
	  const centerY = height / 2;
	  const buttonWidth = 200;
	  const buttonHeight = 50;
  
	  if (!this.playbackButtonHidden) {
		this.playbackButton.draw(centerX - buttonWidth / 2, centerY - buttonHeight / 2, buttonWidth, buttonHeight);
	  } else if (this.menuDisplayed) {
		// Display menu
		textSize(24);
		text("Select a visualization:", centerX - buttonWidth / 2, centerY - buttonHeight / 2 - 40);
  
		// Menu options
		const menuOptions = [
		  "1: Spectrum",
		  "2: Waves Patterns",
		  "3: Needles",
		  "4: Circular Waves",
		  "5: Wheel Pattern",
		  "6: Particles & Waves",
		  "7: Horizontal Spectrum",
		  "8: Rectangular Shapes",
		];
  
		for (let i = 0; i < menuOptions.length; i++) {
		  const yLoc = centerY - buttonHeight / 2 - 10 + i * 30;
		  textSize(18);
		  fill("white");
		  noStroke();
		  text(menuOptions[i], centerX - buttonWidth / 2 + 10, yLoc);
		}
	  }
	  pop();
	}
  }
  
  // Displays an error message
  function displayErrorMessage() {
	push();
	fill("red");
	textSize(20);
	textAlign(CENTER, CENTER);
	text("Please select from these options", width / 2, height / 2 + 100);
	pop();
  }
  