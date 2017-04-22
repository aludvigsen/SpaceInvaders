class ScoreManager {
	constructor() {
	    game.add.text(game.world.width - 100, 10, 'Lives : ', { font: '28px Arial', fill: '#fff' });

	    //  Lives
	    this.lives = game.add.group();
	    for (var i = 0; i < 3; i++) {
	    	let life = this.lives.create(game.world.width - 100 + (30 * i), 60, 'ship');
	    	life.anchor.setTo(0.5, 0.5);
	    	life.angle = 90;
	    	life.alpha = 0.4;
	    }

	    this.stateText = game.add.text(game.world.centerX,game.world.centerY,' ', { font: '50px Arial', fill: '#fff' });
	    this.stateText.anchor.setTo(0.5, 0.5);
	    this.scoreText = game.add.text(10, 10, '', { font: '28px Arial', fill: '#fff' });
	    this.scoreString = 'Score : ';

	    this.init()
	}

	init(){
		this.lives.callAll('revive');
		this.score = 0
	    this.stateText.visible = false;
	    this.updateScoreText()
	}

	increaseScore(){
		this.score += 1;
	    this.updateScoreText()
	}

	winGame() {
		this.score += 1000;
    	this.updateScoreText()
    	this.stateText.text = " You Won, \n Press enter to restart";
	    this.stateText.visible = true;
	}

	loseGame() {
		this.stateText.text=" GAME OVER \n Press enter to restart";
    	this.stateText.visible = true;
	}

	loseLife() {
		let life = this.lives.getFirstAlive();
		if (life) {
			life.kill();
		}

		return this.lives.countLiving()
	}

	updateScoreText() {
		this.scoreText.text = this.scoreString + this.score
	}

}


export default ScoreManager