var player;
var enemy;
var cursors;
var shoot;
var score = 0;
var scoreText;
var playerTime = 0;
var minutes = 0;
var seconds = 0;
var playerTimeText;
var bullets;
var lastFired = 0;
var clickSoundEffect;
var bulletCooldown = 200;
var bulletSound;
var enemies;
var spaceKey;

class level1 extends Phaser.Scene{
    constructor(){
        super('level1');
    }


preload ()
{
    //change Everything about this
    this.load.image('bg', 'assets/background/bg.png');
    this.load.image('ground', 'assets/misc/platform.png');
    this.load.image('bomb', 'assets/misc/boxBomb.png');
    this.load.image('bullet', 'assets/misc/testbullet.png')
    this.load.spritesheet('dude', 'assets/spritesheet/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.audio('pop', 'assets/sounds/pop.wav')
}

create ()
{

    bulletSound = this.sound.add('pop');

    this.cameras.main.setAngle(90);
    this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);
    this.add.image(400, 300, 'bg');

    player = this.physics.add.sprite(400, 680, 'dude');
    player.setCollideWorldBounds(true);
    player.setGravity(0,0);

    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    cursors = this.input.keyboard.createCursorKeys();
    spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    scoreText = this.add.text(100, 680, 'Score: 0', { fontSize: '32px', fill: '#fff' }); 
    scoreText.setRotation(-Math.PI / 2); 
    
    playerTimeText = this.add.text(100, 200, 'Time: 0:00', { fontSize: '32px', fill: '#fff' }); 
    playerTimeText.setRotation(-Math.PI / 2); 
    
    
    bullets = this.physics.add.group({
        defaultKey: {key: 'bullet'},
        maxSize: 2000,
        allowGravity: true,
        runChildUpdate: true,
        worldBounds: true,
        debug: true  
      });
      
      enemy = this.physics.add.group({
        defaultKey: {key: 'bomb'},
        maxSize: 2000,
        allowGravity: true,
        runChildUpdate: true,
        worldBounds: true,
        debug: true  
    });

    enemy.createMultiple({
        key: 'bomb',
        repeat: 5,
        setXY: {
            x: 100,
            y: 0,
            stepX: 100
        },
        setScale: {
            x: 0.5,
            y: 0.5
        }
    });

    enemy.children.iterate(function(child) {
        child.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(200, 400));
    });

   
    this.physics.add.overlap(bullets, enemy, onHit, null, this);
    this.physics.add.overlap(player, enemy, collideEnemyAndBullet, null, this);
    this.physics.add.overlap(player, bullets, collideEnemyAndBullet, null, this);
}



update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
        player.anims.play('right', true);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('turn');
    }
    if (spaceKey.isDown && this.time.now > lastFired + bulletCooldown) {
        firedBullet();
        lastFired = this.time.now;
    }
   timer();
   enemy.getChildren().forEach(function(enemy) {
    if (enemy.y > game.config.height) {
        enemy.destroy();
        createEnemy();
    }
});
}
}

