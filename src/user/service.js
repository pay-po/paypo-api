const mysql = require('mysql');
const Query = require("../database/query");
const debug = require("debug")("app:module-service-login");

class UserService {

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
    
    async register (param){
        try {
            let { email, pass, name, lastName } = param;
            let consulta =  "INSERT user(email, pass, first_name, last_name) VALUES(?, ?, ?, ?)";
            let sql = mysql.format(consulta, [ email, pass, name, lastName ]);
            let respuesta = await Query.execute(sql);
            return respuesta;
        } catch (error) {
            debug(error)
            return error;
        }
    };

}

module.exports = new UserService()