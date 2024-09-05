class Character extends Sprite {
    constructor({
        framesHold,
        position,
        velocity,
        image,
        scale = 1,
        framesMax = 1,
        framesElapsed = 0,
        sprites,
        offset = { x: 0, y: 0 }
    }) {
        super({
            position,
            image,
            scale,
            framesMax,
        })

        this.velocity = velocity;
        this.width = 30, this.height = 80;

        this.sword = {width: 80, height: 20, position: {x: 0, y: 0}};
        
        this.health = 100;
        
        this.attackOnCooldown = false;
        this.offset = offset;
        this.framesCurrent = 0;
        this.framesHold = framesHold;
        this.framesElapsed = framesElapsed;
        this.sprites = sprites;
        this.image = image;
        


    }

    handleAttack() {

        if (!this.attackOnCooldown) {
          
          
            setTimeout(() => {
                this.attackOnCooldown = false;
                attackanim = true;
            }, 600);
            attackanim = false; 
            this.attackOnCooldown = true

            this.sword.position.y = this.position.y;
            this.sword.position.x = this.position.x;
            
            if (isCollision(this.sword, enemy)) {
                enemy.registerDamage(10);
            }
        }
    }
    
    registerDamage(damage) {
        this.health -= damage;
        document.querySelector('#playerHealth').style.width = this.health + '%'
        console.log("player health: " + this.health);
    }
    
    update() {
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        this.position.x = Math.max(50, Math.min(948, this.position.x));

        if (this.position.y + this.height >= canvas.height - 110) {
            this.velocity.y = 0;
        } else {
            this.velocity.y += gravity;
        }

        if (isCollision(this, enemy.sword)) {

            console.log('hit by boss');
            this.registerDamage(25);

            isAttacking2 = false

        }

        
        this.animateFrames("player");
        this.draw();
    }
}

const player = new Character({
    image: imageIdlePlayer,
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    offset: { x: 140, y: 240 },
    
    
    sprites: {
        idle:   { image: imageIdlePlayer,   framesMax: 2, framesHold: 10, framesCurrent: 0 },
        run:    { image: imageRunPlayer,    framesMax: 4, framesHold: 5, framesCurrent: 0 },
        jump:   { image: imageJumpPlayer,   framesMax: 1, framesHold: 40, framesCurrent: 0 },
        attack: { image: imageAttackPlayer, framesMax: 5, framesHold: 20, framesCurrent: 0 }
    }
    
});
console.log(player);


