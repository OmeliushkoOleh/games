import { fieldSize, player } from "../components/Game1/Game1"
import { GameObject } from "./gameObj"

export   class Bonus  extends GameObject{
    width:number = 0
    height:number = 0
    _speed:number = 1
    id = "bonus" + (Math.random()*1000).toFixed(0)
    move(){
      this.y = this.y + this._speed
      if(this.y > fieldSize.height - this.height/2  ){
        this.y = fieldSize.height - this.height/2
        this.destroy()
      }
      
      // if(parseFloat(document.getElementById("player")!.style.left.split(".")[0]) < this.x && this.x < parseFloat(document.getElementById("player")!.style.left.split(".")[0]) + document.getElementById("player")!.getBoundingClientRect().width && this.y > fieldSize.height - this.height){
      //   playerCharacteristics.speed = playerCharacteristics.speed + 3
      //   this.destroy()
      //   setTimeout(()=>{         
      //     playerCharacteristics.speed = playerCharacteristics.speed - 3
      //   },3000)
      // }
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
      this.width = parseFloat(getComputedStyle(this.renderObj).width)
      this.height = parseFloat(getComputedStyle(this.renderObj).height)
      this.renderObj.id = "bonus" + (Math.random()*1000).toFixed(0)
      this.id = this.renderObj.id
      this.render()
    } 
  }