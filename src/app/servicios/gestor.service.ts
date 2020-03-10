import { Lugar } from './../core/model/interfaces/lugar';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Credentials } from '../core/model/interfaces/credentials';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class GestorService {

  private credenciales: Credentials = {};

  constructor(private autenticador: AngularFireAuth, private route: Router) { }

  async registro(email: string, password: string, confirmation: string) {
    let retorno: boolean;
    this.credenciales.email = email;
    this.credenciales.password = password;
    this.credenciales.confirmation = confirmation;
    await this.comprobarCredenciales().then(() => {
      retorno = true;
      }).catch(() => {
      retorno = false;
      });
    return retorno;
  }

  comprobarCredenciales() {
    if (this.credenciales.password !== this.credenciales.confirmation) {
      console.error('Password dont match');
      console.error(this.credenciales.confirmation, this.credenciales.password);
    }
    console.log(this.credenciales.email);
    return this.autenticador.auth.createUserWithEmailAndPassword(this.credenciales.email, this.credenciales.password);
  }

  obtenerUsuarioActivo() {
    return this.autenticador.auth.currentUser.uid;
  }

  iniciarSesion(email: string, password: string) {
    return this.autenticador.auth.signInWithEmailAndPassword(email, password);
  }

  async inicio(email: string, password: string ) {
    if (await this.iniciarSesion(email, password)) {
      this.route.navigateByUrl('tabs/tab2');
  }
  }

  cerrarSesion() {
      return this.autenticador.auth.signOut();
  }

  borrarUsuario() {
  if (this.autenticador.auth.currentUser.providerId == null) {
  console.log('This user doesnt exits already');
  }
  return this.autenticador.auth.currentUser.delete();
  }

  obtenerCredenciales() {
    return this.credenciales;
  }

  establecerCredenciales(credenciales) {
    this.credenciales = credenciales;
  }

}


