import { Lugar } from './../core/model/interfaces/lugar';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { GestorService } from './gestor.service';
import { RegistroService } from './registro.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  private lugares: AngularFirestoreCollection<Lugar>;
  private arrayLugares: Array<any>;

  // tslint:disable-next-line:max-line-length
  constructor(private angularFirestore: AngularFirestore,
              private gestor: RegistroService, private storage: AngularFireStorage, private route: Router) {
    //this.lugares = angularFirestore.collection<Lugar>('lugares');
  }

   obtenerLugares() {
    return this.angularFirestore.collection('lugares').get();
  }

  obtenerImagen(nombreImagen: string) {
    const storage = this.storage.storage;

    const storageRef = storage.ref('lugares/' + nombreImagen);

    return storageRef.getDownloadURL();
  }

  mapaLugares() {
    return this.lugares.snapshotChanges().pipe(
      map((actions) => {
        return actions.map((a) => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  anadirLugar(lugar: Lugar): Promise<any> {
   return this.angularFirestore.collection('lugares').add(
     {idUser:lugar.idUsuario, 
      descripcion: lugar.descripcion, 
      nombreLugar:lugar.nombreLugar, 
      nombreUsuario: lugar.nombreUsuario});
  }

 
}
