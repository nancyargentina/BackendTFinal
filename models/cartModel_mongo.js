const mongoose =require('mongoose');

const cartSchema= new mongoose.Schema({
    timestamp: { type: Number, required: true, default: Date.now() },
    productos: [{
        timestamp: { type: Number, required: true, default: Date.now() },
        nombre: { type: String, required: true, maxLength: 50, unique: true },
        descripcion: { type: String, required: true },
        codigo: { type: Number, required: true },
        foto: { type: String, required: true },
        precio: { type: Number, required: true, default: 0 },
        cantidad: { type: Number, required: true },
    }],
    usuario: {type:String, required:true}
});
const cartModel= mongoose.model("carritos", cartSchema);
module.exports= cartModel