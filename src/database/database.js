const mysql = require('promise-mysql');
const { Config } = require('../config/index');
const debug = require("debug")("app:module-database-connection");

class Conexion {
    static connect = null; // Static porque es común a todas las instancias

    async getConnection() {
        if (!this.connect) {
            try {
                this.connect = await mysql.createPool({
                    host: Config.host,
                    database: Config.database,
                    user: Config.user,
                    password: Config.password
                });
                debug('Nueva conexion realizada');
            } catch (error) {
                debug('Error al conectar a la base de datos:', error);
                throw error; // Propagar el error para manejarlo externamente
            }
        } else {
            debug('Reutilizando conexion');
        }
        return this.connect;
    }
}

module.exports = new Conexion();
