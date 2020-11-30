import { Component, EventEmitter, forwardRef, Inject, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { ajax, AjaxResponse } from 'rxjs/ajax';
import { map, filter, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { AppConfig, APP_CONFIG } from 'src/app/app.module';
import { DestinoViaje } from '../../models/destino-viaje.models';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})

export class FormDestinoViajeComponent {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minLongitud = 5;
  result: string[];

  constructor(fb: FormBuilder, @Inject(forwardRef(() => APP_CONFIG)) private config: AppConfig) { 
    this.onItemAdded = new EventEmitter();
    this.fg =fb.group({
      /* nombre: ['', Validators.required], */ 
      /*. compose cuando usamos nuestras propias validaciones
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLong)
      ])], */
      nombre: ['', Validators.compose([
        Validators.required,
        this.nombreValidator,
        this.nombreValidatorParametrizable(this.minLongitud)
      ])],
      url:[''],
      descripcion:['']

    });
  
	this.fg.valueChanges.subscribe(
		(form: any) => {
			console.log('cambio el formulario:', form);
		}
	);
	
	this.fg.controls['nombre'].valueChanges.subscribe(
		(value: string) => {
			console.log('cambio el formulario:', value);
		}
	);
  }
  ngOnInit(): void {
    let elemNombre= <HTMLInputElement>document.getElementById('nombre');
    fromEvent(elemNombre, 'input')
      .pipe(
        map((e: KeyboardEvent) => (e.target as HTMLInputElement).value),
        filter(text => text.length > 2),
        debounceTime(200),
        distinctUntilChanged(),
        switchMap((text: string) => ajax(this.config.apiEndpoint + '/ciudades?q=' + text))
        ).subscribe(ajaxResponse => this.result = ajaxResponse.response);
  }
  guardar(nombre: string, url:string, descripcion: string): boolean{
    let d = new DestinoViaje(nombre, url, descripcion);
    this.onItemAdded.emit(d);
    return false;
  }
  nombreValidator(control: FormControl): { [s: string ]: boolean }{
    const long = control.value.toString().trim().length;
    if(long > 0 && long < 3){
      return {invalidNombre: true};
    }
    return null;
  }
  /**Funcion con parametros teneiendo en cuenta simpre la log minima de caracteres */
  nombreValidatorParametrizable(minLongitud: number): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      const long = control.value.toString().trim().length;
    if (long > 0 && long < minLongitud) {
      return { longMinNombre: true };
    }
    return null;
    };
  } 


}