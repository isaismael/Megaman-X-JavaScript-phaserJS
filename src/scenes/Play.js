import Player from "../entities/Player.js";
import EnemyFly from "../entities/EnemyFly.js";

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
        const player = this.createPlayer().setScale(1.4);
        const enemies = this.createEnemies(layers.enemySpawns);

        
        //Creamos una velocidad para el player
        this.playerSpeed = 200;

        // Agregar las colisiones al player con los colisiones de las plataformas
        // Acá decimos que va a colisionar con qué
        this.physics.add.collider(player, layers.platformsColliders);
        this.physics.add.collider(enemies, player)

        this.setupFollowupCameraOn(player);

        this.physics.world.setBounds( 0, 0, 8000, 360);
    }

    

    // Funcion para llamar el tilmap
    createMap () {
        const map = this.make.tilemap({key:'nivel-1'});
        map.addTilesetImage('escenario', 'tiles-1');
        map.addTilesetImage('enviroment', 'tiles-2')

        return map;
    }

    // funcion que pinta los tiles en el juego y agregamos colisiones
    createLayers(map) {
        const tileset = map.getTileset('escenario')
        const tileset2 = map.getTileset('enviroment')
        const platformsColliders = map.createStaticLayer('platforms_colliders', tileset);
        const platforms = map.createStaticLayer('platforms', tileset);
        const wall = map.createStaticLayer('wall_colliders', tileset2);
        const wall2 = map.createStaticLayer('finalwall', tileset)
        //Creamos enemigos
        const enemySpawns = map.getObjectLayer('enemy_spawns')

        platformsColliders.setCollisionByProperty({collides: true})

        return{platforms, platformsColliders, wall, wall2, enemySpawns}
    }

    // Funcion para crear al player
    createPlayer() {
        return new Player(this, 400, 180);
    }

    createEnemies(spawLayers) {
        
        return spawLayers.objects.map(spawnPoint => {

            return new EnemyFly(this, spawnPoint.x, spawnPoint.y).setScale(1.5);
        })

    }

    setupFollowupCameraOn(player) {
        this.cameras.main.startFollow(player);
    }
}

export default Play;