const express = require("express");
const { Router } = express;
const passport = require("passport");
;
const auth = require("../auth/auth");
const session = require("express-session");
let router = new Router();

const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, avatar, cb) {
        cb(null, "./public/avatares/");
    },
    filename: function (req, avatar, cb) {
        const usuario = req.body.email
        const uniqueSuffix = usuario;
        cb(null, uniqueSuffix+"_"+avatar.originalname);
    },
});

const upload = multer({ storage: storage });

router.get("/", auth, (req, res) => {
    res.render("login");
});
/*-------------------------------ingreso------------------------------------------------*/
router.get("/login", (req, res) => {
    res.render("login");
});
router.get("/errorLogin", (req, res) => {
    res.render("errorLogin");
});
router.get("/logout", auth, (req, res) => {
    const nombre = req.user.nombre;
    req.logout((error) => {
        if (error) {
            res.send("Error cerrando la sesión");
        } else {
            res.render("logout", { data: nombre });
        }
    });
});
router.post("/login",
    passport.authenticate("login", {
        failureRedirect: "/errorLogin",
        successRedirect: "/userHome",
    })
);
/*-------------------------------registracion------------------------------------------------*/
router.get("/registro", (req, res) => {
    res.render("registro");
});
router.get("/errorRegistro", (req, res) => {
    res.render("errorRegistro");
});
router.post("/registro", upload.single("avatar"),
    passport.authenticate("registro", {
        failureRedirect: "/errorRegistro",
        successRedirect: "/userHome",
    })
);
module.exports = router;
