const admin = require("firebase-admin");

class FirebaseContenedor {
    constructor(collection, db) {
        this.collection = db.collection(collection);
        console.log("conectado a fierbase");
    }

    //retorno todos los elementos
    async getElements() {
        try {
            const setDatos = await this.collection.get();
            const resultado = [];
            setDatos.forEach((element) => {
                resultado.push({ id: element.id, ...element.data() });
            });
            return resultado;
        } catch (error) {
            console.log(error);
        }
    }

    async getById(id) {
        try {
            const datos = await this.collection.doc(id).get();
            return { id: datos.id, ...datos.data() };
        } catch (error) {
            console.log(error);
        }
    }

    //Almaceno un registro nuevo
    async save(obj) {
        try {
            return await this.collection.doc().create(obj);
        } catch (error) {
            console.log(error);
        }
    }

    async update(obj) {
        try {
            //busco el documento de id=obj.id y actualizo
            return await this.collection.doc(obj.id).set(obj);
        } catch (error) {
            console.log(error);
        }
    }
    //eliminar un elemento
    async deleteById(id) {
        return await this.collection.doc(String(id)).delete();
    }

}
module.exports = FirebaseContenedor;
