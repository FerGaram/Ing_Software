export class Usuario{
    id: number;
    correo: string;
    password: string;
    nombre_usuario: string;
    nombre_comp: string;

    constructor() {
        this.id = 1;
        this.correo = "usuario@prueba.com";
        this.password ="prueba";
        this.nombre_usuario = "UsrPrueba";
        this.nombre_comp = "Usuario de Prueba";
    }
}

export class newUsuario{
    correo: string;
    password: string;
    nombre_usuario: string;
    nombre_comp: string;

    constructor() {
        this.correo = "usuario@prueba.com";
        this.password ="prueba";
        this.nombre_usuario = "UsrPrueba";
        this.nombre_comp = "Usuario de Prueba";
    }
}
