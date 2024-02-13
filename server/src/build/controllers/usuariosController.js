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
exports.usuariosController = void 0;
const database_1 = __importDefault(require("../database"));
class UsuariosController {
    mostrarTodosUsuarios(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield database_1.default.query('SELECT * FROM usuarios');
            res.json(resp);
        });
    }
    mostrarUnUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query('SELECT * FROM usuarios WHERE id = ?', [id]);
            if (resp.length > 0) {
                res.json(resp[0]);
            }
            else {
                res.status(404).json({});
            }
        });
    }
    crearUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const correo = req.body.correo;
            const usuarios = yield database_1.default.query('SELECT * FROM usuarios WHERE correo = ?', [correo]);
            if (usuarios.length < 1) {
                const resp = yield database_1.default.query('INSERT INTO usuarios SET ?', [req.body]);
                res.json(resp);
            }
            else {
                res.status(404).json({ 'correoExistente': 'El correo ingresado ya se ha registrado previamente' });
            }
        });
    }
    actualizarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query('UPDATE usuarios SET ? WHERE id = ?', [req.body, id]);
            res.json(resp);
        });
    }
    eliminarUsuario(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            const resp = yield database_1.default.query('DELETE FROM usuarios WHERE id = ?', [id]);
            res.json(resp);
        });
    }
}
exports.usuariosController = new UsuariosController;
