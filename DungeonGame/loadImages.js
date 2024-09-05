// Modify loadImage function to accept a callback
const loadImage = (src, callback) => {
    const img = new Image();
    img.onload = callback   ;  // Use the callback function instead of handleImageLoad
    img.src = src;
    return img;
};

// Define callback functions for each image
function handleIdlePlayerLoad() {
    // console.log('Idle Player image loaded');
}

function handleRunPlayerLoad() {
   // console.log('Run Player image loaded');
}

function handleJumpPlayerLoad() {
   // console.log('Jump Player image loaded');
}

function handleAttackPlayerLoad() {
   // console.log('Attack Player image loaded');
}

function handleIdleEnemyLoad() {
   // console.log('Idle Enemy image loaded');
}

function handleAttackEnemyLoad() {
   // console.log('Attack Enemy image loaded');
}

function handleBackgroundLoad() {
   // console.log('Background image loaded');
}

// Define the callback function for the last image
function handleLastImageLoad() {
    console.log('Last image load');
    StartGame();  // Start your game
}

// Load images with the modified loadImage function
const imageIdlePlayer = loadImage("./img/iron_sentinel_idle.png", handleIdlePlayerLoad);
const imageRunPlayer = loadImage("./img/iron_sentinel_run.png", handleRunPlayerLoad);
const imageJumpPlayer = loadImage("./img/iron_sentinel_jump.png", handleJumpPlayerLoad);
const imageAttackPlayer = loadImage("./img/iron_sentinel_combo_a.png", handleAttackPlayerLoad);
const imageIdleEnemy = loadImage("./img/Minotaur-idle.png", handleIdleEnemyLoad);
const imageAttackEnemy = loadImage("./img/Minotaur-attack.png", handleAttackEnemyLoad);
const imageBackground = loadImage("./img/background.png", handleBackgroundLoad);
const imageLevel1 = loadImage("./img/level-1 (1).png", handleLastImageLoad);
