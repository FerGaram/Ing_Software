import { Component } from '@angular/core';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuarios.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = new Usuario() ;
  constructor(private usuarioService : UsuarioService , private router: Router, private http: HttpClient){

  }
  
  logueo()
  {
    this.usuarioService.existe(this.usuario.correo,this.usuario.password).subscribe((resusuario: any) =>
    {
      console.log(resusuario);
      if(resusuario.id != -1)
      {
        this.usuario = resusuario
        console.log("Usuario valido");
        console.log(resusuario);
        localStorage.setItem('correo', this.usuario.correo);
        localStorage.setItem('id', resusuario.id);
        localStorage.setItem('is_admin', resusuario.is_admin);
       
        this.router.navigateByUrl('/home/productos');
      } else {
        console.log("Error, Usuario o contraseña incorrectos");
        Swal.fire({
          title: "ERROR!",
          text: "Usuario o contraseña incorrectos!",
          icon: "warning"
        });
      }
    }, err => console.error(err));
  }

}


