var model = require("../model/email_model");
var redis = require("redis"),
client = redis.createClient();
exports.getFd = function(req, res)
{
	model.getFd(req.params.id,function(mdlError,mdlResponse)
	{
		if(mdlError)
			res.send(500);
		else
		{
			
			//mdlResponse=JSON.parse(mdlResponse);
			res.render('email.ect',{result:mdlResponse},function(err,html){
				client.set(req.url,html);
				client.expire(req.url, 900);/// 15 minute
				res.send(html);
				
			});
		}
			
	});
	
}
