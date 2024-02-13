import { Router } from 'express';
import { administradorController } from '../controllers/administradorController';


class AdministradorRoutes {
    public router: Router = Router();
    constructor() {
        this.config();
    }
    config(): void {
        this.router.get('/mostrarTodosAdministradores', administradorController.mostrarTodosAdministradores);
        this.router.get('/mostrarUnAdministrador/:id', administradorController.mostrarUnAdministrador);
        this.router.post('/crearAdministrador', administradorController.crearAdministrador);
        this.router.put('/actualizarAdministrador/:id', administradorController.actualizarAdministrador);
        this.router.delete('/eliminarAdministrador/:id', administradorController.eliminarAdministrador);
    }
}
const administradorRoutes = new AdministradorRoutes();
export default administradorRoutes.router;