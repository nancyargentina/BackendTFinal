const express = require("express");
const { Router } = express;
const auth=require("../auth/auth")
const {userDao}=require("../Daos/index")
let router = new Router();

router.get('/userHome',auth,(req,res)=>{
    res.render("userHome",{data:{name:req.user.nombre,email:req.user.email}})
})
router.get('/cuenta',auth,async(req,res)=>{
    try {
        const usuario = await userDao.getByEmail(req.user.email)
        res.render("datosPersonales", {usuario})
    } catch (error) {
        res.json({mensaje:error})
    }
})

module.exports = router;