"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productosController_1 = require("../controllers/productosController");
class ProductosRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.config();
    }
    config() {
        this.router.get('/mostrarTodosProductos', productosController_1.productosController.mostrarTodosProductos);
        this.router.get('/mostrarUnProducto/:id', productosController_1.productosController.mostrarUnProducto);
        this.router.post('/crearProducto', productosController_1.productosController.crearProducto);
        this.router.put('/actualizarProducto/:id', productosController_1.productosController.actualizarProducto);
        this.router.delete('/eliminarProducto/:id', productosController_1.productosController.eliminarProducto);
        this.router.put('/filtrarCategoria', productosController_1.productosController.filtrarCategoria);
        this.router.get('/todasCategorias', productosController_1.productosController.todasCategorias);
    }
}
const productosRoutes = new ProductosRoutes();
exports.default = productosRoutes.router;
