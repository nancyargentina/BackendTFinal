const { argu } = require("../config");
/* elegir opcion:
1: firebase
2: mysql
3: mongo
4:file
*/
const unaOpcion = argu.d; //elijo una opcion de base de datos
let productDao;
let userDao;
let cartDao;

if (unaOpcion == 1) {
    //Productos almacenado en Firebase
    const dbFirebase = require("../data/dbFirebaseConfig");
    const productDaoFirebase = require("./productDaoFirebase");
    productDao = new productDaoFirebase();

} else if (unaOpcion == 2) {
    //Productos almacenado en Mysql
    const productDaoMysql = require("./producDaoMysql");
    productDao = new productDaoMysql();

} else if (unaOpcion == 3) {
    const conexion = require("../data/dbMongoConfig");
    conexion();

    //Productos almacenado en Mongo
    const productDaoMongo = require("./productDaoMongo");
    productDao = new productDaoMongo();

    //Usuarios almacenado en Mongo
    const userDaoMongo = require("./userDaoMongo")
    userDao= new userDaoMongo()

    //Carritos alamcenado en mongo
    const cartDaoMongo = require("./cartDaoMongo")
    cartDao = new cartDaoMongo()


} else {
    //Producto almacenado con archivos
    const productDaoFile = require("./productDaoFile");
    productDao = new productDaoFile();
}
module.exports = {productDao , userDao, cartDao};
