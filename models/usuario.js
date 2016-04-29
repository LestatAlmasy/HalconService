var mongoose = requiere('mongoose')
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
	user: 	{ type: String},
	pass: 	{ type: String}
});

module.exports = mongoose.model('Usuario', usuarioSchema);