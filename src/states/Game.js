/* globals __DEV__ */
import Phaser from 'phaser'
import Hero from '../sprites/Hero'
import EnemyManager from '../sprites/EnemyManager'
import ExplosionManager from '../sprites/ExplosionManager'
import ScoreManager from '../sprites/ScoreManager'

export default class extends Phaser.State {

	create () {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE
		game.scale.setUserScale(2,2)
		game.renderer.renderSession.roundPixels = true
		Phaser.Canvas.setImageRenderingCrisp(game.canvas)

		this.enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER);

	    //  The scrolling starfield background
	    this.starfield = game.add.tileSprite(0, 0, document.documentElement.clientWidth, document.documentElement.clientHeight, 'starfield');		

	    //  The hero!
	    this.hero = new Hero()   
	    this.enemyManager = new EnemyManager({hero: this.hero})
	    this.explosionManager = new ExplosionManager()
	    this.scoreManager = new ScoreManager()

	}

	killHero(ultraKill) {

	    this.explosionManager.explode(this.hero.body)

	    // When the hero dies
	    if (this.scoreManager.loseLife() === 0 || ultraKill) {
	    	this.hero.kill();
	    	this.enemyManager.cleanUp()
	    	this.scoreManager.loseGame()

	        //the "press enter to restart" handler
	        this.enterKey.onDown.addOnce(this.restart,this)
	    }
	}

	enemyHitsHero (hero,bullet) {
		bullet.kill()	
		this.killHero()
	}

	heroHitsEnemy (bullet, enemy) {

	    //  When a bullet hits an enemy we kill them both
	    bullet.kill()
	    enemy.kill()

	    //  Increase the score
	    this.scoreManager.increaseScore()	    

	    this.explosionManager.explode(enemy.body)

	    if (this.enemyManager.enemies.countLiving() == 0) {
	    	this.scoreManager.winGame()
	    	this.enemyManager.cleanUp()	    	

	        //the "press enter to restart" handler
	        this.enterKey.onDown.addOnce(this.restart,this)
	    }

	}

	restart () {
	    //  And brings the enemies back from the dead :)
	    this.enemyManager.init()
	    this.scoreManager.init()

	    this.hero.revive()
	}


	update() {
		//  Scroll the background
		this.starfield.tilePosition.y += 2

		if(this.hero.alive && this.enemyManager.enemies.countLiving()) {
			this.enemyManager.fire()

			//  Run collision
			game.physics.arcade.overlap(this.hero.bullets, this.enemyManager.enemies, this.heroHitsEnemy, null, this)
			game.physics.arcade.overlap(this.enemyManager.bullets, this.hero, this.enemyHitsHero, null, this)

			if(this.enemyManager.reachedBottom()) {
				this.killHero(true)
			}
		}
	}
}