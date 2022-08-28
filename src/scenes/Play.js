import Player from "../entities/Player.js";
import Crusher from "../entities/Crusher.js";

class Play extends Phaser.Scene {
    constructor() {
        super({ key: 'Play' });
    }

    init() {
        console.log('Se ha iniciado la escena Play');
    }

    create() {
        // creamos const para llamar las funciones que crean el map
        const map = this.createMap();
        const layers = this.createLayers(map);
        const playerZones = this.getPlayerZones(layers.playerZones)
        // Const para llamar a la funcion que crea el player
        const player = this.createPlayer(playerZones.start).setScale(1.4);
        const enemies = this.createEnemies(layers.enemySpawns);

        // Acá decimos las colisiones del player
        this.createPlayerColliders(player, {
            colliders: {
                platformsColliders: layers.platformsColliders
            }
        });
        //Enemy Colliders
        this.createEnemyColliders(enemies, {
            colliders: {
                platformsColliders: layers.platformsColliders,
                player
            }
        });

        //EndZone
        this.createEndOfLevel(playerZones.end, player)
        //
        this.setupFollowupCameraOn(player);
        this.physics.world.setBounds(0, 0, 8000, 360);
    }

    // Funcion para llamar el tilmap
    createMap() {
        const map = this.make.tilemap({ key: 'nivel-1' });
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
        const wall2 = map.createStaticLayer('finalwall', tileset);
        // PlayerZones
        const playerZones = map.getObjectLayer('player_zones');
        //Creamos enemigos
        const enemySpawns = map.getObjectLayer('enemy_spawns');
        const enemiesCollides = map.createStaticLayer('enemy_collides', tileset)
        //
        platformsColliders.setCollisionByProperty({ collides: true })
        enemiesCollides.setCollisionByProperty({ collides: true })
        //
        return { platforms, platformsColliders, wall, wall2, playerZones, enemySpawns, enemiesCollides }

    }

    // Funcion para crear al player
    createPlayer(start) {
        return new Player(this, start.x, start.y);
    }

    //
    createPlayerColliders(player, { colliders }) {
        player
            .addCollider(colliders.platformsColliders)
    }

    createEnemies(spawLayers) {
        return spawLayers.objects.map(spawnPoint => {
                return new Crusher(this, spawnPoint.x, spawnPoint.y);
            })
    }

    //
    createEnemyColliders(enemies, { colliders }) {
        enemies.forEach(enemy => {
            enemy
                .addCollider(colliders.platformsColliders)
                .addCollider(colliders.player);
        })
    }

    setupFollowupCameraOn(player) {
        this.cameras.main.startFollow(player);
    }

    //
    getPlayerZones(playerZonesLayers) {
        const playerZones = playerZonesLayers.objects;
        return {
            start: playerZones.find(zone => zone.name === 'startZone'),
            end: playerZones.find(zone => zone.name === 'endZone'),
        }
    }

    //
    createEndOfLevel(end, player) {
        const endOfLevel = this.physics.add.sprite(end.x, end.y, 'end')
            .setAlpha(0)
            .setSize(5, 200);

        const eolOverlap = this.physics.add.overlap(player, endOfLevel, () => {
            eolOverlap.active = false;
            console.log('Player Has Won!')
        })
    }
}

export default Play;