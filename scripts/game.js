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
    
  
//Score,Enemy, bullet
/*collect star check it to bulletCollide(bullet, enemy){

}*/

//Collider For Enemy And Player
/*stay but change it to collideEnemy(player, enemy){
    this.physics.pause();
    player.disableBody(true,true);
    this.scene.start('endScene',score,minutes,seconds);

}*/

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
    playerTime+= 0.1;
}




function collectStar (player, star)
{
    star.disableBody(true, true);
    score += 10;
    boxCollected += 1;
    scoreText.setText('Score: ' + score);
    boxScoreText.setText('Box Collected: ' + boxCollected);

    if (boxCollected % 5 === 0) {
        player.setScale(player.scaleX + 0.1, player.scaleY + 0.1);
    }
    if (box.countActive(true) === 0)
    {
        box.children.iterate(function (child) {
            child.enableBody(true, Math.random() * game.config.width - 10, 0, true, true);
        });

        var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);
        var bomb = bombs.create(x, 16, 'bomb');
        bomb.setBounce(1);
        bomb.setCollideWorldBounds(true);
        bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
        bomb.allowGravity = false;
    }
}