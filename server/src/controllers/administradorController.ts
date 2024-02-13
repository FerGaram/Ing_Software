import { Request, Response } from "express";
import pool from '../database'

class AdministradorController {
    public async mostrarTodosAdministradores(req: Request, res: Response): Promise<void> {
        const resp = await pool.query('SELECT * FROM admins');
        res.json(resp);
    }

    public async mostrarUnAdministrador(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query('SELECT * FROM admins WHERE id = ?', [id]);
        if (resp.length > 0) {
            res.json(resp[0]);
        }
        else {
            res.status(404).json({ 'mensaje': 'No se encontró el administrador especificado' })
        }
    }

    public async crearAdministrador(req: Request, res: Response): Promise<void> {
        const correo = req.body.correo;
        const admins = await pool.query('SELECT * FROM admins WHERE correo = ?', [correo]);
        if (admins.length < 1) {
            const resp = await pool.query('INSERT INTO admins SET ?', [req.body]);
            res.json(resp);
        }
        else {
            res.status(404).json({ 'correoExistente': 'El correo ingresado ya se ha registrado previamente' })
        }
    }

    public async actualizarAdministrador(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        var resp = await pool.query('UPDATE admins SET ? WHERE id = ?', [req.body, id]);
        const consulta = { "id_admin": req.body.id };
        resp = await pool.query('UPDATE prod_admin SET ? WHERE id_admin = ?', [consulta, id]);
        res.json(resp);
    }

    public async eliminarAdministrador(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query('DELETE FROM admins WHERE id = ?', [id]);
        const juegos = await pool.query('SELECT * FROM prod_admin WHERE id_admin = ?', [id]);
        var id_producto, resp_prod;
        for (let i = 0; i < juegos.length; i++) {
            id_producto = juegos[i].id_producto;
            console.log(id_producto);
            resp_prod = await pool.query('DELETE FROM productos WHERE id = ?', [id_producto]);
            resp_prod = await pool.query('DELETE FROM prod_admin WHERE id_producto = ?', [id_producto]);
        }
        res.json(resp);
    }
}

export const administradorController = new AdministradorController;