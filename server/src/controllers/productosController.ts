import { Request, Response } from "express";
import pool from "../database";

class ProductosController {
    public async mostrarTodosProductos(req: Request, res: Response): Promise<void> {
        const resp = await pool.query('SELECT * FROM productos');
        res.json(resp);
    }

    public async mostrarUnProducto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        const resp = await pool.query('SELECT * FROM productos WHERE id = ?', id);
        if (resp.length > 0) {
            res.json(resp[0]);
        }
        else {
            res.status(404).json({});
        }
    }

    public async crearProducto(req: Request, res: Response): Promise<void> {
        const datos = {"nombre": req.body.nombre, "descripcion": req.body.descripcion, "categoria": req.body.categoria, "calif_edad": req.body.calif_edad};
        const id_admin = req.body.id_admin;
        var resp = await pool.query('INSERT INTO productos SET ?', [datos]);
        const id_producto = resp.insertId;
        const consulta = {"id_producto": id_producto, "id_admin": id_admin};
        resp = await pool.query('INSERT INTO prod_admin SET ?', [consulta]);
        res.json(resp);
    }

    public async actualizarProducto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        var resp = await pool.query('UPDATE productos SET ? WHERE id = ?', [req.body, id]);
        const consulta = {"id_producto": req.body.id}
        resp = await pool.query('UPDATE prod_admin SET ? WHERE id_producto = ?', [consulta, id])
        res.json(resp);
    }

    public async eliminarProducto(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        var resp = await pool.query('DELETE FROM productos WHERE id = ?', [id]);
        resp = await pool.query('DELETE FROM prod_admin WHERE id_producto = ?', [id]);
        res.json(resp);
    }
}

export const productosController = new ProductosController;