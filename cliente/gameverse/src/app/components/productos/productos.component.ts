import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService} from './../../services/productos.service';
import { Producto } from 'src/app/models/Productos';
import Swal from 'sweetalert2';
declare var M: any;
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  is_admin = localStorage.getItem('is_admin');
  producto = new Producto() ;
  listaProducto: any[] = [];
  productoBuscado: any;
  productoEliminado: any;

  constructor(private productosService: ProductosService ,private router: Router) { }

  ngOnInit() {

    this.listar();
  }
  listar(){
    this.productosService.list().subscribe((respro: any) =>
      {
        this.listaProducto = respro;
      },
      err => console.error(err)
      );
      console.log(this.listaProducto);
  }

}