var mongoose = require('mongoose');
var options = {
  user: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
  pass: process.env.OPENSHIFT_MONGODB_DB_PASSWORD
}

mongoose.connect('mongodb://'+process.env.OPENSHIFT_MONGODB_DB_HOST+':'+process.env.OPENSHIFT_MONGODB_DB_PORT+'/'+'halconservice', options);
var Schema = mongoose.Schema;

var eventoSchema = new Schema({
	fecha: 			{ type: Date, default: Date.now }, 
	categoria: 		{ type: String, enum: ['info','error','warning']	} /* info, error, warning*/,
	descripcion: 	{ type: String 	}
});

console.log('SCHEMA CREADO');

module.exports = mongoose.model('EventoFinal', eventoSchema);