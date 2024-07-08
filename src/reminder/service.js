const mysql = require('mysql');
const Query = require("../database/query");
const debug = require("debug")("app:module-service-reminder");

class ReminderService {
    
    async list (param){
        try {
            let { mes, anio, iduser } = param;
            let consulta =  "CALL list_reminder(?, ?, ?)";
            let sql = mysql.format(consulta, [ mes, anio, iduser ]);
            let respuesta = await Query.execute(sql);
            respuesta = respuesta[0]
            return respuesta;
        } catch (error) {
            debug(error)
            return error;
        }
    };
    
    async register (param){
        try {
            let { nropago, empresa, iduser, categoria } = param;
            let consulta =  "INSERT INTO reminders(nro_pay, company, id_user, categories_id) VALUES(?, ?, ?, ?)";
            let sql = mysql.format(consulta, [ nropago, empresa, iduser, categoria ]);
            let respuesta = await Query.execute(sql);
            return respuesta;
        } catch (error) {
            debug(error)
            return error;
        }
    };
}

module.exports = new ReminderService()