import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { DestinoViaje } from '../models/destino-viaje.models';

@Component({
  selector: 'app-form-destino-viaje',
  templateUrl: './form-destino-viaje.component.html',
  styleUrls: ['./form-destino-viaje.component.css']
})
export class FormDestinoViajeComponent implements OnInit {
  @Output() onItemAdded: EventEmitter<DestinoViaje>;
  fg: FormGroup;
  minLongitud = 5;
  minLong: 3;
  constructor(fb: FormBuilder) { 
    this.onItemAdded = new EventEmitter();
    this.fg =fb.group({
      /* nombre:['', Validators.required], */ 
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
/*   nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): { [s: string]: boolean } | null => {
      const long = control.value.toString().trim().length;
    if (long > 0 && long < minLong) {
      return {longMinNombre: true};
    }
    return null;
    };
  } */
 
  nombreValidatorParametrizable(minLong: number): ValidatorFn {
    return (control: FormControl): { [key: string]: boolean } | null => {
    const l = control.value.toString().trim().length;
      if (l > 0 && l < minLong) {
            return { 'minLongNombre': true };
        }
        return null;
    };
}

}