const passport = require("passport");
const LocalStrategy = require("passport-local");
const passEncrypt = require("./passEncrypt");
const { userDao } = require("../daos/index");
const sendMail = require("../utils/mailer");

passport.use("login",
    new LocalStrategy(
        {
            usernameField: "email",
            passworField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            const usuario = await userDao.getByEmail(email);
            //const existe = await userDao.userValidate(email, password);
            if (
                usuario &&
                passEncrypt.comparePassword(password, usuario.password)
            ) {
                return done(null, usuario);
            } else {
                done(null, false);
            }
        }
    )
);

passport.use("registro",
    new LocalStrategy(
        {
            usernameField: "email",
            passworField: "password",
            passReqToCallback: true,
        },
        async (req, email, password, done) => {
            const existe = await userDao.userRegisted(email, password);
            if (existe != null && existe.length > 0) {
                //usuario existe
                return done(null, false);
            } else {
                //creo usuario nuevo
                const userNew = {
                    nombre: req.body.nombre,
                    email: req.body.email,
                    password: passEncrypt.encryptPassword(password),
                    direccion: {
                        calle: req.body.calle,
                        numero: req.body.numero,
                        ciudad: req.body.ciudad,
                        provincia: req.body.provincia,
                        pais: req.body.pais,
                    },
                    edad: Number(req.body.edad),
                    telefono: req.body.telefono,
                    foto: req.file.filename,
                };
                const a = await userDao.save(userNew);
                console.log(a);

                const mailOptions = {
                    from: "CURSO BACKEND<zoe.arg@gmail.com>",
                    to: "zoe.arg@gmail.com",
                    subject: "Backend tienda - Nuevo usuario",
                    html: `<h3>Nuevo registro de usuario</h3>
        <p> Datos:</p>
        <ul>
        <li> Nombre: ${userNew.nombre}</li>
        <li> Email: ${userNew.email}</li>
        <li> Teléfono: ${userNew.edad}</li>
        <li> Edad: ${userNew.telefono}</li>
        <li> Direccion: ${userNew.direccion.calle}, N°${userNew.direccion.numero}, Ciudad:${userNew.direccion.ciudad},
        provincia:${userNew.direccion.provincia}, país:${userNew.direccion.pais} </li>
        </ul>`,
                };
                const email = await sendMail(mailOptions);
                done(null, a);
            }
        }
    )
);
passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});
passport.deserializeUser(async (id, done) => {
    const usuarioDB = await userDao.getById(id);
    done(null, usuarioDB);
});
