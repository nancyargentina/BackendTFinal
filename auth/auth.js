function auth (req,res,next){
     //console.log(req)
    if (req.isAuthenticated()) {
         next()
    } else {
         res.render("login")
    }
}
module.exports = auth 