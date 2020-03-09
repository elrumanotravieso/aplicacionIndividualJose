import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestorService } from '../servicios/gestor.service';
import { Credentials } from '../core/model/interfaces/credentials';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  email: string;
  password: string;

  constructor(private route: Router, private gestor: GestorService) {}



  regis() {
   this.route.navigateByUrl('registro');
  }

  inicioSesion() {
    this.gestor.inicio(this.email, this.password);
  }

  ngOnInit() {
  }

}
