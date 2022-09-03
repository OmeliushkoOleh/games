import { fieldSize } from "../components/Game1/Game1"
import { pressedKeys } from "../services/userInput"
import { GameObject } from "./gameObj"

export class Player  extends GameObject{
    width:number = 0
    height:number = 0
    color:string = "#2eff00"
    private _speed:number = 3
  
    move(){  
      if(pressedKeys.isWPressed){
        this.y = this.y - this._speed
      }
      if(pressedKeys.isSPressed){
        this.y = this.y + this._speed
      }
      if(pressedKeys.isAPressed){
        this.x = this.x - this._speed
      }
      if(pressedKeys.isDPressed){
        this.x = this.x + this._speed
      }
      if(this.y <  this.height/2){
        this.y =  this.height/2
      }
      if(this.y > fieldSize.height - this.height/2  ){
        this.y = fieldSize.height - this.height/2
      }
      if(this.x < this.width/2 ){
        this.x =  this.width/2
      }
      if(this.x > fieldSize.width - this.width/2 ){
        this.x = fieldSize.width - this.width/2
      }
      this.render()
    } 
    public set speed(x:number){
      this._speed = x
    }
    public get speed():number{
      return this._speed
    }
    render(){
      this.renderObj.style.left = (this.x - this.width/2).toString() + "px"
      this.renderObj.style.top = (this.y - this.height/2).toString() + "px"
    }
    constructor(){
      super()
      this.x = 350
      this.y = 690
      this.renderObj.classList.add("player")
      this.renderObj.style.backgroundColor = this.color
      this.width = parseFloat(getComputedStyle(this.renderObj).width)
      this.height = parseFloat(getComputedStyle(this.renderObj).height)
      this.renderObj.id = "player"
      this.render()
    } 
  }