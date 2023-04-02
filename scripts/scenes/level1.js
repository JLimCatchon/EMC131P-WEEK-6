var player;
//var box;
var bombs;
//var platforms;
var cursors;
var score = 0;
var scoreText;
var playerTime = 0;
var minutes = 0;
var seconds = 0;
var playerTimeText;
var bullets;
class level1 extends Phaser.Scene{
    constructor(){
        super('level1');
    }


preload ()
{
    //change Everything about this
    this.load.image('bg', 'assets/background/bg.png');
    this.load.image('ground', 'assets/misc/platform.png');
    this.load.image('box', 'assets/misc/boxDrop.png');
    this.load.image('bomb', 'assets/misc/boxBomb.png');
    this.load.spritesheet('dude', 'assets/spritesheet/dude.png', { frameWidth: 32, frameHeight: 48 });
}

create ()
{
    this.add.image(400, 300, 'bg');

    player = this.physics.add.sprite(100, 600, 'dude');
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

    /*box = this.physics.add.group({
        key: 'box',
        repeat: 0,
        setXY: { x: game.config.width * Math.random() - Math.random(80), y: Math.random() * game.config.height - 70, stepX: 40 }
    });
    box.children.iterate(function (child) {
    
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    });*/

    //bombs = this.physics.add.group();

    scoreText = this.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' });
    playerTimeText = this.add.text(420, 16, 'Time: 0:00', { fontSize: '32px', fill: '#000' });


    //this.physics.add.overlap(player, enemy, basta collidewithenemy);
    //this.physics.add.collider(player, platforms);
    //this.physics.add.collider(box, platforms);
    //this.physics.add.collider(bombs, platforms);
 
    //this.physics.add.overlap(player, box, collectStar, playerColors, null, this);

    //this.physics.add.collider(player, bombs, hitBomb, null, this);
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
   timer();
}


}
