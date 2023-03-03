//const conexion = require('../dbMongoConfig')
const productMongoContenedor = require('../contenedores/mongoContenedor')
const productModel = require('../models/productsModel_mongo')

class productMongoDao extends productMongoContenedor{
    constructor(){
        super(productModel)
    }
}

module.exports= productMongoDao
