var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 800,
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


function firedBullet() {
    var bullet = bullets.get(player.x, player.y - 40, 'bullet').setScale(2);
        bullet.setVelocityY(-600);
        bullet.body.onWorldBounds = true;
        bullet.worldboundsKill = true;
        bulletSound.play();
    }
    
function onHit(bullets,enemies){
    enemies.destroy();
    bullets.destroy();
    score += 1;
    scoreText.setText('Score: ' + score);
    createEnemy();
    enemyHitSFX.play();
    
}
 
function collideEnemyAndBullet(player,enemy,bullets){
    this.physics.pause();
    player.disableBody(true,true);
    this.scene.start('endScene',score,minutes,seconds);
    gameBGM.stop();
}

function timer(){
    minutes = Math.floor(playerTime / 60);
    seconds = Math.floor(playerTime % 60);
    playerTimeText.setText('Time: ' + minutes + ':' + seconds.toString().padStart(2, '0'));
    playerTime+= 0.01;
}
function createEnemy(){
     var x = Phaser.Math.Between(100, 600);
     var y = -50;
     var newEnemy = enemy.create(x, y, 'frog');
     newEnemy.setScale(0.5);
     newEnemy.setVelocity(Phaser.Math.Between(-200, 200), Phaser.Math.Between(200, 400));
}


