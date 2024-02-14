import { CommonModule } from '@angular/common';
import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
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
export class ProductosComponent implements OnInit, AfterViewInit {
  @ViewChild('vista') vista!: ElementRef;
  administradores: Administrador [] = [];
  is_admin = localStorage.getItem('is_admin');
  producto = new Producto() ;
  listaProducto: Producto[] = [];
  productoBuscado: any;
  newProduct: nuevoProducto = new nuevoProducto();
  productoEliminado: any;
  admin: Administrador = new Administrador();
  productoSeleccionado = new Producto();
  modalVista: any;

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

  deleteProduct(id: any) {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "No es posible revertir!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, quiero eliminarlo!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosService.eliminarProducto(id).subscribe((resproduct: any) => {
          console.log("resproduct: ", resproduct);
          this.listar()
        },
          err => console.error(err)
        );


        Swal.fire({
          title: "Eliminado!",
          text: "El producto ha sido eliminado.",
          icon: "success"
        });
      }
    });
  }


  createProduct() {
    this.newProduct = new nuevoProducto();
    console.log("New Product")
    $('#modalCreateProduct').modal();
    $("#modalCreateProduct").modal("open");
  }
  
  saveNewProduct(){
    console.log("Saving New Product")
    var id_admin = localStorage.getItem('id');
    console.log("id_admin: ", id_admin);
    if (id_admin != null) {
      this.newProduct.id_admin = parseInt(id_admin);
    }
    if (!this.newProduct.nombre || !this.newProduct.descripcion  || !this.newProduct.categoria  || !this.newProduct.calif_edad) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        text: 'Complete todos los campos'
      })
    }else{
      this.productosService.crearProducto(this.newProduct.nombre, this.newProduct.descripcion, this.newProduct.categoria, this.newProduct.calif_edad, this.newProduct.id_admin).subscribe((res) => {
        $('#modalCreateProduct').modal('close');
        this.productosService.list().subscribe((resProducts: any) => {
            this.listaProducto = resProducts;
        }, err => console.error(err));
        Swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Creado!!'
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
    var id_admin = localStorage.getItem('id');

    if (id_admin != null) {
      this.newProduct.id_admin = parseInt(id_admin);
    }
    if (!this.producto.nombre  || !this.producto.descripcion  || !this.producto.categoria  || !this.producto.calif_edad) {
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


ngAfterViewInit() {
  this.modalVista = M.Modal.init(this.vista.nativeElement);
}

 
visualizarProducto(producto: Producto) {
  this.productoSeleccionado = producto;
  console.log("Visualizando producto");
  console.log(producto.nombre);
  console.log(producto.descripcion);
  console.log(producto.categoria);
  console.log(producto.calif_edad);
  if (this.modalVista)
    this.modalVista.open();
}
}