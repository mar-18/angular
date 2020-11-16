export class DestinoViaje{
    private selected:boolean
    constructor(public nombre:string, public imagenurl:string, public descripcion:string) { 
    }
    isSelected():boolean{
      return this.selected;
    }
    setSelected(s:boolean){
      this.selected=true;
    }

}

