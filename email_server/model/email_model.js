/// The fdModel is for five day data retrived from i taqs and format it  anf faive day names 
var request = require('request');
exports.getFd=function(id,callback)
{
	try
	{
		var url = "http://api.arabiaweather.com/web_service/rest/website/fd/id/json/aaaaa/"+id+"/ar";
		
		request(url,function(error, response, body)
		{
			
			if(error) 
			{
				format_fivedays(null,function(formattedFd){
						
						callback(error,formattedFd);
					});
			}
			else
			{
				format_fivedays(body,function(formattedFd){
						//console.log(formattedFd);
					callback(error,formattedFd);
				});
			}
				
		});
		
	}
	catch(exception)
	{
		callback(exception,null);
	}
}
/// format fivedays for the first day 
format_fivedays=function(data,cb)
{
	data=JSON.parse(data);
	if(data != null && data['five-days'] != null && data['five-days'].location != null && data['five-days'].location.forecast != null && data['five-days'].location.forecast.step != null)
		{
			var item = data['five-days'].location.forecast.step[0];
			var itemNight=data['five-days'].location.forecast.step[1];
			data = data['five-days'].location;
			
	}
	else
	{
		var currentDate = new Date();
		var day = currentDate.getDate();
		var month = currentDate.getMonth() + 1;
		
		data = [
				{dhmn:'غير متوفر',d:'2014-'+month+'-'+(day),dn:'غير متوفر',dh:'2014-'+month+'-'+(day),sd:'غير متوفر',t:'غير متوفر',s:'0',tf:'غير متوفر',rh:'غير متوفر',wn:'غير متوفر',ws:'غير متوفر'}
			];
		
	}
	var result = [];
	var dayItems={};
	
			var date_hijri=item.dh.split('-');
			var date=item.d.split('-');
				
			dayItems={		
						d:date[2]+"/"+date[1]+"/"+date[0]+"م",
						dh:date_hijri[2]+"/"+date_hijri[1]+"/"+date_hijri[0]+"هـ",
						dhmn:item.dhmn,
						
						day:{
								 sd:item.sd,
								 t:item.t,
								 s:format_image(item.s,1),
								 tf:item.tf,
								 rh:item.rh,
								 wn:format_wind_direction(item.wn),
								 ws:item.ws
							 },
							 
						night:{ sd:itemNight.sd,
								 t:itemNight.t,
								 s:format_image(itemNight.s,0),
								 tf:itemNight.tf,
								 rh:itemNight.rh,
								 wn:format_wind_direction(itemNight.wn),
								 ws:itemNight.ws
								 },
						location:data.name
						};
			
		cb(dayItems);
}
format_wind_direction=function(wn)
{
	$text = " ";
	
	switch (parseInt(wn)) {
		case 0:
			$text = "هادئة";
			break;
		case 1:
			$text = "شمالية";
			break;
		case 2:
			$text = "شمالية شرقية";
			break;
		case 3:
			$text = "شرقية";
			break;
		case 4:
			$text = "جنوبية شرقية";
			break;
		case 5:
			$text = "غربية";
			break;
		case 6:
			$text = "جنوبية غربية";
			break;
		case 7:
			$text = "غربية";
			break;
		case 8:
			$text = "شمالية غربية";
			break;
		case 10:
			$text = "متغيرة الإتجاه";
			break;
		default:
			$text ="غير متوفر";
			break;
			
	}
	
	return $text;
}
format_image=function (img,is_day)
{
	var result = '';
	if(is_day==0)
	{
		// Night
		result = 'N'+img;
	}
	else
	{
		// Day
		result = ''+img;
	}
	return result.toUpperCase();
}

