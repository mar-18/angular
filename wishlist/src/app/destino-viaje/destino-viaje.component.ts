import { Component, OnInit, Input, HostBinding, EventEmitter, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.models';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {
  @Input("idx") position:number;//varible puesta en semana2
  @Input() destino:DestinoViaje;
  @HostBinding('attr.class') cssClass ='col-md-4';//tiene una vinculacion direncta de un atributo con el tag a usar
  @Output() clicked :EventEmitter<DestinoViaje>;

  constructor() { 
   //this.nombre="defecto"
   this.clicked=new EventEmitter();
  }


  ngOnInit(): void {
  }
  //medoto ir
  ir(){
    this.clicked.emit(this.destino);
    return false;
  }

}
