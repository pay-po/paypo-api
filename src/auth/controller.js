const createError = require("http-errors");
const AuthService = require("./service");
const debug = require("debug")("app:module-controller-login");
const { Response } = require("../common/response");

class AuthController {
    async login (req, res) {
        try {
            let { correo, pass } = req.body;
    
            if (
                correo == undefined ||
                pass == undefined
            ) {
                Response.error(res, new createError[400]());
            } else {
                let respuesta = await AuthService.login(correo, pass);
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
}

module.exports = new AuthController();
