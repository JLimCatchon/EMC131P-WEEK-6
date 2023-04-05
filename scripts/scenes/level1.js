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
    //L-O-A-D A-S-S-E-T-S
    //change Everything about this
    this.load.image('bg', 'assets/background/game_background_4.png');
    this.load.image('bomb', 'assets/misc/boxBomb.png');
    this.load.image('bullet', 'assets/misc/testbullet.png')
    //change alr
    this.load.spritesheet('wizard', 'assets/spritesheet/AnimationSheet_Character.png', { frameWidth: 32, frameHeight: 32 });
    this.load.audio('pop', 'assets/sounds/pop.wav')
}

create ()
{

    // C-A-M-E-R-A
    this.cameras.main.setAngle(90);
    this.cameras.main.setBounds(0, 0, this.physics.world.bounds.width, this.physics.world.bounds.height);
    
    // S-O-U-N-D-S
    bulletSound = this.sound.add('pop');

    // I-M-A-G-E-S
    this.add.image(400, 300, 'bg').setAngle(270);

    
    // P-L-A-Y-E-R 
    player = this.physics.add.sprite(400, 680, 'wizard');
    player.setCollideWorldBounds(true);
    player.setGravity(0,0);

    this.anims.create({
        key: 'stable',
        frames: [ { key: 'wizard', frame: 0 } ],
        frameRate: 10,
        repeat: -1
    });
    // C-O-N-T-R-O-L-S
    cursors = this.input.keyboard.createCursorKeys();
    spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // T-E-X-T
    scoreText = this.add.text(50, 750, 'Score: 0', { fontSize: '32px', fill: '#fff' }); 
    scoreText.setRotation(-Math.PI / 2); 
    
    playerTimeText = this.add.text(50, 200, 'Time: 0:00', { fontSize: '32px', fill: '#fff' }); 
    playerTimeText.setRotation(-Math.PI / 2); 
    
    // B-U-L-L-E-T-S
    bullets = this.physics.add.group({
        defaultKey: {key: 'bullet'},
        maxSize: 2000,
        allowGravity: true,
        worldBounds: true
      
      });
    // E-N-E-M-Y S-P-A-W-N
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
        
    })

    enemy.children.iterate(function(child) {
        child.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(200, 400)).setScale(0.5);;
    });

    // C-O-L-L-I-D-E-R
    this.physics.add.overlap(bullets, enemy, onHit, null, this);
    this.physics.add.overlap(player, enemy, collideEnemyAndBullet, null, this);
    this.physics.add.overlap(player, bullets, collideEnemyAndBullet, null, this);
}



update ()
{
    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);
        
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);
    }
    else
    {
        player.setVelocityX(0);
        player.anims.play('stable', true);
    }
    if (spaceKey.isDown && this.time.now > lastFired + bulletCooldown) {
        firedBullet();
        lastFired = this.time.now;
        player.anims.play('stable', true);
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

