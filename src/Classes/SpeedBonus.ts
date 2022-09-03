import { fieldSize, player } from "../components/Game1/Game1"
import { GameObject } from "./gameObj"

export   class SpeedBonus  extends GameObject{
    width:number = 0
    height:number = 0
    _speed:number = 1
    color:string = "blue"
    move(){
      this.y = this.y + this._speed
      if(this.y > fieldSize.height - this.height/2  ){
        this.y = fieldSize.height - this.height/2
        this.destroy()
      }

      if(this.intersect(player)){
        player.speed = player.speed + 3

        this.destroy()

        setTimeout(()=>{         
            player.speed = player.speed - 3
        },3000)
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
      this.y = 50
      this.renderObj.classList.add("bonus")
      this.renderObj.style.backgroundColor = this.color
      this.width = parseFloat(getComputedStyle(this.renderObj).width)
      this.height = parseFloat(getComputedStyle(this.renderObj).height)
      this.render()
    } 
  }