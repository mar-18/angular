import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.models';
import { DestinosApiClient } from '../models/destinos-api-client.model';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;

 //destinos: DestinoViaje[];//inicializamos la clase del objeto de tipo destino viaje creada en models
  constructor(public destinosApiClient:DestinosApiClient) {
     this.onItemAdded = new EventEmitter();
    //this.destinos=[];//al crear un objeto inicializamos la cadena vacia
  }

  ngOnInit(): void {
  }
  agregado(d:DestinoViaje){
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    //guardamos los datos ingresados con push creando un nuevo elemento
    //this.destinos.push(new DestinoViaje(nombre, url, desc));
    
    //mostramos un objeto crado a partir de el modelo destino-viaje
    //console.log(new DestinoViaje(nombre, url, desc));
    //mostramos en la consola el array de destinos que estamos guardando
    //console.log(this.destinos)
    //cuando carga bien los datos no recarga la pagina
 
  }
  elegido(e:DestinoViaje){
    this.destinosApiClient.getAll().forEach(x => x.setSelected(false));
      //x.setSelected(false);
      e.setSelected(true);
    };

  

}
