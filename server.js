var express 	= require('express');
var app 		= express(); // Instancia del servidor express
var bodyParser 	= require('body-parser');
var mongoose 	= require('mongoose');
var mongoOp     = require("./models/usuario");

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
    res.json({message: 'MIRON! sale de aqui'});
});

router.route("/users")
    .get(function(req,res){
        var response = {};
        mongoOp.find({},function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .post(function(req,res){
        var db = new mongoOp();
        var response = {};
        db.user = req.body.user;
        db.pass = require('crypto').createHash('sha1').update(req.body.pass).digest('base64');
        db.save(function(err){
            if(err) {
                response = {"error" : true,"message" : "Error adding data"};
            } else {
                response = {"error" : false,"message" : "Data added"};
            }
            res.json(response);
        });
    });

router.route("/users/:id")
    .get(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                response = {"error" : false,"message" : data};
            }
            res.json(response);
        });
    })
    .put(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                if(req.body.user !== undefined) {
                    data.user = req.body.user;
                }
                if(req.body.pass !== undefined) {
                    data.pass = req.body.pass;
                }
                data.save(function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error updating data"};
                    } else {
                        response = {"error" : false,"message" : "Data is updated for "+req.params.id};
                    }
                    res.json(response);
                })
            }
        });
    })
    .delete(function(req,res){
        var response = {};
        mongoOp.findById(req.params.id,function(err,data){
            if(err) {
                response = {"error" : true,"message" : "Error fetching data"};
            } else {
                mongoOp.remove({_id : req.params.id},function(err){
                    if(err) {
                        response = {"error" : true,"message" : "Error deleting data"};
                    } else {
                        response = {"error" : true,"message" : "Data associated with "+req.params.id+"is deleted"};
                    }
                    res.json(response);
                });
            }
        });
    })

// Registrar las rutas con prefijo /api
app.use('/api', router);


mongoose.connect('mongodb://'+process.env.OPENSHIFT_MONGODB_DB_HOST+':'+process.env.OPENSHIFT_MONGODB_DB_PORT+'/', function(err, res){
	if(err){
		console.log('ERROR:'+err);
	}else{
		console.log('todo ok mami ok');
	}
	// Iniciar servidor
	app.listen(port, ipaddress, function(){
		console.log('La magia esta en el puerto ' + port);
	});
	//console.log('La magia esta en el puerto ' + port);
});