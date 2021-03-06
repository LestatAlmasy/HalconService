exports = module.exports = function(app, mongoose) {

	var eventSchema = new mongoose.Schema({
		fecha: 			{ type: Date, default: Data.now },
		categoria: 		{ type: String, enum: ['info','error','warning'] },
		descripcion: 	{ type: String }
	});

	mongoose.model('Event', eventSchema);

};

/*
var mongoose = require('mongoose');
var options = {
  user: process.env.OPENSHIFT_MONGODB_DB_USERNAME,
  pass: process.env.OPENSHIFT_MONGODB_DB_PASSWORD
}

mongoose.createConnection('mongodb://'+process.env.OPENSHIFT_MONGODB_DB_HOST+':'+process.env.OPENSHIFT_MONGODB_DB_PORT+'/'+'halconservice', options);
var Schema = mongoose.Schema;


var eventoSchema = new Schema({
	fecha: 			{ type: Date, default: Date.now }, 
	categoria: 		{ type: String, enum: ['info','error','warning']	}, /* info, error, warning*/
/*	descripcion: 	{ type: String 	}
});

console.log('SCHEMA event CREADO');

module.exports = mongoose.model('EventoFinal', eventoSchema);

mongoose.disconnect();
*/