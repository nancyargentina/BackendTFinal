const mongoose =require ('mongoose');

const productsSchema = new mongoose.Schema({
    timestamp: { type: Number, required: true, default: Date.now() },
    nombre: { type: String, required: true, maxLength: 50, unique: true },
    descripcion: { type: String, required: true },
    codigo: { type: Number, required: true },
    foto: { type: String, required: true },
    precio: { type: Number, required: true, default: 0 },
    stock: { type: Number, required: true },
});

const productModel = mongoose.model("Productos", productsSchema);
module.exports= productModel
