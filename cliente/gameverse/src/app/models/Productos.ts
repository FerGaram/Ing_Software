export class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    calif_edad: string;
    id_admin: number;

    constructor() {
        this.id = 1;
        this.nombre = "Placeholder";
        this.descripcion ="Es un juego de prueba ";
        this.categoria = "Test";
        this.calif_edad = "Para todas las edades";
        this.id_admin = 1;
    }
}

export class nuevoProducto {
    nombre: string;
    descripcion: string;
    categoria: string;
    calif_edad: string;
    id_admin: number;

    constructor() {
        this.nombre = "";
        this.descripcion ="";
        this.categoria = "";
        this.calif_edad = "";
        this.id_admin = 0;
    }
}