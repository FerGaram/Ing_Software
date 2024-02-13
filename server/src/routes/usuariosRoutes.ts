import { Router } from 'express';
import { usuariosController } from '../controllers/usuariosController';

class UsuariosRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/mostrarTodosUsuarios', usuariosController.mostrarTodosUsuarios);
        this.router.get('/mostrarUnUsuario/:id', usuariosController.mostrarUnUsuario);
        this.router.post('/crearUsuario', usuariosController.crearUsuario);
        this.router.put('/actualizarUsuario/:id', usuariosController.actualizarUsuario);
        this.router.put('/eliminarUsuario/:id', usuariosController.eliminarUsuario);
    }
}
const usuariosRoutes = new UsuariosRoutes();
export default usuariosRoutes.router;