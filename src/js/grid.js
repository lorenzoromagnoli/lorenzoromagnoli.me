class gridAnimation {

	constructor(height, width) {

		this.canvas = document.getElementById('paperjsAniamtion');
		paper.setup(this.canvas);

		this.height = view.size.height;
		this.width = view.size.width;

		this.words = [];

		this.contents = ['think', 'play', 'code', 'test', 'shit!', 'repeat', 'research', 'design', 'prototype', 'meh!', 'repeat', 'detail', 'polish', 'deliver', 'finally!', 'repeat'];

		this.numberOfRows = 30; //determine the number of rows we want
		this.numberOfColumns = 30; //determine the number of columns we want
		this.offset = 30;
		this.xStep = this.width / this.numberOfColumns; //to make sure they are evenly spaced, we divide the width and height by numberOfColumns
		this.yStep = this.height / this.numberOfRows; //and numberOfRows respectively

	}

	init() {

		for (var x = this.offset; x < this.width - this.offset; x += this.xStep) { //start at the first column, where x = 0
			for (var y = this.offset; y < this.height - this.offset; y += this.yStep) { //go through all the rows (y = 0, y = yStep * 1, y  = yStep * 2, etc.)
				var delay = getRandomInt(500, 5000);
				this.words.push(new Text(x, y, delay));
			}
		}

		view.onFrame = (event) => {
			var millis = event.time * 1000;

			for (var i = 0; i < this.words.length; i++) {
				if (millis - this.words[i].text.lastchange > this.words[i].text.delay) {
					this.words[i].animate(this.contents);
					this.words[i].text.lastchange = millis;
				} else {}
			}
		}
	}
}

function getRandomInt(min, max) {
	var interval = max - min;
	var range = Math.floor(Math.random() * Math.floor(interval));
	var translated = min + range;
	return (translated);
}

function Text(px, py, delay) {
	this.text = new PointText();

	this.text.position.x = px;
	this.text.position.y = py;
	this.text.fontFamily = 'Roboto Mono';
	this.text.fontSize = 8;
	this.text.fillColor = '#ADADAD';
	this.text.content = 'ante:fact';
	this.text.delay = delay;
	this.text.lastchange = 0;
	this.text.currentIndex = 0;
}

Text.prototype = {

	animate: function(contents) {

		if (this.text.currentIndex == 1 || this.text.currentIndex == 5 || this.text.currentIndex == 9) {
			this.text.fillColor = '#2828E9';
		} else {
			this.text.fillColor = '#ADADAD';
		}
		if (this.text.currentIndex == contents.length - 1) {
			this.text.currentIndex = 0;
		} else {
			this.text.currentIndex++;
		}
		this.text.content = contents[this.text.currentIndex];
	}
}

export default gridAnimation;
