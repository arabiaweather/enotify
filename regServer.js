var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var validator = require('validator');
var MongoClient = require('mongodb').MongoClient, format = require('util').format;

app.use(bodyParser());


app.post('/reg', function(req, res){
	var allGood = true;
	if(!validator.isNull(req.body.email))
	{
		if(validator.isEmail(req.body.email))
		{
			//Email is valid 
		}
		else
		{
			res.send(406, "Not a valid email");i
			allGood = false;
		}
	}
	else
	{
		res.send(406, "Email is empty");
		allGood = false;
	}

	if(validator.isNull(req.body.name))
	{
		res.send(406, "Name should not be empty");
		allGood = false;
	}
	if(!validator.isNumeric(req.body.locid))
	{
		res.send(406, "Location Id is invalid");
		allGood = false;
	}
	if(allGood)
	{
		reg(req.body.name, req.body.email, req.body.locid, res);
	}
});


app.get('/unreg/:locid/:email', function(req, res){
	var allGood = true;
	if(!validator.isEmail(req.params.email))
	{
		res.send(406,"Invalid Email"); 
		allGood = false;
	}
	if(!validator.isNumeric(req.params.locid))
	{
		res.send(406,"Invalid Location Id");
		allGood = false;
	}

	if(allGood)
	{
		unreg(req.params.email, req.params.locid, res);
	}
});


//Register to mongo 
function reg(name, email, locid,res) 
{
	MongoClient.connect('mongodb://127.0.0.1:27017/emailNot', function(err, db) {
		 if(err) throw err;

		 var collection = db.collection('emailRegs');
		collection.count({'uid':email+"--"+locid}, function(err, count){
			console.log(count);
			if(count ==0)
			{
				collection.insert({'email':email, 'name':name,'locid':locid,'uid':email+"--"+locid}, function(err, docs) {
                    			console.log("Works Fine");
                       			 res.send("Done!");
                		 });
			}
			else
			{res.send(406,"Item allready  exist")};
		});
  	})	
}

//unreg to mongo 
function unreg(email,locid,res)
{
        MongoClient.connect('mongodb://127.0.0.1:27017/emailNot', function(err, db) {
                 if(err) throw err;

                var collection = db.collection('emailRegs');
                collection.remove({'uid':email+"--"+locid}, function(err, docs) {
                         console.log("Works Fine");
                        res.send("Done!");
                 });
        })

}


app.listen(80);
