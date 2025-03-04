class imageButton {
	constructor(src, w, h) {
		// image button
		this.btn = createButton('');
		this.btn.style('background', "url(" + src + ")");
		this.btn.style('border', "none");
		this.btn.style('background-size', 'contain');
    this.btn.style('background-repeat', 'no-repeat');
		this.btn.size(w, h);
	}
	
	position(x, y) {
		this.btn.position(x, y);
	}
	
	mousePressed(callback) {
    // Save the external callback
    this.internalCallback = callback;

    // Attach a listener to the button
    this.btn.mousePressed(() => {
      // Call the internal callback if defined
      if (this.internalCallback) {
        this.internalCallback();
      }

      // Execute any internal logic
      this.onButtonClick();
    });
  }

  // Method for internal logic when the button is clicked
  onButtonClick() {
    	this.btn.style('transform', 'scale(0.8)');
  }
	
	mouseReleased(callback) {
    // Save the external callback
    this.internalCallback2 = callback;

    // Attach a listener to the button
    this.btn.mouseReleased(() => {
      // Call the internal callback if defined
      if (this.internalCallback2) {
        this.internalCallback2();
      }

      // Execute any internal logic
      this.onButtonReleased();
    });
  }

  // Method for internal logic when the button is clicked
  onButtonReleased() {
    	this.btn.style('transform', 'scale(1)');
  }
}