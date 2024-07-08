const createError = require("http-errors");
const ReminderService = require("./service");
const debug = require("debug")("app:module-controller-reminder");
const { Response } = require("../common/response");
const DetailsReminderController = require("../detail_reminder/controller")
const moment = require('moment');

class ReminderController {

    constructor() {
        this.list = this.list.bind(this);
        this.agregarColorDeudas = this.agregarColorDeudas.bind(this);
    }

    async list(req, res) {
        try {
            let { mes, anio, iduser } = req.body;

            if (mes == undefined || anio == undefined || iduser == undefined) {
                Response.error(res, new createError[400]());
            } else {
                let param = { mes, anio, iduser };
                let respuesta = await ReminderService.list(param);
                let listado = this.agregarColorDeudas(respuesta);
                Response.success(res, 200, "Lista de reminders", listado);
            }
        } catch (error) {
            debug(error);
            Response.error(res, new createError[400]());
        }
    };

    async register(req, res) {
        try {
            let { categoria, nropago, empresa, fecha,
                cuota, monto, rango, iduser } = req.body;
            if (
                categoria == undefined ||
                nropago == undefined ||
                empresa == undefined ||
                cuota == undefined ||
                monto == undefined ||
                rango == undefined ||
                iduser == undefined ||
                fecha == undefined
            ) {
                Response.error(res, new createError[400]());
            } else {
                let param = { nropago, empresa, iduser, categoria };
                let respuesta = await ReminderService.register(param);
                if (respuesta.affectedRows == 1) {
                    let reminder_id = respuesta.insertId;
                    let param2 = { fecha, cuota, monto, rango }
                    let resp = await DetailsReminderController.register(reminder_id, param2);
                    Response.success(res, 201, "Registrar reminder", respuesta);
                }
                else Response.success(res, 202, "Error de registro", respuesta);
            }
        } catch (error) {
            debug(error);
            Response.error(res, new createError[400]());
        }
    };

    agregarColorDeudas(deudas) {
        const hoy = moment();
        const inicioSemana = moment().startOf('isoWeek');
        const finSemana = moment().endOf('isoWeek');

        deudas.forEach(deuda => {
            const fechaPago = moment(deuda.payment_date);

            deuda.payment_date = fechaPago.format('DD-MM-YYYY');
            deuda.alert = false;

            if (deuda.payment_status === 2) {
                if (fechaPago.isBefore(hoy, 'day')) {
                    deuda.color = 'danger';
                } else if (fechaPago.isSameOrAfter(inicioSemana) && fechaPago.isSameOrBefore(finSemana)) {
                    deuda.color = 'warning';
                } else if (fechaPago.isAfter(finSemana)) {
                    deuda.color = 'dark';
                }

                if(fechaPago.isSame(hoy, 'day'  )) deuda.alert = true;
            } else if (deuda.payment_status === 1) {
                deuda.color = 'success';
            }
        });

        return deudas;
    }
}

module.exports = new ReminderController();
