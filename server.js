var express 	= require('express');
var app 		= express(); // Instancia del servidor express
var bodyParser 	= require('body-parser');
var mongoose 	= require('mongoose');

//mongoose.connect('mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/');

//Connection URL: mongodb://$OPENSHIFT_MONGODB_DB_HOST:$OPENSHIFT_MONGODB_DB_PORT/
//---mongoose.connect(process.env.MONDODB_URL + 'Personas', { db: { nativeParser: true } });
// Configurar app para usar bodyParser
// con este paquete obtendremos
// los datos enviados por POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// puerto del servidor
// podra ser seteado como argumento en comando
var ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
var port = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 3200;

// RUTAS de la API
var router = express.Router();

// ruta para probar nuestro servidor
router.get('/', function(req, res){
    res.json({message: 'Ándale, arriba arriba, yepa yepa'});
});

// Registrar las rutas con prefijo /api
app.use('/api', router);


mongoose.connect('mongodb://'+process.env.OPENSHIFT_MONGODB_DB_HOST+':'+$process.env.OPENSHIFT_MONGODB_DB_PORT+'/', function(err, res){
	if(err){
		console.log('ERROR:'+err);
	}
	// Iniciar servidor
	app.listen(port, ipaddress, function(){
		console.log('La magia esta en el puerto ' + port);
	});
	//console.log('La magia esta en el puerto ' + port);
});