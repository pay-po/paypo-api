const mysql = require('mysql');
const Query = require("../database/query");
const debug = require("debug")("app:module-service-login");

class AuthService {

    async login (correo, pass){
        try {
            let consulta =  "SELECT * FROM user WHERE email = ? AND pass = ?";
            let sql = mysql.format(consulta, [ correo, pass ]);
            let respuesta = await Query.execute(sql);
            return respuesta;
        } catch (error) {
            debug(error)
            return error;
        }
    };

}

module.exports = new AuthService()