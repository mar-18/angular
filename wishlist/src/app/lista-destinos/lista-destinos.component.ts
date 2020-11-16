import { Component, OnInit } from '@angular/core';
import { DestinoViaje } from '../models/destino-viaje.models';

@Component({
  selector: 'app-lista-destinos',
  templateUrl: './lista-destinos.component.html',
  styleUrls: ['./lista-destinos.component.css']
})
export class ListaDestinosComponent implements OnInit {
 destinos: DestinoViaje[];//inicializamos la clase del objeto de tipo destino viaje creada en models
  constructor() { 
    this.destinos=[];//al crear un objeto inicializamos la cadena vacia
  }

  ngOnInit(): void {
  }
  guardar(nombre:string, url:string, desc:string):boolean{
    //guardamos los datos ingresados con push creando un nuevo elemento
    this.destinos.push(new DestinoViaje(nombre, url, desc));
    
    //mostramos un objeto crado a partir de el modelo destino-viaje
    console.log(new DestinoViaje(nombre, url, desc));
    //mostramos en la consola el array de destinos que estamos guardando
    console.log(this.destinos)
    //cuando carga bien los datos no recarga la pagina
    return false;

  }
  elegido(d:DestinoViaje){
    this.destinos.forEach(function(x){
      x.setSelected(false);
      d.setSelected(true);
    });

  }

}
