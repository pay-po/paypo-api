const createError = require("http-errors");
const UserService = require("./service");
const debug = require("debug")("app:module-controller-login");
const { Response } = require("../common/response");

class UserController {
    async login (req, res) {
        try {
            let { correo, pass } = req.body;
    
            if (
                correo == undefined ||
                pass == undefined
            ) {
                Response.error(res, new createError[400]());
            } else {
                let respuesta = await UserService.login(correo, pass);
                if (respuesta === undefined || respuesta.length === 0) {
                    Response.error(res, new createError[400]());
                } else {
                    Response.success(res, 200, "Datos usuario", respuesta);
                }
            }
        } catch (error) {
            debug(error);
            Response.error(res, new createError[400]());
        }
    };
    
    async register (req, res) {
        try {
            let { email, pass, name, lastName } = req.body;
    
            if (
                email == undefined ||
                name == undefined ||
                lastName == undefined ||
                pass == undefined
            ) {
                Response.error(res, new createError[400]());
            } else {
                let param = { email, pass, name, lastName };
                let respuesta = await UserService.register(param);
                if(respuesta.affectedRows == 1) Response.success(res, 201, "Registrar usuario", respuesta);
                else Response.success(res, 202, "Error de registro", respuesta);
            }
        } catch (error) {
            debug(error);
            Response.error(res, new createError[400]());
        }
    };
}

module.exports = new UserController();
