import Phaser from 'phaser'
import { centerGameObjects } from '../utils'

export default class extends Phaser.State {
  init () {}

  preload () {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBg')
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'loaderBar')
    centerGameObjects([this.loaderBg, this.loaderBar])

    this.load.setPreloadSprite(this.loaderBar)
    //
    // load your assets
    //
    this.load.image('bullet', 'assets/images/bullet.png');
    this.load.image('enemyBullet', 'assets/images/enemy-bullet.png');
    this.load.spritesheet('invader', 'assets/images/invader32x32x4.png', 32, 32);
    this.load.image('ship', 'assets/images/player.png');
    this.load.spritesheet('kaboom', 'assets/images/explode.png', 128, 128);
    this.load.image('starfield', 'assets/images/starfield.png');
  }

  create () {
    this.state.start('Game')
  }
}
