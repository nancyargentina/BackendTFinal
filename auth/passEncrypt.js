const bcrypt=require('bcrypt')

function encryptPassword(password){
    const salt=bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password,salt)
}

function comparePassword(password,encryptedPass){
    return bcrypt.compareSync(password,encryptedPass)
}

module.exports={encryptPassword,comparePassword}