const express = require("express");
const {cartDao}=require('../daos/index')
const {Router}= express;

let router =  new Router();

//  crea un carrito vacío y devuelve su id
router.post ("/",async(req,res)=>{
    try {
        let cartEmpty = {
            timestamp: Date.now(),
            productos: []
        };
        let maxId = await cartDao.save(cartEmpty);
        res.send({maxId});
    } catch (error) {
        res.send({ error: "Error al almacenar" });
    }
})

//  devuelve todos los productos de un carrito segun su ID
router.get("/:id/productos",async(req,res)=>{
    try {
        let elementos = await cartDao.getProductsfromCart(req.params.id)
        console.log({data:elementos})
        res.render('carrito',({data:elementos}))
    } catch (error) {
        res.send({ error: "Error al leer archivo" });
    }
})

//  agrega productos al carrito por su id de producto
router.post ("/:id/productos",async (req,res)=>{
    try {
        const {productId,cant} = req.body
        const idCart= req.params.id
        await cartDao.addProductInCart(idCart,productId,cant)
        res.send({mensaje:"producto agregado al carrito"})
    } catch (error) {
        res.send({ error: `Error al guardarproducto en el carrito` });
    }
})

//  elimino un carrito segun su ID
router.delete("/:id",async(req,res)=>{
    try {
        await cartDao.deleteById(req.params.id);
        res.send("Carrito Eliminado");
    } catch (error) {
        res.send({ error: "carrito no encontrado" });
    }
})

//  Elimina un producto del carrito por su id de carrito y de producto
router.delete("/:id/productos/:id_prod",async(req,res)=>{
    try {
        await cartDao.deleteCartProduct(req.params.id, req.params.id_prod)
        res.send("producto eliminado")
        
    } catch (error) {
        res.send( {error:"Error al eliminar producto"} )
    }
})

module.exports = router