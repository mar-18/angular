import { state } from '@angular/animations';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.module';
import { DestinoViaje } from '../../models/destino-viaje.models';
import { DestinosApiClient } from '../../models/destinos-api-client.model';
import { ElegidoFavoritoAction } from '../../models/destinos-viajes-states.models';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  //lista de actualizaciones cuando se elige un elemento, nos lo muestra
  updates: string[];
  all;

 //destinos: DestinoViaje[];//inicializamos la clase del objeto de tipo destino viaje creada en models
  constructor(public destinosApiClient:DestinosApiClient, private store: Store<AppState> ) {
     this.onItemAdded = new EventEmitter();
    //this.destinos=[];//al crear un objeto inicializamos la cadena vacia
    this.updates = [];
    this.store.select(state => state.destinos.favorito).subscribe(d => {
     
      if (d != null){
        this.updates.push('se ha elegido: '+ d.nombre);
      }
    });
    store.select(state => state.destinos.items).subscribe(items => this.all = items);

  }

  ngOnInit(): void {
  }
  agregado(d:DestinoViaje){
    this.destinosApiClient.add(d);
    this.onItemAdded.emit(d);
    //this.store.dispatch(new ElegidoFavoritoAction(d));
    //guardamos los datos ingresados con push creando un nuevo elemento
    //this.destinos.push(new DestinoViaje(nombre, url, desc));
    
    //mostramos un objeto crado a partir de el modelo destino-viaje
    //console.log(new DestinoViaje(nombre, url, desc));
    //mostramos en la consola el array de destinos que estamos guardando
    //console.log(this.destinos)
    //cuando carga bien los datos no recarga la pagina
 
  }
  elegido(e:DestinoViaje){
    //lo modificamos en destino api client
    //this.destinosApiClient.getAll().forEach(x => x.setSelected(false));
    this.destinosApiClient.elegir(e);
    //this.store.dispatch(new ElegidoFavoritoAction(e));
      //x.setSelected(false);
      e.setSelected(true);
    };
    getAll(){

    }
  

}
