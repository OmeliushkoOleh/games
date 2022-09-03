import { Ball } from "../Classes/Ball"
import { SizeBonus } from "../Classes/SizeBonus"
import { SpeedBonus } from "../Classes/SpeedBonus"
import { gameObjects, globalSetGameObjects, player } from "../components/Game1/Game1"

export const gameManager = ()=>{
    setTimeout(()=>{
        let bonus:SpeedBonus  = new SpeedBonus()
        gameObjects.push(player,bonus)
        globalSetGameObjects(gameObjects)
    },1000)

    setTimeout(()=>{
        let bonus:SizeBonus  = new SizeBonus()
        gameObjects.push(player,bonus)
        globalSetGameObjects(gameObjects)
    },2000)
    setTimeout(()=>{
        let ball:Ball  = new Ball()
        gameObjects.push(ball)
        globalSetGameObjects(gameObjects)
    },20)


}