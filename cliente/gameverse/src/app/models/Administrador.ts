export class Administrador {
    id: number;
    correo: string;
    password: string;
    nombre_usuario: string;
    nombre_comp: string;

    constructor() {
        this.id= 1,
        this.correo= "admin@prueba.com",
        this.password= "prueba",
        this.nombre_usuario= "AdmPrueba",
        this.nombre_comp= "Administrador de Prueba"
    }
}

