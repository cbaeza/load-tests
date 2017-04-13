// place for write test
var app = require('../server/app.js');

var assert = require('assert');
var sinon = require('sinon');
var expect = require('chai').expect;

var http = require('http');
var request = require('request');
var options = require('../server/config.js');

//console.log(options);
console.log(options.host + ':' + options.port + options.git_status_path);

var _data = '';//require('./requests/SPEZ_93.xml');
var xml2js = require('xml2js');
var fs = require('fs');
var parser = new xml2js.Parser();

console.log(__dirname);

fs.readFile(__dirname + '/requests/SPEZ_93.xml', function(err, data) {
	if (!err) {
		_data = data; //JSON.stringify(data);
		console.log(_data);
	}else{
		console.log('ERROR READING XML');
	}
});

describe('api', function() {
	/*beforeEach(function() {
		this.request = sinon.stub(http, 'request');
	});
 
	afterEach(function() {
		http.request.restore();
	});*/
 
	/*it('Git status - GET', function(done){
		request({
			method : 'GET',
			uri: options.host + ':' + options.port + options.git_status_path
		}, function(error, response, body){
			console.log(error);
			console.log(response);
			expect( error ).to.equal(null);
			expect( response.statusCode ).to.equal( 200 ); 	
			console.log( JSON.parse(body) );
			done();
		});
		
	});*/

	it('POST SPEZ_93', function(done){
		var req = http.request({
				hostname : options.host,
				port : options.port,
				path : options.path,
				method : 'POST',
				headers : {
					'Content-type' : 'application/xml',
					'Accept' : 'application/json'
				}
		}, function(error, response, body){
			//console.log(error);
			//console.log(response.body);
			expect( error ).to.equal(null);
			expect( response.statusCode ).to.equal( 200 ); 	
			//console.log( JSON.parse(body) );
			done();
		});
		req.on('error', (e) => {
			console.error(`problem with request: ${e.message}`);
		});
		req.write(_data);
		req.end();
		done();
	});
	
 
});