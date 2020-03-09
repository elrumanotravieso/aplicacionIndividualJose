import { Injectable } from '@angular/core';
import { GestorService } from './gestor.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Credentials } from '../core/model/interfaces/credentials';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {
  private credenciales: Credentials = {};
  constructor(private gestor: GestorService, private router: Router, private alerta: AlertController) { }

  async registro() {
    this.gestor.establecerCredenciales(this.credenciales);
    return await this.gestor
    .comprobarCredenciales()
    .then(() => {
        this.mostrarAlerta('Bienvenido', 'Registro Completado');
        this.router.navigateByUrl('/tabs');
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alerta.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }

  public get $credenciales(): Credentials  {
    return this.credenciales;
  }

  public set $credenciales(value: Credentials ) {
    this.credenciales = value;
  }

}

