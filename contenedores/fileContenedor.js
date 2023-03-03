let fs = require("fs");

class ArchivoContenedor {
    constructor(nombreArchivo) {
        this.archivo = nombreArchivo;
        this.maxId = 0;
    }

    async getElements() {
        //lee archivo y retorna una promesa con los datos como objetos
        try {
            const data = await fs.promises.readFile(`.${this.archivo}`,"utf8");
            return JSON.parse(data);
        } catch (error) {
            console.log("Error al leer los elementos del archivo");
        }
    }
    getAll() {
        //llama a la promesa que contiene los lementos del archivo
        this.getElements()
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }
    async getById(unId) {
        try {
            //traigo todos los elementos
            let elementos = await this.getElements();
            //busco segun Id entre Elementos
            const item = elementos.find((ele) => ele.id === Number(unId))
            return (item);
        } catch (error){
            console.log("Error buscando por Id", error);
        }
    }
    async save(obj) {
        //conjunto de objetos del archivo
        let elementos = await this.getElements();
        //saco el maximo ID de entre los objetos, sino maxId=0
        if (elementos.length) {
            this.maxId = Math.max(...elementos.map((ele) => ele.id));
        }
        //creo nuevo objeto agregando campo ID y guardo en elements
        let objetoClon = { ...obj, id: this.maxId + 1 };
        elementos.push(objetoClon);
        //almaceno la coleccion en el archivo
        fs.writeFile(`.${this.archivo}`, JSON.stringify(elementos), (err) => {
            if (err) {
                console.log(err);
            }
        })
        //si se almacena correctamente actualizo el ID y muestro
        this.maxId += +1;
        return (this.maxId);
    }

    async deleteById(unId) {
        try {
            const elementos = await this.getElements();
            const nuevaLista = elementos.filter((ele) => ele.id !== Number(unId));
            fs.writeFile(`.${this.archivo}`, JSON.stringify(nuevaLista), (err) => {
                if (err) throw err;
                return(unId);
            });  
        } catch (error) {
            console.log(error)
        }
    }

    deleteAll() {
        fs.truncate(`.${this.archivo}`, 0, function (err) {
            if (err) throw err;
            console.log("Contenido del archivo eliminado");
        });
    }

    async update(obj) {
        try {
            //conjunto de objetos del archivo
            obj.id = Number(obj.id)
            let elementos = await this.getElements();
            const listafiltrada = elementos.filter(
                    (ele) => ele.id !== obj.id
                );
            listafiltrada.push(obj);
            //almaceno la coleccion en el archivo
            fs.writeFile(`.${this.archivo}`,JSON.stringify(listafiltrada),
            (err) => {
                 if (err) {
                    return({ error: "Error al almacenar" })}
            });
            return(obj);
        } catch (error) {
            return({ error: "Error al actualizar" });
        }
    }
}

module.exports = ArchivoContenedor;
