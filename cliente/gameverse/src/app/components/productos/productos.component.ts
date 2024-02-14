import { Component, OnInit } from '@angular/core';
import { AfterViewInit } from '@angular/core';
import { ElementRef } from '@angular/core';
import { ViewChild } from '@angular/core';
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
export class ProductosComponent implements OnInit, AfterViewInit {
  @ViewChild('vista') vista!: ElementRef;
  is_admin = localStorage.getItem('is_admin');
  producto = new Producto() ;
  listaProducto: any[] = [];
  productoBuscado: any;
  productoEliminado: any;
  productoSeleccionado = new Producto();
  modalVista: any;

  constructor(private productosService: ProductosService ,private router: Router) { }

  ngOnInit() {

    this.listar();
  }

  ngAfterViewInit() {
    this.modalVista = M.Modal.init(this.vista.nativeElement);
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