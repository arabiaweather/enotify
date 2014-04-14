var express = require('express');
var app = express();
var redis = require("redis"),
client = redis.createClient();
var program = require('commander');
var crypto = require('crypto');
var ECT = require('ect');
var ectRenderer = ECT({ watch: true, root: __dirname + '/views',cache:false });
app.engine('.ect', ectRenderer.render);
program.option('-p, --port <n>', 'Port to run server on', parseInt).parse(process.argv);
if(!program.port)
{
	console.log("Please provide a port number");
	process.exit(1);
}

app.use(function(req,res,next){
	 client.get(req.url,function(err, reply) {
			if (reply==null)next();
		  else{
			  //console.log("from redis");
			  res.send(reply);
			  res.end();
		}
	 });
		
});



//Declare routes file 
require('./route/route.js')(app);
app.listen(program.port);
