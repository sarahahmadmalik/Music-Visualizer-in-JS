class PlaybackButton {
	constructor() {
	  // Initialize the position and dimensions of the button
	  this.x = 20; // X-coordinate of the button's top-left corner
	  this.y = 20; // Y-coordinate of the button's top-left corner
	  this.width = 20; // Width of the button
	  this.height = 20; // Height of the button
  
	  // Flag to determine whether the audio is currently playing
	  this.playing = false; // Initially set to false (paused)
	}
  
	// Draw the playback button based on its playing state
	draw() {
	  if (this.playing) {
		// If audio is playing, draw a pause button with two rectangles
		rect(this.x, this.y, this.width / 2 - 2, this.height);
		rect(this.x + this.width / 2 + 2, this.y, this.width / 2 - 2, this.height);
	  } else {
		// If audio is paused, draw a play button with a triangle
		triangle(this.x, this.y, this.x + this.width, this.y + this.height / 2, this.x, this.y + this.height);
	  }
	}
  
	// Check for clicks on the button, start or pause playback, and return true if clicked
	hitCheck() {
	  if (
		mouseX > this.x &&
		mouseX < this.x + this.width &&
		mouseY > this.y &&
		mouseY < this.y + this.height
	  ) {
		// If the mouse is within the button's boundaries
		if (sound.isPlaying()) {
		  // If audio is currently playing, pause it
		  sound.pause();
		} else {
		  // If audio is paused, start playing it
		  sound.loop();
		}
		this.playing = !this.playing; // Toggle the playing state
		return true; // Return true to indicate the button was clicked
	  }
	  return false; // Return false if the button was not clicked
	}
  }
  