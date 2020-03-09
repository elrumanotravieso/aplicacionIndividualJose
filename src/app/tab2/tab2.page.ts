import { Lugar } from './../core/model/interfaces/lugar';
import { Component } from '@angular/core';
import { DatosService } from '../servicios/datos.service';
import { GestorService } from '../servicios/gestor.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  private arrayLugares: Array<any>;

  constructor(private data: DatosService, private gestor: GestorService, private router: Router) {


  }

  ionViewDidEnter() {
    this.arrayLugares = [];
    this.obtenerLugares();
  }

  async obtenerLugares() {
    await this.data.obtenerLugares().subscribe(querySnaphot => {
      querySnaphot.forEach(doc => {
        const arrayLugares = doc.data();
        this.data.obtenerImagen(doc.id).then(imageURL =>{
          this.arrayLugares.push({image: imageURL, data: arrayLugares});
        });
      });
    });
  }
  salir() {
    this.gestor.cerrarSesion();
    this.router.navigateByUrl('/home');
  }
}
