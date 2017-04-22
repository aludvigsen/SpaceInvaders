import Enemy from './Enemy'

export default class EnemyManager {
	constructor({hero}){
		this.hero = hero
		this.firingTimer = 0

		// The enemy's bullets
		this.bullets = game.add.group();
		this.bullets.enableBody = true;
		this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
		this.bullets.createMultiple(30, 'enemyBullet');
		this.bullets.setAll('anchor.x', 0.5);
		this.bullets.setAll('anchor.y', 1);
		this.bullets.setAll('outOfBoundsKill', true);
		this.bullets.setAll('checkWorldBounds', true);

		this.enemies = game.add.group();
		this.enemies.enableBody = true;
	    this.enemies.physicsBodyType = Phaser.Physics.ARCADE;
	    for (var y = 0; y < 4; y++) {
			for (var x = 0; x < 10; x++) {
				let xPos = 50 + x * 48
				let yPos = 50 + y * 50
				let enemy = new Enemy({ x: xPos, y: yPos, bullets: this.bullets, hero: this.hero })
				this.enemies.add(enemy)
			}
		}

		this.init()
	}

	init() {
		this.enemies.callAll('revive')
		this.enemies.callAll('reset')
	}

	fire() {
		if (game.time.now > this.firingTimer) {
			console.log('fire!')
			//  Grab the first bullet we can from the pool
		    

		    let livingEnemies = [];
		    this.enemies.forEachAlive(enemy => livingEnemies.push(enemy));

		    if (livingEnemies.length > 0) {

		    	var random = game.rnd.integerInRange(0, livingEnemies.length-1);

		        // randomly select one of them
		        var shooter = livingEnemies[random];

		        shooter.fireBullet()

		        
		        this.firingTimer = game.time.now + 2000;
		    }
		}
	}

	reachedBottom() {
		let bottom = false
		this.enemies.forEachAlive(enemy => {
			if(enemy.y >= this.hero.y)
				bottom = true
		})
		return bottom
	}

	cleanUp() {
		this.enemies.callAll('kill')
		this.bullets.callAll('kill') 
	}
}