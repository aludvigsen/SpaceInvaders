import Phaser from 'phaser'

export default class ExplosionManager {
	constructor () {

		//  An explosion pool
	    this.explosions = game.add.group();
	    this.explosions.createMultiple(30, 'kaboom');
	    this.explosions.forEach(exp => {
			exp.anchor.x = 0.5;
			exp.anchor.y = 0.5;
			exp.animations.add('explodeAnimation');
	    });

	}

	explode(body) {
		//  And create an explosion :)
		let explosion = this.explosions.getFirstExists(false);
		explosion.reset(body.x, body.y);
		explosion.play('explodeAnimation', 30, false, true);
	}
}
