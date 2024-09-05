
class Sprite {
    constructor({
        framesHold,
        position,
        image,
        scale = 1,
        framesMax = 9,
        sprites,
        offset = { x: 0, y: 0 }
        
        
    }) {
        this.position = position
        this.height = 150
        this.image = image
        this.scale = scale
        this.framesMax = framesMax
        this.framesCurrent = 0
        this.framesElapsed = 0
        this.framesHold = framesHold
        this.offset = offset
        this.sprites = sprites
        
    }

    

    draw() {
        
        c.drawImage(this.image, this.framesCurrent * (this.image.width / this.framesMax),
            0,
            this.image.width / this.framesMax,
            this.image.height,
            this.position.x - this.offset.x,
            this.position.y - this.offset.y,
            (this.image.width / this.framesMax) * this.scale,
            this.image.height * this.scale
        )

    }
    animateFrames(animation) {
      // console.log(
      //   `animation ${animation}`,
      //   `this.framesElapsed ${this.framesElapsed}`,
      //   `this.framesHold ${this.framesHold}`,
      //   `this.framesCurrent ${this.framesCurrent}`,
      //   `this.framesMax ${this.framesMax}`,
      //   `${this.framesCurrent < this.framesMax - 1}`
      // )
      this.framesElapsed++;
      
      if (this.framesElapsed % this.framesHold === 0) {
        if (this.framesCurrent < this.framesMax - 1) {
          this.framesCurrent++;
        } else {
          this.framesCurrent = 0;
        }
        this.framesElapsed = 0; // reset framesElapsed to 0
      }
    }

    update() {
        this.draw();
        this.animateFrames();
    }
} 

