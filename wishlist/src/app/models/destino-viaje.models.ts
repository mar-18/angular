import { UUID } from 'uuid-generator-ts';

export class DestinoViaje{
    private selected:boolean
    servicios:string[];
    id = new UUID();
    //public votes = 0;
    constructor(public nombre:string, public imagenurl:string, public descripcion:string, public votes: number = 0) { 
      this.servicios=['almuezo','desayuno'];//agregando servicios
    }
    isSelected():boolean{
      return this.selected;
    }
    setSelected(s:boolean){
      this.selected=s;//variable que decide el select
    }
    voteUp(): any {
      this.votes++;
    }
    voteDown(): any {
      this.votes--;
    }
}

