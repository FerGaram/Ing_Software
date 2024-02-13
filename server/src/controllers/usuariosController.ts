import { Request, Response } from "express";
import pool from '../database'

class UsuariosController {
    public async mostrarTodosUsuarios(req: Request, res: Response): Promise<void> {
        const resp = await pool.query('SELECT * FROM usuarios');
        res.json(resp);
    }

    public async mostrarUnUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query('SELECT * FROM usuarios WHERE id = ?', [id]);
        if (resp.length > 0) {
            res.json(resp[0]);
        }
        else
        {
            res.status(404).json({'mensaje': 'No se encontró el usuario especificado'})
        }
    }

    public async crearUsuario(req: Request, res: Response): Promise<void> {
        const resp = pool.query('INSERT INTO usuarios SET ?', [req.body]);
        res.json(resp);
    }

    public async actualizarUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query('UPDATE usuarios SET ? WHERE id = ?', [req.body, id]);
        res.json(resp);
    }

    public async eliminarUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query('DELETE FROM usuarios WHERE id = ?', id);
        res.json(resp);
    }
}

export const usuariosController = new UsuariosController;