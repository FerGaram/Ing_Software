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
        else {
            res.status(404).json({});
        }
    }

    public async crearUsuario(req: Request, res: Response): Promise<void> {
        const correo = req.body.correo;
        const usuarios = await pool.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
        if (usuarios.length < 1) {
            const resp = await pool.query('INSERT INTO usuarios SET ?', [req.body]);
            res.json(resp);
        }
        else {
            res.status(404).json({ 'correoExistente': 'El correo ingresado ya se ha registrado previamente' })
        }
    }

    public async actualizarUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query('UPDATE usuarios SET ? WHERE id = ?', [req.body, id]);
        res.json(resp);
    }

    public async eliminarUsuario(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query('DELETE FROM usuarios WHERE id = ?', [id]);
        res.json(resp);
    }

    public async validarUsuario(req: Request, res: Response): Promise<void> {
        const parametros = req.body;
        var consulta = `SELECT id, correo, nombre_usuario, nombre_comp FROM admins WHERE correo = '${parametros.correo}' and password = '${parametros.contrasena}'`;
        const resp = await pool.query(consulta);
        if(resp.length > 0){
            resp[0]["is_admin"] = 1;
            res.json(resp);
        }else{
            var consulta2 = `SELECT id, correo, nombre_usuario, nombre_comp FROM usuarios WHERE correo = '${parametros.correo}' and password = '${parametros.contrasena}'`;
            const resp2 = await pool.query(consulta2);
            if(resp2.length > 0){
                resp2[0]["is_admin"] = 0;
                res.json(resp2);
            }else{
                res.json({"id" : "-1"});
            }
        }
    }
}

export const usuariosController = new UsuariosController;