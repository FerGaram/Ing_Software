import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductosService} from './../../services/productos.service';
import { Producto } from 'src/app/models/Productos';
import { nuevoProducto } from 'src/app/models/Productos';
import { AdministradoresService } from 'src/app/services/administradores.service';
import { Administrador } from 'src/app/models/Administrador';
import Swal from 'sweetalert2';
declare var $: any;


declare var M: any;
@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  administradores: Administrador [] = [];
  is_admin = localStorage.getItem('is_admin');
  producto = new Producto() ;
  listaProducto: Producto[] = [];
  productoBuscado: any;
  newProduct: nuevoProducto = new nuevoProducto();
  productoEliminado: any;
  admin: Administrador = new Administrador();

  constructor(private productosService: ProductosService ,private router: Router, private administradoresService: AdministradoresService) { 
    this.administradoresService.list().subscribe((resadmin: any) =>
    {
      this.administradores = resadmin;
      console.log(this.administradores);
    }
    , err => console.error(err)
    );
  }

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


  createProduct() {
    this.newProduct = new nuevoProducto();
    console.log("New Product")
    $('#modalCreateProduct').modal();
    $("#modalCreateProduct").modal("open");
  }
  
  saveNewProduct(){
    console.log("Saving New Product")
    if (!this.newProduct.nombre || !this.newProduct.descripcion  || !this.newProduct.categoria  || !this.newProduct.calif_edad ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Complete todos los campos'
      })
    }else{
      this.productosService.crearProducto(this.newProduct.nombre, this.newProduct.descripcion, this.newProduct.categoria, this.newProduct.calif_edad).subscribe((res) => {
        $('#modalCreateProduct').modal('close');
        this.productosService.list().subscribe((resProducts: any) => {
            this.listaProducto = resProducts;
        }, err => console.error(err));
        Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Created!!'
        })
    }, err => console.error(err));
    }
  }


  updateProduct(id_product: any) {
    this.productosService.listOne(id_product).subscribe((resproduct: any) => {
      this.producto = resproduct;
      console.log(this.producto)
      $('#modalUpdateProduct').modal();
      $("#modalUpdateProduct").modal("open");
    },
      err => console.error(err)
    );
  }

  saveUpdateProduct() {
    if (!this.producto.nombre  || !this.producto.descripcion  || !this.producto.categoria  || !this.producto.calif_edad ) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'No puede dejar campos vacios'
      })
  }else{
    this.productosService.actualizarProducto(this.producto.nombre, this.producto.descripcion, this.producto.categoria, this.producto.calif_edad, this.producto.id).subscribe((res) => {
      $('#modalUpdateProduct').modal('close');
      this.productosService.list().subscribe((resProducts: any) => {
          this.listaProducto = resProducts;
      }, err => console.error(err));
      Swal.fire({
          position: 'center',
          icon: 'success',
          text: 'Actualizado!!'
      })
  }, err => console.error(err));
  }
}

}