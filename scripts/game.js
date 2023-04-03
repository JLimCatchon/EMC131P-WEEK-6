var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: [menuScene,level1,creditScene,gameOverScene]
};
var game = new Phaser.Game(config);

//fired Bullet

function firedBullet() {
   
    var bullet = bullets.get(player.x, player.y - 16, 'bullet');
    if (bullet) {
        bullet.setVelocityY(-600);
        bullet.body.onWorldBounds = true;
        bullet.worldboundsKill = true;
    }
    }
    
function onHit(bullets,enemy){
    enemy.destroy();
    bullets.destroy();
    score+= 1;
    scoreText.setText('Score: ' + score);
}

function collideEnemy(player,enemy){
    this.physics.pause();
    player.disableBody(true,true);
    this.scene.start('endScene',score,minutes,seconds);
}

function hitBomb (player, bomb){
    this.physics.pause();
    player.disableBody(true,true);
    this.scene.start('endScene',score);
    }

//timer for survival length
function timer(){
    //return minutes and seconds to gameOverScene
    minutes = Math.floor(playerTime / 60);
    seconds = Math.floor(playerTime % 60);
    playerTimeText.setText('Time: ' + minutes + ':' + seconds.toString().padStart(2, '0'));
    playerTime+= 0.01;
}


