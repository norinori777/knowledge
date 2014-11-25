/*
 * socket.js - simple socket.io example
*/

/*jslint         node    : true, continue : true,
  devel  : true, indent  : 2,    maxerr   : 50,
  newcap : true, nomen   : true, plusplus : true,
  regexp : true, sloppy  : true, vars     : false,
  white  : true
*/
/*global */

// ------------ BEGIN MODULE SCOPE VARIABLES --------------
'use strict';

var loadSchema, checkSchema, clearIsOnline, 
checkType, constructObj, readObj, updateObj, destroyObj,

mongodb         = require('mongodb'),
fsHandle        = require('fs'),
JSV             = require('JSV').JSV,

mongoServer     = new mongodb.Server(
        '192.168.65.3',
        mongodb.Connection.DEFAULT_PORT
),

dbHandle = new mongodb.Db(
        'knowledge', mongoServer, {safe: true}),

// 作成
constructObj = function(obj_type, obj_map, callback){
	dbHandle.collection(
		obj_type,
		function(outer_error,collection){
			var options_map = {safe:true};
			collection.insert(
				obj_map,
				options_map,
				function(inner_error, result_map){
					callback( result_map );
				}
			);
		}
	);
};


// 読み出し
readObj = function ( obj_type, find_map, fields_map, callback ) {
	dbHandle.collection(
		obj_type,
		function ( outer_error, collection ) {
			collection.find( find_map, fields_map ).toArray(
				function ( inner_error, map_list ) {
					callback( map_list );
				}
			);
		}
	);
};

// 更新
updateObj = function ( obj_type, find_map, set_map, callback ) {
	dbHandle.collection(
		obj_type,
		function(error, collection){
			collection.update(
				find_map,
				set_map,
				{},
				function ( inner_error, update_count ) {
					callback({ update_count : update_count, _id: find_map._id, name: set_map.$push.sub.name,
							article:  set_map.$push.sub.article, insertdt: set_map.$push.sub.insertdt });
				}
			);
		}
	);
};


// 削除
destroyObj = function ( obj_type, find_map, callback ) {
	var type_check_map = checkType( obj_type );
	if ( type_check_map ) {
		callback( type_check_map );
		return;
	}

	dbHandle.collection(
		obj_type,
		function ( outer_error, collection ) {
			var options_map = { safe: true, single: true };

			collection.remove( find_map, options_map,
				function ( inner_error, delete_count ) {
					callback({ delete_count: delete_count });
				}
			);
		}
	);
};

module.exports = {
	makeMongoId:	mongodb.ObjectID,
	checkType:	checkType,
	construct:	constructObj,
	read:		readObj,
	update:		updateObj,
	destroy:	destroyObj
};

// ------------- BEGIN MODULE INITIALIZATION --------------
dbHandle.open( function () {
	console.log( '** Connected to MongoDB **' );
});
// -------------- END MODULE INITIALIZATION ---------------

