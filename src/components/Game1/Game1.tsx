import { parse } from "node:path/win32";
import * as React from "react";
import './Game1.css';
import * as rxjs from "rxjs"
import { Player } from "../../Classes/Player";
import { GameObject } from "../../Classes/gameObj";
import { Bonus } from "../../Classes/Bonus";
type Game1Props = {
  //
};


export let player:Player


export const fieldSize = {
  width:700,
  height:700,
}


let gameObjects:GameObject[] = []





////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const Game1: React.FC<any> = () => {

  const [mute, setMute] = React.useState(true)

  const [speed, setSpeed] = React.useState(1)


  const [gameObjectsarr, setGameObjects] = React.useState(gameObjects || [])

  React.useEffect(()=>{
    player  = new Player()
    let bonus:Bonus  = new Bonus()
    gameObjects.push(player,bonus)
    setGameObjects(gameObjects)
    
    setInterval(()=>{  
      let newArr = gameObjectsarr.filter((e)=>{
        return e.isDestroyed !== true

      })
      setGameObjects(newArr)
      newArr.forEach((e:any)=>{
        e.move()
      }) 
    },10)
    },[])



    // const stream$ = rxjs.interval(1000)

    // stream$.subscribe((val)=>{
    //   console.log(val);
      
    // })


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
      <button className="but" onClick={()=>{soundClick();player.speed = player.speed + 2}}>speed Up</button>
      <button className="but" onClick={()=>{soundClick();player.speed = player.speed - 2}}>speed Down</button>
      <button className="but" onClick={()=>{soundClick(); changeColor("blue")}}>color1</button>
      <button className="but" onClick={()=>{soundClick(); changeColor("green")}}>color2</button>
      <button className="but" onClick={()=>{soundClick(); changeColor("#2eff00")}}>color standart</button>
      <button className="but" onClick={()=>{muteFunc()}}>{mute === false?"Unmute":" Mute"}</button>
      <audio id="mus" src="Sounds/Cosmic.mp3" autoPlay={true} loop={true} ></audio>  
    </div>   
  </div>;
};

export default Game1;
