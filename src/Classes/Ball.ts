import { fieldSize, player } from "../components/Game1/Game1"
import { GameObject } from "./gameObj"

export   class Ball  extends GameObject{
    width:number = 16
    height:number = 16
    speedX:number = 2
    speedY:number = 1
    color:string = "white"
    intersect(obj:GameObject):boolean{
        var rect= this.renderObj.getBoundingClientRect();
        var rectSelection = obj.renderObj.getBoundingClientRect();
        if(rect.bottom  > rectSelection.top 
          && rect.right > rectSelection.left 
          && rect.top < rectSelection.bottom 
          && rect.left < rectSelection.right) {
          return true;
        } else{
          return false
        }

      }
    move(){
      this.x = this.x + this.speedX
      this.y = this.y + this.speedY

    //   if(this.intersect(player)){
    //     this.speedX = - this.speedX 
    //     this.speedY = - this.speedY 
    //   }
    if(this.y + this.height/2 > fieldSize.height ){
        this.destroy()
    }
    var playerBound = player.renderObj.getBoundingClientRect();
    var ballBound = this.renderObj.getBoundingClientRect();

    
    if(this.y + this.height/2 > (fieldSize.height -  player.height) && ballBound.left >  playerBound.left && ballBound.right <  playerBound.right ){
        this.speedY = - this.speedY
    }
    if(this.y - this.height/2 < 0 ){
        this.speedY = - this.speedY
    }
    if(this.x - this.width/2 < 0 ){
        this.speedX = - this.speedX
    }
    if(this.x + this.width/2 > fieldSize.width){
        this.speedX = - this.speedX
    }

      this.render()
    }
    render(){
      this.renderObj.style.left = (this.x - this.width/2).toString() + "px"
      this.renderObj.style.top = (this.y - this.height/2).toString() + "px"
    }
    constructor(){
      super()
      this.x = 350
      this.y = 350
      this.renderObj.classList.add("bonus")
      this.renderObj.style.backgroundColor = this.color
      this.width = parseFloat(getComputedStyle(this.renderObj).width)
      this.height = parseFloat(getComputedStyle(this.renderObj).height)
      this.render()
    } 
  }