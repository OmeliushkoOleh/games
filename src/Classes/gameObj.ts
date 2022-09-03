export abstract class GameObject {
    renderObj:HTMLElement 
    x:number = 0
    y:number = 0
    isDestroyed:boolean = false
    intersect(obj:GameObject):boolean{
      var rect= this.renderObj.getBoundingClientRect();
      var rectSelection = obj.renderObj.getBoundingClientRect();
      if(rect.bottom > rectSelection.top 
        && rect.right > rectSelection.left 
        && rect.top < rectSelection.bottom 
        && rect.left < rectSelection.right) {
        return true;
      } else{
        return false
      }
    }
    destroy(){
      this.isDestroyed = true
      this.renderObj.remove()
    }
    abstract move():void 
    constructor(){
      this.renderObj = document.createElement("div");
      this.renderObj.classList.add("game_object")
      let field = document.getElementById("field")
      field!.appendChild(this.renderObj);
    } 
    abstract render():void
  }