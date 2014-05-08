var MongoClient = require('mongodb').MongoClient, format = require('util').format;
var redis = require("redis"),client = redis.createClient();

var apikey = "key-1qcer2yvk6-fyaqpwc8g662wys1-nn86";
var domain = "sandbox8eac19bb33ac4bf9a83ece99091959b4.mailgun.org";
var timeBetweenSends = 3000; //ms
var request = require('request');

var list;

getEmails();

function getEmails()
{

	MongoClient.connect('mongodb://127.0.0.1:27017/emailNot', function(err, db) {
		 if(err) throw err;

		 var collection = db.collection('emailRegs');
		 collection.find().toArray(function(err,docs){
			//send out the emails stupidly) 	
			list = docs;
			startSending();
		        db.close();
 
		})
	})
}

function startSending()
{
	var recp = list.pop();
	console.log(recp);
	
	var currenthtml;
	request({url:"http://188.226.210.162:190/fd/"+recp.locid, timeout:1000}, function(werr, wresp,wbody){
		if(werr)
		{
			//There is an error
			if(list.length>0)
                        	{startSending();}
                        else
                                {console.log('done'); process.kill();}
		}		
		else
		{
			request.post("https://api.mailgun.net/v2/"+domain+"/messages",function(err,resp,body){
                        	console.log(err);
				console.log(resp);
                        	if(list.length>0)
                             	  	{startSending();}
                        	else
                        	        {console.log('done'); process.kill();}
                	}).form({
                        	'text':'Your Email Client does not support HTML. www.arabiaweather.com',
           			'html':wbody,
                        	'to':recp.email,
                        	'subject':"طقس اليوم",
                	        "from":"Arabiaweather | طقس العرب arabiaweather@"+domain,
				"o:campaign":"notification"
        	        }).auth("api",apikey,true);
		
		}
	});	
}


//read from mongo
//push to redis
//pop and process, create email, attach campaign and send  
//if failed push to failed db

