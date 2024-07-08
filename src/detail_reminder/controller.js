const createError = require("http-errors");
const DetailsReminderService = require("./service");
const debug = require("debug")("app:module-controller-details-reminder");
const { Response } = require("../common/response");
const moment = require("moment");

class DetailsReminderController {
    
    async register (id, param) {
        try {
            let datos = [];
            let newFecha = moment(param.fecha);
            for (let index = 1; index <= param.cuota; index++) {
                datos.push({fecha: newFecha.format('YYYY-MM-DD'), cuota: index, monto: param.monto, id: id}) 
                newFecha = newFecha.add(param.rango, 'days');
            }
            let resp = await DetailsReminderService.register(datos)
            return resp;
        } catch (error) {
            debug(error);
            return error;
        }
    };

    async pay(req, res) {
        try {
            let id = req.params.idreminder;
            if (
                id == undefined
            ) {
                Response.error(res, new createError[400]());
            } else {
                let respuesta = await DetailsReminderService.pay(id);
                if (respuesta.affectedRows == 1)
                    Response.success(res, 200, "status reminder");
                else Response.error(res, new createError[400]());
            }

        } catch (error) {
            // debug(error);
            Response.error(res, new createError[400]());
        }
    };
}

module.exports = new DetailsReminderController();
