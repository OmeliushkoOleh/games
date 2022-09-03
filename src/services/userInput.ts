export  const pressedKeys ={
    isWPressed:false,
    isSPressed:false,
    isAPressed:false,
    isDPressed:false ,
}
const addEventlisteners = ()=>{

    document.addEventListener("keydown",(e)=>{
      // if(e.key === "w" || e.key === "ц"){
      //   isWPressed = true
      // }  if(e.key === "s" || e.key === "ы" || e.key === "і"){
      //   isSPressed = true
      // } else 
      if(e.key === "a" || e.key === "ф"){
        pressedKeys.isAPressed = true
      } else if(e.key === "d" || e.key === "в") {
        pressedKeys.isDPressed = true
      }
    })

    document.addEventListener("keyup",(e)=>{
      // if(e.key === "w" || e.key === "ц"){
      //   isWPressed = false
      // }  if(e.key === "s" || e.key === "ы" || e.key === "і"){
      //   isSPressed = false
      // } else 
      if(e.key === "a" || e.key === "ф"){
        pressedKeys.isAPressed = false
      } else if(e.key === "d" || e.key === "в") {
        pressedKeys.isDPressed = false
      }
    })
  }

  addEventlisteners()