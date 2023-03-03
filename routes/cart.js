const express = require("express");
const {cartDao}=require('../daos/index')
const {Router}= express;

let router =  new Router();

//  crea un carrito y devuelve su id
router.post ("/",async(req,res)=>{
    try {
        //creo nuevo objeto agregando campo ID y guardo en carritos
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

//agrega productos al carrito por su id de producto
router.post ("/:id/productos",async (req,res)=>{
    try {
        const {productId,cant} = req.body
        const idCart= req.params.id
        await cartDao.addProductInCart(idCart,productId,cant)
        res.send({mensaje:"producto agregado al carrito"})
    } catch (error) {
        res.send({ error: "Error al guardar" });
    }
})

//elimino un carrito segun su ID
router.delete("/:id",(req,res)=>{
    fs.readFile("./data/cars.json","utf-8",(err,data)=>{
       if(err){
           res.send( {error:"Error al almacenar"} )
       }
       else{
           //todos los carritos
           const elementos=JSON.parse(data);
           const nuevaLista = elementos.filter(ele => ele.id != req.params.id);
           fs.writeFile(`./data/cars.json`, JSON.stringify(nuevaLista), (err) =>{
            if (err) res.send ({error:"carrito no encontrado"});
            res.send("Elemento Eliminado");
            });
       }
    })
})


//Elimina un producto del carrito por su id de carrito y de producto
router.delete("/:id/productos/:id_prod",(req,res)=>{
    fs.readFile("./data/cars.json","utf-8",(err,data)=>{
       if(err){
           res.send( {error:"Error al almacenar"} )
       }
       else{
           //todos los carritos
           const elementos=JSON.parse(data);
           const nuevaLista = elementos.filter(ele => ele.id != req.params.id);
           fs.writeFile(`./data/cars.json`, JSON.stringify(nuevaLista), (err) =>{
            if (err) res.send ({error:"carrito no encontrado"});
            res.send("Elemento Eliminado");
            });
       }
    })
})


module.exports = router