class Play extends Phaser.Scene {
    constructor() {
        super({key: 'Play'});
    }
    
    init() {
        console.log('Se ha iniciado la escena Play');
    }

    create() {
        const map = this.make.tilemap({key:'nivel-1'});
        const tileset1 = map.addTilesetImage('escenario', 'tiles-1');
        
        map.createStaticLayer('platforms', tileset1)
        const platformsColliders = map.createStaticLayer('platforms_colliders', tileset1)
        
        platformsColliders.setCollisionByProperty({collides: true})
        
    }

    update() {
        
    }
}

export default Play;