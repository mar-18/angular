import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule} from '@angular/router'
import { StoreModule as NgRxStoreModule, ActionReducerMap, Store, StoreModule } from '@ngrx/store';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { DestinoViajeComponent } from './destino-viaje/destino-viaje.component';
import { ListaDestinosComponent } from './lista-destinos/lista-destinos.component';
import { DestinoDetalleComponent } from './destino-detalle/destino-detalle.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormDestinoViajeComponent } from './form-destino-viaje/form-destino-viaje.component';
import { DestinosApiClient } from './models/destinos-api-client.model';
import { DestinosViajesState, reducerDestinosViajes, intializeDestinosViajesState, DestinosViajesEffects } from './models/destinos-viajes-states.models';
import { Effect, EffectsModule } from '@ngrx/effects';


const routes: Routes=[
  { path: '', redirectTo:'home', pathMatch:'full'},
  { path: 'home', component: ListaDestinosComponent},
  { path: 'destino', component: DestinoDetalleComponent}
];
// redux init
export interface AppState {
  destinos: DestinosViajesState;
}
const reducers: ActionReducerMap<AppState> = {
  destinos: reducerDestinosViajes
};
let reducersInitialState = {
  destinos: intializeDestinosViajesState()
}
//

@NgModule({
  declarations: [
    AppComponent,
    DestinoViajeComponent,
    ListaDestinosComponent,
    DestinoDetalleComponent,
    FormDestinoViajeComponent,
    //NgRxStoreModule
    //StoreModule
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    NgRxStoreModule.forRoot(reducers, {initialState: reducersInitialState,
      runtimeChecks: {      
      strictStateImmutability: false,
      strictActionImmutability: false,
      }}),
    EffectsModule.forRoot([DestinosViajesEffects]),

  ],
  providers: [
    DestinosApiClient
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
