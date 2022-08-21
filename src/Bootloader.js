class Bootloader extends Phaser.Scene {
    constructor() {
        super('Bootloader'); 
    }

    preload() {

        this.load.tilemapTiledJSON('nivel-1', 'assets/map_one.json');
        this.load.image('tiles-1', 'assets/escenario.png');

        this.load.on('complete', () => {
            this.scene.start('Play');
        });
    }
}
export default Bootloader;