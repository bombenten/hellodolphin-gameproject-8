import 'phaser';
import GameScene from './scenes/GameScene';
import GameoverScene from './scenes/GameoverScene';
import StartScene from './scenes/StartScene';
import WinScene from './scenes/WinScene';

const config = {
    // For more settings see <https://github.com/photonstorm/phaser/blob/master/src/boot/Config.js>
    type: Phaser.WEBGL,
    pixelArt: true,
    roundPixels: true,
    parent: 'content',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {x:0}
        }
    },
    scene: [
        StartScene,
        GameoverScene,
        GameScene,
        WinScene
    ]
};

const game = new Phaser.Game(config);