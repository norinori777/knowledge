'use strict';

var configRoutes, 
auth		= require('basic-auth'),
crud		= require('./crud'),
makeMongoId	= crud.makeMongoId;

configRoutes = function(app, server){
	app.all('/:obj_type/*?', function(req,res,next){
		res.contentType('json');
		next();
	});

	app.get('/:obj_type',function(req,res){
		crud.read(
			req.params.obj_type,
			{},{},
			function(map_list){res.json(map_list);}
		);
	});

	app.post('/:obj_type',function(req,res){
		var
		user = auth(req),
		send_data = req.body,
		data = {insertdt: new Date(),name:user.name,article:send_data.data};

		crud.construct(
			req.params.obj_type,
			data,
			function(result_map){res.json(result_map);}
		);
	});

	/*
	app.post('/:obj_type/list',function(req,res){
		crud.read(
			req.params.obj_type,
			{},{},
			function(map_list){res.json(map_list);}
		);
	});

	app.get('/:obj_type/list',function(req,res){
		crud.read(
			req.params.obj_type,
			{},{},
			function(map_list){res.json(map_list);}
		);
	});

	app.post('/:obj_type/add', function(req,res){
		var
		user = auth(req),
		send_data = req.body,
		data = {$push:{sub:{name:user.name,article:send_data.data,insertdt: new Date()}}};

		crud.update(
			req.params.obj_type,
			{_id: makeMongoId(send_data.filter._id)},
			data,
			function(result_map){res.json(result_map);}
		);
	});
	
	app.post('/:obj_type/create',function(req,res){
		var
		user = auth(req),
		send_data = req.body,
		data = {name:user.name,article:send_data.data,insertdt: new Date()};

		crud.construct(
			req.params.obj_type,
			data,
			function(result_map){res.json(result_map);}
		);
	});

	app.get('/:obj_type/read/:id',function(req,res){
		crud.read(
			req.params.obj_type,
			{ _id: makeMongoId( req.params.id ) },
			request.body,
			function(result_map){res.send(result_map);}
		);
	});
		
	app.get('/:obj_type/update/:id',function(req,res){
		crud.update(
			req.params.obj_type,
			{ _id: makeMongoId( req.params.id ) },
			req.body,
			function(result_map){res.send(result_map);}
		);
	});

	app.get('/:obj_type/delete/:id([0-9]+)',function(req,res){
		crud.destroy(
			req.params.obj_type,
			{ _id: makeMongoId( req.params.id ) },
			function(result_map){res.send(result_map);}
		);
	});
		
	app.get('/', function (req, res) {
		res.send('Hello, World!');
	});
	app.get( '/test', function(req,res){
		res.send( {title: 'I want to sleep now' });
	});
	*/
};

module.exports = {configRoutes: configRoutes};
