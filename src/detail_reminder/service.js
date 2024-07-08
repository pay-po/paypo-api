const mysql = require('mysql');
const Query = require("../database/query");
const debug = require("debug")("app:module-service-details-reminder");

class DetailsReminderService {
    
    async register (arr){
        try {
            let datos = arr.map((s) => [
                s.fecha,
                s.cuota,
                s.monto,
                s.id
            ])
            let consulta =  "INSERT INTO reminders_details(payment_date, quota, amount, reminders_id) VALUES ?";
            let sql = mysql.format(consulta, [datos]);
            let respuesta = await Query.execute(sql);
            return respuesta;
        } catch (error) {
            debug(error)
            return error;
        }
    };

    async pay(id) {
        try {
            let consulta =  "UPDATE reminders_details SET payment_status = 1 WHERE reminders_details_id = ?";
            let sql = mysql.format(consulta, id);
            let respuesta = await Query.execute(sql);
            return respuesta;
        } catch (error) {
            return error;
        }
    };

}

module.exports = new DetailsReminderService()