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
exports.administradorController = void 0;
const database_1 = __importDefault(require("../database"));
class AdministradorController {
    mostrarTodosAdministradores(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query('SELECT * FROM admins');
            res.json(resp);
        });
    }
    mostrarUnAdministrador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query('SELECT * FROM admins WHERE id = ?', [id]);
            if (resp.length > 0) {
                res.json(resp[0]);
            }
            else {
                res.status(404).json({ 'mensaje': 'No se encontró el administrador especificado' });
            }
        });
    }
    crearAdministrador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const correo = req.body.correo;
            const admins = yield database_1.default.query('SELECT * FROM admins WHERE correo = ?', [correo]);
            if (admins.length < 1) {
                const resp = yield database_1.default.query('INSERT INTO admins SET ?', [req.body]);
                res.json(resp);
            }
            else {
                res.status(404).json({ 'correoExistente': 'El correo ingresado ya se ha registrado previamente' });
            }
        });
    }
    actualizarAdministrador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            var resp = yield database_1.default.query('UPDATE admins SET ? WHERE id = ?', [req.body, id]);
            const consulta = { "id_admin": req.body.id };
            resp = yield database_1.default.query('UPDATE prod_admin SET ? WHERE id_admin = ?', [consulta, id]);
            res.json(resp);
        });
    }
    eliminarAdministrador(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query('DELETE FROM admins WHERE id = ?', [id]);
            const juegos = yield database_1.default.query('SELECT * FROM prod_admin WHERE id_admin = ?', [id]);
            var id_producto, resp_prod;
            for (let i = 0; i < juegos.length; i++) {
                id_producto = juegos[i].id_producto;
                console.log(id_producto);
                resp_prod = yield database_1.default.query('DELETE FROM productos WHERE id = ?', [id_producto]);
                resp_prod = yield database_1.default.query('DELETE FROM prod_admin WHERE id_producto = ?', [id_producto]);
            }
            res.json(resp);
        });
    }
}
exports.administradorController = new AdministradorController;
