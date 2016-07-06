//File: controllers/tvshows.js
var mongoose = require('mongoose');
var Event  = mongoose.model('Event');

//GET - Return all tvshows in the DB
exports.findAllEvents = function(req, res) {
	Event.find(function(err, events) {
    if(err) res.send(500, err.message);

    console.log('GET /events')
		res.status(200).jsonp(events);
	});
};

//GET - Return a Event with specified ID
exports.findById = function(req, res) {
	Event.findById(req.params.id, function(err, event) {
    if(err) return res.send(500, err.message);

    console.log('GET /event/' + req.params.id);
		res.status(200).jsonp(event);
	});
};

//POST - Insert a new TVShow in the DB
exports.addEvent = function(req, res) {
	console.log('POST');
	console.log(req.body);

	var event = new Event({
		fecha:     req.body.fecha,
		categoria: req.body.categoria,
		descripcion:     req.body.descripcion
	});

	event.save(function(err, event) {
		if(err) return res.send(500, err.message);
    res.status(200).jsonp(event);
	});
};

//PUT - Update a register already exists
exports.updateEvent = function(req, res) {
	Event.findById(req.params.id, function(err, event) {
		event.fecha		= req.body.fecha;
		event.categoria	= req.body.categoria;
		event.descripcion		= req.body.descripcion;
		
		event.save(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200).jsonp(event);
		});
	});
};

//DELETE - Delete a TVShow with specified ID
exports.deleteEvent = function(req, res) {
	Event.findById(req.params.id, function(err, event) {
		event.remove(function(err) {
			if(err) return res.send(500, err.message);
      res.status(200);
		})
	});
};