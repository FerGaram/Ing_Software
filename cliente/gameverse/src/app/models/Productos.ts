export class Producto {
    id: number;
    nombre: string;
    descripcion: string;
    categoria: string;
    calif_edad: string;

    constructor() {
        this.id = 1;
        this.nombre = "Placeholder";
        this.descripcion ="Es un juego de prueba ";
        this.categoria = "Test";
        this.calif_edad = "Para todas las edades";
    }
}