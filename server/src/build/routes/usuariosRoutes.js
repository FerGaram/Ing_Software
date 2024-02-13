"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usuariosController_1 = require("../controllers/usuariosController");
class UsuariosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarTodosUsuarios', usuariosController_1.usuariosController.mostrarTodosUsuarios);
        this.router.get('/mostrarUnUsuario/:id', usuariosController_1.usuariosController.mostrarUnUsuario);
        this.router.post('/crearUsuario', usuariosController_1.usuariosController.crearUsuario);
        this.router.put('/actualizarUsuario/:id', usuariosController_1.usuariosController.actualizarUsuario);
        this.router.delete('/eliminarUsuario/:id', usuariosController_1.usuariosController.eliminarUsuario);
        this.router.get('/validarCorreoUsuario/:correo', usuariosController_1.usuariosController.validarCorreoUsuario);
    }
}
const usuariosRoutes = new UsuariosRoutes();
exports.default = usuariosRoutes.router;
