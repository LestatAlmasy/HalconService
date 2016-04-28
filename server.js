var express = require('express');
var app = express(); // Instancia del servidor express
var bodyParser = require('body-parser');

// Configurar app para usar bodyParser
// con este paquete obtendremos
// los datos enviados por POST
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());

// puerto del servidor
// podra ser seteado como argumento en comando
var port = process.env.OPENSHIFT_NODEJS_PORT || 3200;

// RUTAS de la API
var router = express.Router();

// ruta para probar nuestro servidor
router.get('/', function(req, res){
    res.json({message: 'Ándale, arriba arriba, yepa yepa'});
});

// Registrar las rutas con prefijo /api
app.use('/api', router);

// Iniciar servidor
app.listen(port);
console.log('La magia esta en el puerto ' + port);