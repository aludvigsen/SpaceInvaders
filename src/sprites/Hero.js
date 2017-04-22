import Phaser from 'phaser'

export default class extends Phaser.Sprite {
	constructor () {
		super(game, game.scale.bounds.width / 2, game.scale.bounds.height - 50, 'ship')
		
		console.log("width", );
		this.anchor.setTo(0.5, 0.5)

		//  And some controls to play the game with
	    this.cursors = game.input.keyboard.createCursorKeys();
	    this.fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

	    // Enable physics
		game.physics.enable(this, Phaser.Physics.ARCADE);
		

		this.bulletTime = 0
		//  Our bullet group
		this.bullets = game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.bullets.createMultiple(30, 'bullet');
		this.bullets.setAll('anchor.x', 0.5);
		this.bullets.setAll('anchor.y', 1);
		this.bullets.setAll('outOfBoundsKill', true);
		this.bullets.setAll('checkWorldBounds', true);

		game.add.existing(this);
	}

	fireBullet() {

		//  To avoid them being allowed to fire too fast we set a time limit
		if (game.time.now > this.bulletTime) {
		    //  Grab the first bullet we can from the pool
		    let bullet = this.bullets.getFirstExists(false);

		    if (bullet) {
		        //  And fire it
		        bullet.reset(this.x, this.y + 8);
		        bullet.body.velocity.y = -400;
		        this.bulletTime = game.time.now + 200;
		    }
		}

	}

	update () {
		let {alive, body, cursors, fireButton} = this

		if (alive) {
			//  Reset the player, then check for movement keys
			body.velocity.setTo(0, 0);

			if (cursors.left.isDown && body.x > 0) {
			    body.velocity.x = -game.width/3;
			} else if (cursors.right.isDown && (body.x + this.width) < game.width) {
			    body.velocity.x = game.width/3;
			}

			//  Firing?
			if (fireButton.isDown) this.fireBullet();
		}
	}
}
