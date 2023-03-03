const { argu } = require("./config");
const express = require("express");
const cluster = require("cluster");
const productRouter = require("./routes/products")
const carRouter = require("./routes/car")
const userRouter=require("./routes/usuario")
/* elegir opcion en daos/index.js
1: firebase
2: mysql
3: mongo
4:file
*/
const app= express();
app.use(express.json())
app.use(express.urlencoded({extended:true}))
//manejo de sesiones
const session = require("express-session");
const MongoStore = require("connect-mongo");
const sessionRouter=require("./routes/session")

//manejo de autenticacion
const auth = require("./auth/auth");
const passport = require("passport");
const localPassport = require("./auth/localPassport");
/*--------------------uso motor de plantillas HANDLEBARS-----------------------------*/
const { engine } = require("express-handlebars");
app.set("view engine", "hbs"); //motor handlebars
app.set("views", "./views"); //vistas hbs

app.engine(
    "hbs",
    engine({
        extname: ".hbs",
        defaultLayout: "main.hbs",
        partialsDir: __dirname + "/views/partials",
        layoutsDir: __dirname + "/views/layouts",
    })
);
app.use(express.static(__dirname + "/public"));
/*-------------------------------------------------------------------------------------*/
app.use(
    session({
        secret: "mongoKey",
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            mongoUrl:
                "mongodb+srv://coderhouse:coderhouse@cluster0.5gpphrd.mongodb.net/ecommercetf?retryWrites=true&w=majority",
            ttl: 60,
        }),
    })
);
/*-------------------------------------Rutas------------------------------------------*/
app.use(passport.initialize());
app.use(passport.session());

app.use("/productos", productRouter)
app.use("api/carrito", carRouter)
app.use("/",userRouter)
app.use("/", sessionRouter);

app.get("/", auth, (req, res) => {
    
    res.render("userHome", { data: req.user.nombre });
});

/*---------------------------MODOS DE INICIO DE SERVIDOR-------------------------------*/

if (argu.m === "CLUSTER") {
    const numProcesadores = os.cpus().length;

    if (cluster.isPrimary) {
        console.log(`Proceso maestro ${process.pid}`);
        for (let i = 0; i < numProcesadores; i++) {
            cluster.fork();
        }
        cluster.on("exit", () => {
            cluster.fork();
        });
    } else {     
        app.listen(argu.p, () => {
            console.log(
                `Escuchando el puerto ${argu.PORT} - proceso: ${process.pid}`
            );
        });
    }
} else {  
    app.listen(argu.PORT, () => {
        console.log(
            `Escuchando el puerto ${argu.PORT} - proceso: ${process.pid}`
        );
    });
}
