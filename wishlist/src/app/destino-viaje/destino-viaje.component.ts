import { Component, OnInit, Input, HostBinding } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.models';

@Component({
  selector: 'app-destino-viaje',
  templateUrl: './destino-viaje.component.html',
  styleUrls: ['./destino-viaje.component.css']
})
export class DestinoViajeComponent implements OnInit {
  @Input() destino:DestinoViaje;
  @HostBinding('attr.class') cssClass ='col-md-4';//tiene una vinculacion direncta de un atributo con el tag a usar
  constructor() { 
   //this.nombre="defecto"
  }

  ngOnInit(): void {
  }

}
