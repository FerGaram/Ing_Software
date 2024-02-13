import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { newUsuario } from 'src/app/models/Usuario';
import { Usuario } from 'src/app/models/Usuario';
import { UsuarioService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {
  usuarios : Usuario [] = [];
  usuario: Usuario = new Usuario();
  usuarioNuevo: newUsuario = new newUsuario();
  constructor(private usuarioService : UsuarioService , private router: Router){

    
  }

  guardarNuevoUsuario() {
    // Verificar si los campos están vacíos
    console.log(this.usuarioNuevo);
    if (!this.usuarioNuevo.correo || !this.usuarioNuevo.nombre_comp || !this.usuarioNuevo.nombre_usuario || !this.usuarioNuevo.password) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Por favor, complete todos los campos'
      });
      return;
    }else{
      // Si pasa las verificaciones, intentar crear el nuevo usuario
      console.log("GuardandoUsuario")
      console.log(this.usuarioNuevo.correo);
      this.usuarioService.crearUsuario(this.usuarioNuevo).subscribe((res) => {
        // Elimina el código relacionado con el modal
        this.usuarioService.list().subscribe((resUsuarios: any) => {
          this.usuarios = resUsuarios;
        }, err => console.error(err));
        Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Usuario creado exitosamente!'
        });
        this.router.navigateByUrl('/home/productos');
      }, err => console.error(err));
    }
}
}
