const mongoContenedor = require('../contenedores/mongoContenedor')
const userModel = require("../models/userModel_mongo");

class userMongoDao extends mongoContenedor{
    constructor(){
        super(userModel)
    }

    async userValidate(valor1,valor2) {
        return await this.collection.findOne({email: valor1, password: valor2 });
    }
    async getByEmail(unEmail){
        return await this.collection.findOne({email:unEmail})
    }
    async userRegisted(valor1,valor2) {
        return await this.collection.findOne({$or: [{ email: valor1 }, { password: valor2 }] });
    }
}

module.exports= userMongoDao