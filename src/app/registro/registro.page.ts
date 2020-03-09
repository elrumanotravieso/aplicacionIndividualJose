import { Component, OnInit } from '@angular/core';
import { RegistroService } from '../servicios/registro.service';
import { Credentials } from '../core/model/interfaces/credentials';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  private credenciales: Credentials = {};
  constructor(private gestorRegistro: RegistroService) {
    this.gestorRegistro.$credenciales = this.credenciales;
   }

  ngOnInit() {
  }

  registro() {
    this.gestorRegistro.registro();
  }

}
