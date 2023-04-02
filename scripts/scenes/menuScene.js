class menuScene extends Phaser.Scene{
    constructor(){
        super('menuScene');
    }

    preload(){
        
        this.load.image('play','assets/misc/play.png');
        this.load.image('creditsButton','assets/misc/credits.png');
        this.load.image('menuBackground', 'assets/background/bg.png');
        this.load.image('exitMain', 'assets/misc/exitmain.png');

    }

    create(){
        
        this.add.image(400, 300, 'menuBackground');
        const playButton = this.add.image(400,250,'play').setScale(0.5);
        playButton.setInteractive();
        playButton.on('pointerdown', () => {this.scene.start('level1');
        score = 0;
        });
        
        const creditButton = this.add.image(400,350,'creditsButton').setScale(0.5);
        creditButton.setInteractive();
        creditButton.on('pointerdown', () => {this.scene.start('credits')});
        
        const exitGame = this.add.image(400,450,'exitMain').setScale(.5);
        exitGame.setInteractive();
        exitGame.on('pointerdown', () => {alert('Game Exited')});

    }

    update(){

    }
}