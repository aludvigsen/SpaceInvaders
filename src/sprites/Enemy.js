import Phaser from 'phaser'

export default class extends Phaser.Sprite {
	constructor ({ x, y, hero, bullets }) {
		super(game, x, y, 'invader')
		this.originalX = x
		this.originalY = y
		this.direction = 'right'
		this.hero = hero
		this.bullets = bullets
		this.anchor.setTo(0.5, 0.5)
		this.animations.add('fly', [ 0, 1, 2, 3 ], 20, true)
		this.play('fly')
		game.physics.enable(this, Phaser.Physics.ARCADE);

		this.game.add.tween(this).to({
			x: this.x + (game.scale.bounds.width - 532) 
		}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

		game.physics.arcade.moveToXY(this, this.x, hero.body.y + 20, 5)
	}

	reset(){
		this.x = this.originalX
		this.y = this.originalY
	}

	fireBullet() {
		let bullet = this.bullets.getFirstExists(false);
		// And fire the bullet from this enemy
        bullet.reset(this.x, this.y);
        bullet.events.onOutOfBounds.add(bullet => bullet.kill(), this);

        game.physics.arcade.moveToObject(bullet, this.hero, 120);
	}

	update(){
		
	}
}
