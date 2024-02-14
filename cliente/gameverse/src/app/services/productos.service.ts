import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get(`${environment.API_URI}/productos/mostrarTodosProductos`);
  }

  listOne(id_producto: any) {
    return this.http.get(`${environment.API_URI}/productos/mostrarUnProducto/${id_producto}`)
  }

  crearProducto(nombre: string, descripcion: string, categoria: string, calif_edad: string) {
    const producto = {
      nombre: nombre,
      descripcion: descripcion,
      categoria: categoria,
      calif_edad: calif_edad
    };
    console.log("Entrando al servicio de crear Producto");
    return this.http.post(`${environment.API_URI}/productos/crearProducto`, producto);
  }

  actualizarProducto(nombre: string, descripcion: string, categoria: string, calif_edad: string, id: any) {
    const producto = {
      nombre: nombre,
      descripcion: descripcion,
      categoria: categoria,
      calif_edad: calif_edad,
      id: id
    };
    return this.http.put(`${environment.API_URI}/productos/actualizarProducto/${producto.id}`,
      producto);
  }

  eliminarProducto(id: any) {
    return this.http.delete(`${environment.API_URI}/productos/eliminarProducto/${id}`);
  }
}