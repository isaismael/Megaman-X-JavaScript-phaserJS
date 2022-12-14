import Bootloader from './Bootloader.js';

import Play from './scenes/Play.js';
import Menu from './scenes/Menu.js';
import UI from './scenes/UI.js';

const config = {
    title: "TMegaman X PhaserJS",
    version: "0.0.1",
    type: Phaser.AUTO,
    scale: {
        parent: "phaser_container",
        width: 580,
        height: 340,
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    pixelArt: true,
    physics: {
        default: "arcade",
        arcade: {
            gravity: {
                y: 0
            },
            //debug: true,
        }
    },
    scene: [
        Bootloader,
        UI,
        Play,
        Menu,
    ]
};

new Phaser.Game(config);