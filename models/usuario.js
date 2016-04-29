var mongoose = require('mongoose');
var options = {
  user: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
  pass: process.env.OPENSHIFT_MONGODB_DB_PASSWORD
}

mongoose.connect('mongodb://'+process.env.OPENSHIFT_MONGODB_DB_HOST+':'+process.env.OPENSHIFT_MONGODB_DB_PORT+'/'+'halconservice', options);
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
	user: 	{ type: String},
	pass: 	{ type: String}
});

console.log('PASE POR AQUI JIJI');

module.exports = mongoose.model('Usuario', usuarioSchema);