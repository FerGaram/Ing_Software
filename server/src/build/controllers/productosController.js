"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productosController = void 0;
const database_1 = __importDefault(require("../database"));
class ProductosController {
    mostrarTodosProductos(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query('SELECT * FROM productos');
            res.json(resp);
        });
    }
    mostrarUnProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query('SELECT * FROM productos WHERE id = ?', id);
            if (resp.length > 0) {
                res.json(resp[0]);
            }
            else {
                res.status(404).json({});
            }
        });
    }
    crearProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const datos = { "nombre": req.body.nombre, "descripcion": req.body.descripcion, "categoria": req.body.categoria, "calif_edad": req.body.calif_edad };
            const id_admin = req.body.id_admin;
            var resp = yield database_1.default.query('INSERT INTO productos SET ?', [datos]);
            const id_producto = resp.insertId;
            const consulta = { "id_producto": id_producto, "id_admin": id_admin };
            resp = yield database_1.default.query('INSERT INTO prod_admin SET ?', [consulta]);
            res.json(resp);
        });
    }
    actualizarProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var resp = yield database_1.default.query('UPDATE productos SET ? WHERE id = ?', [req.body, id]);
            const consulta = { "id_producto": req.body.id };
            resp = yield database_1.default.query('UPDATE prod_admin SET ? WHERE id_producto = ?', [consulta, id]);
            res.json(resp);
        });
    }
    eliminarProducto(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var resp = yield database_1.default.query('DELETE FROM productos WHERE id = ?', [id]);
            resp = yield database_1.default.query('DELETE FROM prod_admin WHERE id_producto = ?', [id]);
            res.json(resp);
        });
    }
    filtrarCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { categoria } = req.params;
            const resp = yield database_1.default.query('SELECT * FROM productos WHERE categoria = ?', [categoria]);
            res.json(resp);
        });
    }
    todasCategorias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query("SELECT DISTINCT categoria FROM productos");
            res.json(resp);
        });
    }
}
exports.productosController = new ProductosController;
