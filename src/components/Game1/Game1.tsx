import { parse } from "node:path/win32";
import * as React from "react";
import './Game1.css';
type Game1Props = {
  //
};


let playerCharacteristics = {
  speed:2,
  color:"#2eff00",
  width:120,
}

let fieldSize = {
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





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Game1: React.FC<any> = () => {

  const [mute, setMute] = React.useState(true)

  const [speed, setSpeed] = React.useState(1)



  class Player  extends GameObject{
    width:number = 0
    height:number = 0
    _speed:number = 3
  
    move(){  
      if(isWPressed){
        this.y = this.y - playerCharacteristics.speed
      }
      if(isSPressed){
        this.y = this.y + playerCharacteristics.speed 
      }
      if(isAPressed){
        this.x = this.x - playerCharacteristics.speed
      }
      if(isDPressed){
        this.x = this.x + playerCharacteristics.speed 
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
      this.x = 350
      this.y = 690
      this.renderObj.classList.add("player")
      this.renderObj.style.backgroundColor = playerCharacteristics.color
      this.width = parseFloat(getComputedStyle(this.renderObj).width)
      this.height = parseFloat(getComputedStyle(this.renderObj).height)
      this.renderObj.id = "player"
      this.render()
    } 
  }
  const addEventlisteners = ()=>{

    document.addEventListener("keydown",(e)=>{
      // if(e.key === "w" || e.key === "ц"){
      //   isWPressed = true
      // }  if(e.key === "s" || e.key === "ы" || e.key === "і"){
      //   isSPressed = true
      // } else 
      if(e.key === "a" || e.key === "ф"){
        isAPressed = true
      } else if(e.key === "d" || e.key === "в") {
        isDPressed = true
      }
    })

    document.addEventListener("keyup",(e)=>{
      // if(e.key === "w" || e.key === "ц"){
      //   isWPressed = false
      // }  if(e.key === "s" || e.key === "ы" || e.key === "і"){
      //   isSPressed = false
      // } else 
      if(e.key === "a" || e.key === "ф"){
        isAPressed = false
      } else if(e.key === "d" || e.key === "в") {
        isDPressed = false
      }
    })
  }

  class Bonus  extends GameObject{
    width:number = 0
    height:number = 0
    _speed:number = 1
    id = "bonus" + (Math.random()*1000).toFixed(0)
    move(){
      this.y = this.y + this._speed
      if(this.y > fieldSize.height - this.height/2  ){
        this.y = fieldSize.height - this.height/2
      }
      
      if(parseFloat(document.getElementById("player")!.style.left.split(".")[0]) < this.x && this.x < parseFloat(document.getElementById("player")!.style.left.split(".")[0]) + document.getElementById("player")!.getBoundingClientRect().width && this.y > fieldSize.height - this.height){
        playerCharacteristics.speed = playerCharacteristics.speed + 3

        setTimeout(()=>{         
          playerCharacteristics.speed = playerCharacteristics.speed - 3
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
    del(){
      console.log(document.getElementById(this.id));
    }
  }

  React.useEffect(()=>{
    addEventlisteners()

    let player:Player  = new Player()
    let bonus:Bonus  = new Bonus()
    
    setInterval(()=>{   
      player.move()
      bonus.move()
    },10)
    },[])



    function soundClick() {
      var audio = new Audio(); 
      audio.src="Sounds/Click.mp3";
      audio.play()
    }

    function muteFunc(){
      let mus = document.getElementById("mus")! as HTMLAudioElement
      if(mute === false){
        setMute(true)
      } else{
        setMute(false)
      }
      if(mute === true){
        mus.pause();
      } else{
        mus.play()
      }
    }

    const changeColor = (color:string)=>{
      document.getElementById("player")!.style.backgroundColor = color
    }
    

  return <div className="game1">

    {/* <div data-i18n-key="game1"> </div> */}

    <div id="field"  style={{width:fieldSize.width, height:fieldSize.height}} className="field"></div>
      
    
    <div className="characteristics">
      <button className="but" onClick={()=>{soundClick();playerCharacteristics.speed = playerCharacteristics.speed + 2}}>speed Up</button>
      <button className="but" onClick={()=>{soundClick();playerCharacteristics.speed = playerCharacteristics.speed - 2}}>speed Down</button>
      <button className="but" onClick={()=>{soundClick(); changeColor("blue")}}>color1</button>
      <button className="but" onClick={()=>{soundClick(); changeColor("green")}}>color2</button>
      <button className="but" onClick={()=>{soundClick(); changeColor("#2eff00")}}>color standart</button>
      <button className="but" onClick={()=>{muteFunc()}}>{mute === false?"Unmute":" Mute"}</button>
      <audio id="mus" src="Sounds/Cosmic.mp3" autoPlay={true} loop={true} ></audio>  
    </div>   
  </div>;
};

export default Game1;
