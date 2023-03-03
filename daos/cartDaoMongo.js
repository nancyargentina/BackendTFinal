const mongoContenedor = require('../contenedores/mongoContenedor')
const cartModel = require('../models/cartModel_mongo')
const productModel=require('../models/productsModel_mongo')

class cartMongoDao extends mongoContenedor{
    constructor(){
        super(cartModel)
    }

    async getProductsfromCart(unId){
        const unCarrito = await this.collection.getById(unId)
        return unCarrito.productos
   }
   //aca----- guardar el producto al carrito
   async addProductInCart(idCart,productId,cant){
    const unCarrito = await this.collection.getById(idCart)
    const unProducto= await productModel.collection.getById(productId)

    if (unCarrito && unProducto) {
    unProducto.cantidad= cant
        unCarrito.productos.push(unProducto) 
        await this.collection.save(unCarrito)
    }

    return
   }
}


module.exports= cartMongoDao
