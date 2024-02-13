export class Usuario{
    id: number;
    correo: string;
    password: string;
    nombre_usuario: string;
    nombre_comp: string;
    is_admin: number;

    constructor() {
        this.id = 1;
        this.correo = "usuario@prueba.com";
        this.password ="prueba";
        this.nombre_usuario = "UsrPrueba";
        this.nombre_comp = "Usuario de Prueba";
        this.is_admin = 0;
    }
}

export class newUsuario{
    correo: string;
    password: string;
    nombre_usuario: string;
    nombre_comp: string;
    is_admin: number;

    constructor() {
        this.correo = "usuario@prueba.com";
        this.password ="prueba";
        this.nombre_usuario = "UsrPrueba";
        this.nombre_comp = "Usuario de Prueba";
        this.is_admin = 0;
    }
}
