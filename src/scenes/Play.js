import Player from "../entities/Player.js";

class Play extends Phaser.Scene {
    constructor() {
        super({key: 'Play'});
    }
    
    init() {
        console.log('Se ha iniciado la escena Play');
    }

    create() {
        // creamos const para llamar las funciones que crean el map
        const map = this.createMap();
        const layers = this.createLayers(map);

        // Const para llamar a la funcion que crea el player
        const player = this.createPlayer();

        //Creamos una velocidad para el player
        this.playerSpeed = 200;

        // Agregar las colisiones al player con los colisiones de las plataformas
        // Acá decimos que va a colisionar con qué
        this.physics.add.collider(player, layers.platformsColliders);

    }

    // Funcion para llamar el tilmap
    createMap () {
        const map = this.make.tilemap({key:'nivel-1'});
        map.addTilesetImage('escenario', 'tiles-1');

        return map;
    }

    // funcion que pinta los tiles en el juego y agregamos colisiones
    createLayers(map) {
        const tileset = map.getTileset('escenario')
        const platformsColliders = map.createStaticLayer('platforms_colliders', tileset);
        const platforms = map.createStaticLayer('platforms', tileset);

        platformsColliders.setCollisionByProperty({collides: true})

        return{platforms, platformsColliders}
    }

    // Funcion para crear al player
    createPlayer() {
        return new Player(this, 150, 100);
    }

}

export default Play;