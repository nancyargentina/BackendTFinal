const knex = require('knex')

class MysqlContenedor {
    constructor(nombreTabla, mysqlconfig) {
        this.tabla = nombreTabla
        this.knex = knex(mysqlconfig)
    }

    async getElements() {
        try {
            //lee la tabla y retorna los mensajes
            let data = await this.knex.select().table(this.tabla);
            return data;
        } catch (error) {
            throw error;
        }
    }
    /*getAll(){
        //llama a la promesa que contiene los lementos del archivo
        this.getElements()
        .then(data =>{console.log(data);})
        .catch(error=>{console.log(error)})
    }*/

    async save(obj) {
        //traigo los datos y guardo el nuevo mensaje
        //const { title, price, thumbnail } = obj;
       try {
            //almaceno la coleccion en el archivo
            const prodNuevo = await this.knex.insert(obj).from(this.tabla);
            //si se almacena correctamente actualizo el ID y muestro
            console.log("producto almacenado");
            return prodNuevo;
        } catch (error) {
            console.log("Error al intentar escribir en el archivo");
            throw error;
        }
    }

    async getById(unId){
        try{
            let elementos =await this.knex.select().table(this.tabla).where('id',Number(unId));
            return elementos
        } catch (error) {
            throw error;
        }
    }

    async update(obj) {
        try {
            obj.id = Number(obj.id)
            await this.knex(this.tabla).where('id',obj.id).update(obj)
            return(obj);
        } catch (error) {
            return({ error: "Error al actualizar" });
        }
    }

    async deleteById(unId) {
        try {
            const eliminados =  await this.knex(this.tabla).where('id',Number(unId)).delete()
            return eliminados
        } catch (error) {
            throw error;
        }
    }
    async deleteAll(){
        try {
            await this.knex(this.tabla).truncate()
        } catch (error) {
            throw error;
        }
    }

} 

module.exports= MysqlContenedor;