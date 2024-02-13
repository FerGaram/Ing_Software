import { Router } from 'express';
import { productosController } from '../controllers/productosController';

class ProductosRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/mostrarTodosProductos', productosController.mostrarTodosProductos);
        this.router.get('/mostrarUnProducto/:id', productosController.mostrarUnProducto);
        this.router.post('/crearProducto', productosController.crearProducto);
        this.router.put('/actualizarProducto/:id', productosController.actualizarProducto);
        this.router.delete('/eliminarProducto/:id', productosController.eliminarProducto);
    }
}
const productosRoutes = new ProductosRoutes();
export default productosRoutes.router;