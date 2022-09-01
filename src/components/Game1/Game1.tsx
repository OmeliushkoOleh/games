import * as React from "react";
import './Game1.css';
type Game1Props = {
  //
};

let fieldSise = {
  width:700,
  height:700,
}


abstract class GameObject {
  renderObj:HTMLElement 
  x:number = 0
  y:number = 0
  abstract move():void 
  constructor(){
    this.renderObj = document.createElement("div");
    this.renderObj.classList.add("game_object")
    let field = document.getElementById("field")
    field!.appendChild(this.renderObj);
  } 
  abstract render():void
}





let isWPressed:boolean = false
let isSPressed:boolean = false
let isAPressed:boolean = false
let isDPressed:boolean = false


let gameObjects:GameObject[] = []


const Game1: React.FC<any> = () => {

  const [speed, setSpeed] = React.useState(1)

  class Player  extends GameObject{
    width:number = 0
    height:number = 0
    _speed:number = 1
  
    move(){  
      if(isWPressed){
        this.y = this.y - this._speed 
      }
      if(isSPressed){
        this.y = this.y + this._speed 
      }
      if(isAPressed){
        this.x = this.x - this._speed  
      }
      if(isDPressed){
        this.x = this.x + this._speed 
      }
      if(this.y <  this.height/2){
        this.y =  this.height/2
      }
      if(this.y > fieldSise.height - this.height/2 ){
        this.y = fieldSise.height - this.height/2 
      }
      if(this.x < this.width/2 ){
        this.x =  this.width/2
      }
      if(this.x > fieldSise.width - this.width/2 ){
        this.x = fieldSise.width - this.width/2
      }
      this.render()
      
    } 
    public set speed(x:number){
      this._speed = x
      setSpeed(this._speed)
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
      this.x = 10
      this.y = 10
      this.renderObj.classList.add("player")
      this.renderObj.style.backgroundColor = `yellow`
      this.width = parseFloat(getComputedStyle(this.renderObj).width)
      this.height = parseFloat(getComputedStyle(this.renderObj).height)
      this.render()
    } 
  
  }
  const addEventlisteners = ()=>{
    document.addEventListener("keydown",(e)=>{
      if(e.key === "w" || e.key === "ц"){
        isWPressed = true
      }  if(e.key === "s" || e.key === "ы" || e.key === "і"){
        isSPressed = true
      } else if(e.key === "a" || e.key === "ф"){
        isAPressed = true
      } else if(e.key === "d" || e.key === "в") {
        isDPressed = true
      }
      
    })
    document.addEventListener("keyup",(e)=>{
      if(e.key === "w" || e.key === "ц"){
        isWPressed = false
      }  if(e.key === "s" || e.key === "ы" || e.key === "і"){
        isSPressed = false
      } else if(e.key === "a" || e.key === "ф"){
        isAPressed = false
      } else if(e.key === "d" || e.key === "в") {
        isDPressed = false
      }
    })
  }


  React.useEffect(()=>{

    addEventlisteners()
    let player:Player  = new Player()
    setInterval(()=>{   
      player.move()
    },10)
    },[])






  return <div className="game1">
    <h3>Game1</h3>

    <div id="field"  style={{width:fieldSise.width, height:fieldSise.height}} className="field">
      
    </div>
    <div>Speed :{speed}</div>
    <button onClick={()=>{setSpeed(speed + 1)}}>speed Up</button>
    <button onClick={()=>{setSpeed(speed - 1)}}>speed Down</button>
    
  </div>;
};

export default Game1;
