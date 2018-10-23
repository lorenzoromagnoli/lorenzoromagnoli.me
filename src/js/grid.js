class gridAnimation {


	constructor(height, width) {

		this.canvas = document.getElementById('paperjsAniamtion');
		paper.setup(this.canvas);

		this.height = view.size.height;
		this.width = view.size.width;

		this.path;
	}

	init() {
		var rectangle = new Rectangle(new Point(50, 80), new Size(500, 500));
		this.path = new Shape.Ellipse(rectangle);
		this.path.fillColor = '#2828E9';

		view.onFrame = (event) => {

		}

		view.onMouseMove = (event) => {
			this.path.position=event.point;
		}
	}
}


export default gridAnimation;
