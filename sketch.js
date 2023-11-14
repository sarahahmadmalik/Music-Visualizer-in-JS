//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//variable for p5 fast fourier transform
var fourier;

// Flag to indicate if the visualization should be drawn
var shouldDraw = false;
function setup(){

	  if (userSelectedFile !== null) {
		sound = userSelectedFile; 
	  }

	 createCanvas(windowWidth, windowHeight);
	 background(0);
	 controls = new ControlsAndInput();

	 //instantiate the fft object
	 fourier = new p5.FFT();


	 vis = new Visualisations();

	 vis.add(new Spectrum());
	 vis.add(new WavePattern());
	 vis.add(new Needles());
	 vis.add(new CircularWaves());
	 vis.add(new wheelpattern());
	 vis.add( new ParticlePattern());
	 vis.add(new HorizontalSpectrum());
	 vis.add(new RectangularShapes()); 


}

function draw(){
	if (shouldDraw) {
		background(0)
		controls.draw();
		if(vis.selectedVisual.name === 'particlepattern'){
			vis.selectedVisual.analyzeAudio(); 
			vis.selectedVisual.update(); 
			vis.selectedVisual.draw();
		}
		else{
			vis.selectedVisual.draw();
		}
		
	  }
}

function mouseClicked(){
	controls.mousePressed();
}

function keyPressed(){
	controls.keyPressed(keyCode);
}


// function windowResized(){
// 	resizeCanvas(windowWidth, windowHeight);
// 	if(vis.selectedVisual.hasOwnProperty('onResize')){
// 		vis.selectedVisual.onResize();
// 	}
// }


