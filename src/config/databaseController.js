const mysql = require('mysql2');
const { promisify } = require('util');
const { database } = require('./keys');
const { CONSTANTS} = require('../utils/utils');

const pool = mysql.createPool(database);//Se crea el pool de conexiones

//Iniciando conexion con la base de datos

pool.getConnection((error,conexion) => {
    //Validar si la conexion tiene algun tipo de error
    if(error){
        //Validando codigos de error mas comunes
        switch(error.code){
            case CONSTANTS.PROTOCOL_CONNECTION_LOST:
                //Indica que la conexion con la base de datos esta perdida
                console.error('DATABASE CONNECTION WAS CLOSED');
                break;
                //Indica que esxite demasiadas conexiones
            case CONSTANTS.ER_CON_COUNT_ERROR:
                console.error('DATABASE HAS MANY  CONNCECTION');
                break;
                //Indica que la conexion fue rechazada
            case CONSTANTS.ECONNREFUSED:
                console.error('DATABASE CONNECTION WAS REFUSED');
                break;
                //Indica que el acceso esta denegado
            case CONSTANTS.ER_ACCESS_DENIED_ERROR:
                console.error('ACCES DENIED FOR USER');
                break;
            default:
                console.error('Error de base de datos no encontrado');
                break;
        }
    }
    // si la conexion es exitosa, imprimir un mensaje indicandolo
    if(conexion){
        console.log('Conexion establecida con la base de datos');
        conexion.release();
    }
    return;
});
//configurando PROMISY para permitir en cada consulta un async/await (promesas)
pool.query = promisify(pool.query);

module.exports =  pool;