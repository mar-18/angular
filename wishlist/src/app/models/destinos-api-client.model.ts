import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject } from 'rxjs';
import { AppConfig, AppState, APP_CONFIG, db } from '../app.module';
import { DestinoViaje } from './destino-viaje.models';
import { ElegidoFavoritoAction, NuevoDestinoAction } from './destinos-viajes-states.models';
import { HttpClientModule, HttpClient, HttpHeaders, HttpRequest, HttpResponse } from '@angular/common/http';
import { forwardRef } from '@angular/core';

@Injectable()
export class DestinosApiClient {
	destinos: DestinoViaje[];
		/* constructor(private store: Store<AppState>) {
       
	} */
	constructor(
		private store: Store<AppState>,
		@Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig,
		private http: HttpClient
	  ) {
		this.store
		  .select(state => state.destinos)
		  .subscribe((data) => {
			console.log('destinos sub store');
			console.log(data);
			this.destinos = data.items;
		  });
		this.store
		  .subscribe((data) => {
			console.log('all store');
			console.log(data);
		  });
	  }
	  add(d: DestinoViaje) {
		const headers: HttpHeaders = new HttpHeaders({'X-API-TOKEN': 'token-seguridad'});
		const req = new HttpRequest('POST', this.config.apiEndpoint + '/my', { nuevo: d.nombre }, { headers: headers });
		this.http.request(req).subscribe((data: HttpResponse<{}>) => {
		  if (data.status === 200) {
			this.store.dispatch(new NuevoDestinoAction(d));
			/* */const myDb = db;
			myDb.destinos.add(d);
			console.log('todos los destinos de la db!');
			myDb.destinos.toArray().then(destinos => console.log(destinos)) 
		  }
		});
	  }



	/*add(d:DestinoViaje){
		this.store.dispatch(new NuevoDestinoAction(d));
	}
*/
	getAll():DestinoViaje[]{
	  return this.destinos;
    }
	getById(id: String): DestinoViaje {
		return this.destinos.filter(function(d) { return d.id.toString() === id; })[0];
	  }
	elegir(d: DestinoViaje){
		this.store.dispatch(new ElegidoFavoritoAction(d));
	}

}
