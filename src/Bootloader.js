class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {
        // Tiles Escenario
        this.load.tilemapTiledJSON('nivel-1', 'assets/map_one.json');
        this.load.image('tiles-1', 'assets/escenario.png');

        // Player
        //this.load.image('player', '/assets/player_spritesheet.png')

        this.load.spritesheet('playeranims', '/assets/player_spritesheet.png', {
            frameWidth: 35,
            frameHeight: 46
        })

        this.load.on('complete', () => {
            this.scene.start('Play');
        });
    }
}
export default Bootloader;