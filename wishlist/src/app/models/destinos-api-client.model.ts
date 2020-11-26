import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppState } from '../app.module';
import { DestinoViaje } from './destino-viaje.models';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-states.models';
@Injectable()
export class DestinosApiClient {
	destinos: DestinoViaje[];
		constructor(private store: Store<AppState>) {
       
	}
	add(d:DestinoViaje){
		this.store.dispatch(new NuevoDestinoAction(d));
	}

	/*getAll():DestinoViaje[]{
	  return this.destinos;
    }*/
	getById(id: String): DestinoViaje {
		return this.destinos.filter(function(d) { return d.id.toString() === id; })[0];
	  }
	elegir(d: DestinoViaje){
		this.store.dispatch(new ElegidoFavoritoAction(d));
	}

}
