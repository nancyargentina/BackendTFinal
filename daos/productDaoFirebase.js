const FirebaseContenedor = require("../contenedores/firebaseContenedor");
const dbFirebase = require("../data/dbFirebaseConfig");

class productDaoFirebase extends FirebaseContenedor {
    constructor() {
        super("Productos", dbFirebase);
    }
   /* async getElements() {
        try {
            const resultado = await this.collection.get();
            const registros = resultado.docs.map((ele) => {
                return {
                    id: ele.id,
                    codigo: ele.data().codigo,
                    nombre: ele.data().nombre,
                    descripcion: ele.data().descripcion,
                    foto: ele.data().oto,
                    precio: ele.data().precio,
                    stock: ele.data().stock,
                    timestamp: ele.data().timestamp,
                };
            });
            return registros;
        } catch (error) {
            console.log(error);
        }
    }*/
}
module.exports = productDaoFirebase;
