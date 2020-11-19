export class DestinoViaje{
    private selected:boolean
    servicios:string[];
    constructor(public nombre:string, public imagenurl:string, public descripcion:string) { 
      this.servicios=['almuezo','desayuno'];//agregando servicios
    }
    isSelected():boolean{
      return this.selected;
    }
    setSelected(s:boolean){
      this.selected=s;//variable que decide el select
    }

}

