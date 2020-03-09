import { DatosService } from './../servicios/datos.service';
import { Lugar } from './../core/model/interfaces/lugar';
import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { GestorService } from '../servicios/gestor.service';
import * as firebase from 'firebase';
import { Router } from '@angular/router';
import { RegistroService } from '../servicios/registro.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  private lugar: Lugar = {};
  image: string = null;
  nombreUsuario: string;
  nombreLugar: string;
  descripcionLugar: string;

  // tslint:disable-next-line:max-line-length
  constructor(private camera: Camera, private gestor: GestorService, private data: DatosService, private registro: RegistroService, private router: Router) {
  }

  hacerFoto() {
    let options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      targetWidth: 1000,
      targetHeight: 1000,
      quality: 100
    };
    this.camera.getPicture( options )
    .then(imageData => {
      this.image = `data:image/jpeg;base64,${imageData}`;
      console.log(imageData);
    })
    .catch(error => {
      console.error( error );
    });
  }

  async compartirLugar() {

    this.lugar.idUsuario = this.gestor.obtenerUsuarioActivo();
    this.lugar.nombreUsuario = this.nombreUsuario;
    this.lugar.nombreLugar = this.nombreLugar;
    this.lugar.descripcion = this.descripcionLugar;
    console.log(this.anadirImagen(this.nombreLugar));
    console.log(this.lugar);
    this.data.anadirLugar(this.lugar).then(data => {
      this.anadirImagen(data.id);
      this.registro.mostrarAlerta('Enhorabuena', 'Registrado con éxito');
      this.router.navigateByUrl('tabs/tab2');
     });
  }

  anadirImagen(nombreLugar: string) {
    return firebase.storage().ref().child('lugares').child(nombreLugar).putString(this.image, 'data_url');
  }


  public get $lugar(): Lugar  {
    return this.lugar;
  }

  salir() {
    this.gestor.cerrarSesion();
    this.router.navigateByUrl('/home');
  }



}


