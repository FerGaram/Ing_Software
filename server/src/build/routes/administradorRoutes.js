"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const administradorController_1 = require("../controllers/administradorController");
class AdministradorRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarTodosAdministradores', administradorController_1.administradorController.mostrarTodosAdministradores);
        this.router.get('/mostrarUnAdministrador/:id', administradorController_1.administradorController.mostrarUnAdministrador);
        this.router.post('/crearAdministrador', administradorController_1.administradorController.crearAdministrador);
        this.router.put('/actualizarAdministrador/:id', administradorController_1.administradorController.actualizarAdministrador);
        this.router.delete('/eliminarAdministrador/:id', administradorController_1.administradorController.eliminarAdministrador);
    }
}
const administradorRoutes = new AdministradorRoutes();
exports.default = administradorRoutes.router;
