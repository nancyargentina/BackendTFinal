require("dotenv").config();

//configuraciones para bases de datos
const config = {
    knexMysql: {
        client: process.env.mysqlClient,
        connection: {
            host: process.env.mysqlHost,
            port: process.env.mysqlPort,
            user: process.env.mysqlUser,
            password: process.env.mysqlPassword,
            database: process.env.mysqlDatabase,
        },
    },
    mongoConnectionString: process.env.mongoBase,
    fireBaseConnectionString: process.env.fireBase,
};

//espero PUERTO como argumento en linea de comando
const yargs = require("yargs");
const argu = yargs(process.argv.slice(2))
    .alias({ p: "PORT", m: "MODO", d: "DATABASE" })
    .default({ p: 8080, d: 3 }).argv;
console.log("port: ", argu.p, ", modo: ", argu.m, ", database: ", argu.d);
module.exports = { config, argu };
