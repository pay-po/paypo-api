const Conexion = require("./database");
const debug = require("debug")("app:module-database-query");

class Query {
    async execute(sql) {
        try {
            const connection = await Conexion.getConnection();
            const results = await connection.query(sql);
            return results;
        } catch (error) {
            // debug('Error executing SQL:', error);
            if (error.code && error.code === 'ER_DUP_ENTRY') {
                return {
                    'code_error': 'datos repetidos',
                    // 'details': error
                };
            } else {
                return {
                    'code_error': 'general_error',
                    // 'details': error
                };
            }
        }
    }
}

module.exports = new Query();