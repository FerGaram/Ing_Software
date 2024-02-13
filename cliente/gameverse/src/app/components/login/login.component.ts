import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  usuario = new Usuario() ;
  constructor(private usuarioService : UsuarioService , private router: Router){

  }
  
  logueo()
  {
    this.usuarioService.existe(this.usuario.correo,this.usuario.password).subscribe((resusuario: any) =>
    {
      console.log(resusuario);
      if(resusuario.id != -1)
      {
        console.log("Usuario valido");
        if (resusuario.esAdmin) {
          console.log("Usuario es administrador");
          localStorage.setItem('correo', resusuario.correo);
          localStorage.setItem('id', resusuario.id);
          this.router.navigateByUrl('/homeAdmin/usuarios');
        } else {
          console.log("Usuario no es administrador, procediendo con el inicio de sesión");
          localStorage.setItem('correo', resusuario.correo);
          localStorage.setItem('id', resusuario.id);
          this.router.navigateByUrl('/home/snake');
        }
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


