var http = require('http');
var options = require('./config.js');

module.exports = {
	post: function(data){
		var request = http.request({
			hostname : options.host + ':' + options.port,
			path : options.path,
			method: 'POST',
			headers: {
			 'Content-Type': 'application/xml',
			 'Accept': 'application/json'
		  	}
		}, function(response){
			console.log(response);
			var _data = '';
			response.on('data', function(chunk){
				_data += chunk;
			});
			response.on('error', function(error){
				console.log(error);
			});
			response.on('end', function(){
				
			});
		}); // req

		//request.write(JSON.stringify(data));
		request.write(data);
		request.end();
	},

	get: function(){
		var request = http.request({
			hostname : options.host + ':' + options.port,
			path : options.git_status_path,
			method: 'GET'
		}, function(response){
			console.log(response);
		}); // req
	}
};