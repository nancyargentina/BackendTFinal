const mongoContenedor = require("../contenedores/mongoContenedor");
const cartModel = require("../models/cartModel_mongo");
const { productDao } = require("../daos/index");

class cartMongoDao extends mongoContenedor {
    constructor() {
        super(cartModel);
    }

    async getProductsfromCart(unId) {
        const unCarrito = await this.collection.getById(unId);
        return unCarrito.productos;
    }

    // guardar el producto al carrito
    async addProductInCart(idCart, productId, cant) {
        try {
            const unCarrito = await this.collection.getById(idCart);
            const unProducto = await productDao.getById(productId);
            if (unCarrito && unProducto) {
                unProducto.cantidad = cant;
                unCarrito.productos.push(unProducto);
                return await this.collection.save(unCarrito);
            }
        } catch (error) {
            return error;
        }
    }

    async deleteCartProduct(id_carrito, id_producto) {
        try {
            const unCarrito = await this.collection.getById(id_carrito);
            const listaproductos = unCarrito.productos;
            const nuevaLista = listaproductos.filter(
                (ele) => ele.id != id_producto
            );
            unCarrito.productos = nuevaLista;
            return await this.collection.save(unCarrito);
        } catch (error) {
            return error;
        }
    }
}

module.exports = cartMongoDao;
