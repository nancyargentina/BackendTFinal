//contenedor de productos
const ArchivoContenedor =require('../contenedores/fileContenedor')

class productDaoFile extends ArchivoContenedor {
constructor(){
    super('../../data/productos.json')
}

}
module.exports= productDaoFile