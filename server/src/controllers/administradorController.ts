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
        else
        {
            res.status(404).json({'mensaje': 'No se encontró el administrador especificado'})
        }
    }

    public async crearAdministrador(req: Request, res: Response): Promise<void> {
        const resp = await pool.query('INSERT INTO admins SET ?', [req.body]);
        res.json(resp);
    }

    public async actualizarAdministrador(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query('UPDATE admins SET ? WHERE id = ?', [req.body, id]);
        res.json(resp);
    }

    public async eliminarAdministrador(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query('DELETE FROM admins WHERE id = ?', [id]);
        res.json(resp);
    }
}

export const administradorController = new AdministradorController;