// Modify loadImage function to accept a callback
// const loadImage = (src, callback) => {
//     const img = new Image();
//     img.onload = callback;  // Use the callback function instead of handleImageLoad
//     img.src = src;
//     return img;
// };

// // Define the callback function for the last image
// function handleLastImageLoad() {
//     console.log('last image load')
//     StartGame();  // Start your game

// }

// // Load images with the modified loadImage function
// const imageIdlePlayer = loadImage("./img/iron_sentinel_idle.png", handleImageLoad);
// const imageRunPlayer = loadImage("./img/iron_sentinel_run.png", handleImageLoad);
// const imageJumpPlayer = loadImage("./img/iron_sentinel_jump.png", handleImageLoad);
// const imageAttackPlayer = loadImage("./img/iron_sentinel_combo_a.png", handleImageLoad);
// const imageIdleEnemy = loadImage("./img/Minotaur-idle.png", handleImageLoad);
// const imageAttackEnemy = loadImage("./img/Minotaur-attack.png", handleImageLoad);
// const imageBackground = loadImage("./img/background.png", handleImageLoad);
// const imageLevel1 = loadImage("./img/level-1 (1).png", handleLastImageLoad);




const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');


canvas.width = 1024;
canvas.height = 576;

c.fillRect(0, 0, canvas.width, canvas.height);
const gravity = 0.80;

let isMovingRight = false;
let isMovingLeft = false;
let isAttacking = false;
let isAttacking2 = false;
let keyPressed = false;
let isArrowdownReleased = true;

let attackanim = true;
let currentSprite = '';
let currentSpriteEnemy = '';
let enemyIdle = true;
let enemyAttack = false;
let shift = false;
c.imageSmoothingEnabled = false;

function isCollision(obj1, obj2) {

    if (obj2 && obj2.position) {

        return (
            obj1.position.x < obj2.position.x + obj2.width &&
            obj1.position.x + obj1.width > obj2.position.x &&
            obj1.position.y < obj2.position.y + obj2.height &&
            obj1.position.y + obj1.height > obj2.position.y

        );

    }
    else {
        return false;
    }
}


function bossAttack() {
    isAttacking2 = false;
    enemyIdle = true;
    enemyAttack = false

    setTimeout(() => {
        enemyIdle = false;
        enemyAttack = true
        isAttacking2 = true;

    }, 2000);

}


const bossAttackTimer = setInterval(bossAttack, 3000);




const background = new Sprite({
    position: { x: 10, y: 0 },
    image: imageBackground,
    framesMax: 1
});

const level1 = new Sprite({
    position: {
        x: 0,
        y: -1,
    },

    image: imageLevel1,
    framesMax: 1

});






let lastTic = Date.now();
// let deltaTime = 0;
function StartGame() {
    timer()
}

function timer() {
    // let deltaTime = lastTic -
    if (Date.now() > lastTic + 16) {
        lastTic = Date.now();
        animate();
    }

    window.requestAnimationFrame(timer);
}

let tics = 0;
function animate() {

    // setTimeout(() => {
    // window.requestAnimationFrame(animate);
    // }, 1000/240);   

    if (tics < 60) {
        tics++
    } else {
        tics = 0;
    }
    // console.log(tics)

    updatePlayerVelocity();
    background.update();
    level1.update();

    enemy.update();
    player.update();


    // enemy movement
    if (enemyIdle == true) {
        checkCurrentSpriteE('idle');
        enemy.image = enemy.sprites.idle.image;
        enemy.framesMax = enemy.sprites.idle.framesMax;
        enemy.framesHold = enemy.sprites.idle.framesHold;
    }

    else if (enemyAttack == true) {
        checkCurrentSpriteE('attack');
        enemy.image = enemy.sprites.attack.image;
        enemy.framesMax = enemy.sprites.attack.framesMax;
        enemy.framesHold = enemy.sprites.attack.framesHold;
    }



    // player movement
    if (player.position.y - player.height >= canvas.height - 120) {
        checkCurrentSprite('jump');


        player.image = player.sprites.idle.image
        player.framesMax = player.sprites.idle.framesMax
        player.framesHold = player.sprites.jump.framesHold
        // player.framesCurrent = player.sprites.jump.framesCurrent

    }

    else if (player.velocity.x == 0) {
        checkCurrentSprite('idle');

        player.image = player.sprites.idle.image
        player.framesMax = player.sprites.idle.framesMax
        player.framesHold = player.sprites.idle.framesHold
        //player.framesCurrent = player.sprites.idle.framesCurrent
    }

    else if (player.velocity.x > 0) {
        checkCurrentSprite('run');
        player.image = player.sprites.run.image
        player.framesMax = player.sprites.run.framesMax
        player.framesHold = player.sprites.run.framesHold
        //player.framesCurrent = player.sprites.run.framesCurrent
    }

    else if (player.velocity.x < 0) {
        checkCurrentSprite('run');
        player.image = player.sprites.run.image
        player.framesMax = player.sprites.run.framesMax
        player.framesHold = player.sprites.run.framesHold
        //player.framesCurrent = player.sprites.run.framesCurrent
    }

    if (!attackanim) {
        checkCurrentSprite('attack');
        player.image = player.sprites.attack.image
        player.framesMax = player.sprites.attack.framesMax
        player.framesHold = player.sprites.attack.framesHold
        // player.framesCurrent = player.sprites.attack.framesCurrent

    }




}

window.addEventListener('keydown', (event) => {
    console.log(event.key)
    switch (event.key) {
        case 'ArrowRight':
            isMovingRight = true;
            break;
        case 'ArrowLeft':
            isMovingLeft = true;
            break;
        case 'ArrowUp':
            if (player.position.y + player.height >= canvas.height - 110) {
                player.velocity.y = -12;
            }
            break;
        case 'ArrowDown':
            if (isArrowdownReleased) {
                isArrowdownReleased = false;
                player.handleAttack();
            }
            break;

        case 'z':
            isMovingRight = true;
            if (dash == true) {

                setTimeout(() => {

                    player.velocity.x = 20
                    

                }, 200);
                dash = false


                console.log("dash")
            }
            break;
        case 'Shift':
            shift = true;
            break;

    }

});


function checkCurrentSprite(status) {
    if (currentSprite != status) {
        player.framesCurrent = 0;
        currentSprite = status;
    }
}
function checkCurrentSpriteE(status) {
    if (currentSpriteEnemy != status) {
        enemy.framesCurrent = 0;
        currentSpriteEnemy = status;
    }
}

window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case 'ArrowRight':
            isMovingRight = false;
            break;
        case 'ArrowLeft':
            isMovingLeft = false;
            break;
        case 'ArrowDown':
            isArrowdownReleased = true;

            break;

        case 'Shift':
            shift = false;
            break;
    }

    if (!isMovingLeft && !isMovingRight) {
        player.velocity.x = 0;
    }
    // if (!isAttacking) {
    //     player.sword.position.y = 1000;
    // }

});


function updatePlayerVelocity() {
   

     if (isMovingRight && shift) {
        player.velocity.x = 10;
    } else if (isMovingLeft && shift) {
        player.velocity.x = -10;
    }
      else if (isMovingRight) {
        player.velocity.x = 4;
    } else if (isMovingLeft) {
        player.velocity.x = -4;
    } 
}


