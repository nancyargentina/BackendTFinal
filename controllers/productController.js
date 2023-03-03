const {productDao} =require('../daos/index')
//devuelve todos los productos
const getProductsController = async (req, res) => {
    try {
        let elementos = await productDao.getElements()
        console.log({data:elementos})
        res.render('productos',({data:elementos}))
    } catch (error) {
        res.send({ error: "Error al leer archivo" });
    }
}
module.exports = {getProductsController}