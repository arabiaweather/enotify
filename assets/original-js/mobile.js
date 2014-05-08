var globalSettings=
{
	currentDomain:"none",
	currentCountryID:-1,
	defaultCookieValues:
	{
		locationID:'',
		locationTitle:'',
		adminID:'',
		adminTitle:''
	},
	currentUrl: $(location).attr('href'),
	debug:false,
	font:
	{
		min:'14px',
		max:'40px'
	}
	
};

trace = function(msg)
{
	if(globalSettings.debug)
	{
		console.log("<< Start trace >> ");
		console.log("Message: ");
		console.log(msg);
		console.log("<< End trace >>");
	}
};

///collapsable menu
function collapsableMenu() {
	subMenu = $('ul li ul');
	parentMenu = $('ul li ul').parent();//menu have sub menus
    subMenu.css('display', 'none');//hide subMenu
	parentMenu.css('cursor' , 'pointer');
	//change href to link
	parentMenu.each(function() {
        parentMenuHref = $(this).children('a').attr('href');
		parentMenuLink = $(this).children('a').attr('link' , parentMenuHref);
		$(this).children('a').removeAttr('href');
    });
	parentMenu.click(function(e) {
		menuChild = $(this).children('ul') ;
		if(menuChild.css('display') == 'none'){
			menuChild.slideDown(500,closeOthers());
		}else{
			linkTo = $(this).children('a').attr('link');
			trace(linkTo);
			window.location = linkTo ;
		};//EOF: if else
    });//EOF: click
	closeOthers = function(){
		subMenu.each(function() {
			$(this).slideUp(500);
        });//EOF: each
	};//EOF: closeOthers()
};//EOF: document ready
///EOF: collapsable menu

///function clickToScroll
clickToScroll = function(selector){
	$(selector).click(function () {
		var whereToScroll = $(selector).position().top ;
	   $('htm , body').animate({scrollTop: whereToScroll}, 800);
	   console.log('whereToScroll ? '+whereToScroll);
	});
};///EOF: clickToScroll

///function backToTop
backToTop = function(selector){
	$(selector).click(function () {
		var whereToScroll = 0 ;
	   $('htm , body').animate({scrollTop: whereToScroll}, 290);
	});
};///EOF: backToTop

///increaserFontSize Function
increaseFontSize = function(selector){
	if( $(selector).css('font-size') < globalSettings.font.max){
		$(selector).css('font-size' , '+=2px');
		$.cookie('aw_font_size' , $(selector).css('font-size'));
	};//end if
};///EOF: increaseFontSize Function

///decreaseFontSize Function
decreaseFontSize = function(selector){
	if( $(selector).css('font-size') > globalSettings.font.min){
		$(selector).css('font-size' , '-=2px');
		$.cookie('aw_font_size' , $(selector).css('font-size'));
	};//end if
};///EOF: decreaseFontSize Function

///setFontSize Function to set from cookie
setFontSize = function(selector){
	$(selector).css('font-size' , $.cookie('aw_font_size'));
};///EOF: setFontSize Function

function marqueeTicker(){
	var selector = '.active-notification';
	var notificationsCount = $('#notification-bar li').length;
	if(notificationsCount == 1){
		//only one item
		$('#notification-bar li').addClass('active-notification');
	}
	var marqueeSpeed = 4000; //per page width
	var tickerSpeed = 2000 ;
	var marginBefore = 35;
	var marginAfter = 20;
	var firstNotification = $('#notification-bar .first');
	var windowWidth = window.innerWidth;
    var notificationWidth = $(selector).children('span').width();
    var notificationHeight = $(selector).height();
	var speedPercentage = notificationWidth / windowWidth;
	var MarqueeEnd = marginBefore;
	//console.log(notificationWidth+' / '+windowWidth);
	if(notificationWidth > windowWidth){
		MarqueeEnd = (notificationWidth - windowWidth + marginAfter) * -1 +'px' ;
	}
	//reload if only one item
	if($(selector).children('span').css('right') == MarqueeEnd && MarqueeEnd != marginBefore){
		$(selector).children('span').animate({right : marginBefore },marqueeSpeed/10);
	}
	
	$(selector).children('span').animate({right : MarqueeEnd }, marqueeSpeed * speedPercentage, function() {
    	// Marquee complete.
		if(!$(selector).hasClass('last')){
			$(selector).removeClass('active-notification').next('li').addClass('active-notification');
			$(selector).children('span').css('right', marginBefore + 'px');
			$('#notification-bar').animate({top : '-='+notificationHeight+'px'}, tickerSpeed, function(){
				// Animation complete.
				marqueeTicker();
			});
		}else{
			$(selector).removeClass('active-notification');
			firstNotification.addClass('active-notification');
			firstNotification.children('span').css('right', marginBefore + 'px');
			//$('#notification-bar').css('top' , notificationHeight * -1);
			$('#notification-bar').animate({top : 0 }, tickerSpeed/2.5 , function(){
				// Animation complete.
				marqueeTicker();
			});
		}//end if else
	});
};//EOF: marqueeTicker


function collapsibleWeather(hiddenDataSelector , hiddenDataParent){
	hiddenData = $(hiddenDataSelector);
	parentRow = $(hiddenDataSelector).parent(hiddenDataParent);//menu have sub menus
    hiddenData.css('display', 'none');//hide hiddenData
	parentRow.css('cursor' , 'pointer');
	parentRow.click(function() {
		menuChild = $(this).children('.hidden-data') ;
		if(menuChild.css('display') == 'none'){
			menuChild.slideDown(500,closeOtherRows());
			$(this).addClass('shown');
			$(this).removeClass('hidden');
		}else{
			menuChild.slideUp(500,closeOtherRows());
			$(this).addClass('hidden');
			$(this).removeClass('shown');
		};//EOF: if else
    });//EOF: click
	closeOtherRows = function(){
		hiddenData.each(function() {
			$(this).parent(hiddenDataParent).addClass('hidden');
			$(this).parent(hiddenDataParent).removeClass('shown');
			$(this).slideUp(500);
        });//EOF: each
	};//EOF: closeOtherRows()
};//EOF collapsibleWeather

/// Detect whether device supports orientationchange event, otherwise fall back to the resize event.
var supportsOrientationChange = "onorientationchange" in window,
    orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";

var currentOrientation = window.orientation;

window.addEventListener(orientationEvent, function() {
	
    if(window.orientation != currentOrientation){
		//refresh The Page
		location.reload();
	}
	
}, false); ///EOF: orientationchange event

//======================================== PLUGINS =======================================
/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as anonymous module.
		define(['jquery'], factory);
	} else {
		// Browser globals.
		factory(jQuery);
	}
}(function ($) {
	var pluses = /\+/g;
	function encode(s) {
		return config.raw ? s : encodeURIComponent(s);
	}
	function decode(s) {
		return config.raw ? s : decodeURIComponent(s);
	}
	function stringifyCookieValue(value) {
		return encode(config.json ? JSON.stringify(value) : String(value));
	}
	function parseCookieValue(s) {
		if (s.indexOf('"') === 0) {
			// This is a quoted cookie as according to RFC2068, unescape...
			s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
		}
		try {
			// Replace server-side written pluses with spaces.
			// If we can't decode the cookie, ignore it, it's unusable.
			// If we can't parse the cookie, ignore it, it's unusable.
			s = decodeURIComponent(s.replace(pluses, ' '));
			return config.json ? JSON.parse(s) : s;
		} catch(e) {}
	}
	function read(s, converter) {
		var value = config.raw ? s : parseCookieValue(s);
		return $.isFunction(converter) ? converter(value) : value;
	}
	var config = $.cookie = function (key, value, options) {
		// Write
		if (value !== undefined && !$.isFunction(value)) {
			options = $.extend({}, config.defaults, options);
			if (typeof options.expires === 'number') {
				var days = options.expires, t = options.expires = new Date();
				t.setDate(t.getDate() + days);
			}
			return (document.cookie = [
				encode(key), '=', stringifyCookieValue(value),
				options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
				options.path    ? '; path=' + options.path : '',
				options.domain  ? '; domain=' + options.domain : '',
				options.secure  ? '; secure' : ''
			].join(''));
		}
		// Read
		var result = key ? undefined : {};
		// To prevent the for loop in the first place assign an empty array
		// in case there are no cookies at all. Also prevents odd result when
		// calling $.cookie().
		var cookies = document.cookie ? document.cookie.split('; ') : [];
		for (var i = 0, l = cookies.length; i < l; i++) {
			var parts = cookies[i].split('=');
			var name = decode(parts.shift());
			var cookie = parts.join('=');
			if (key && key === name) {
				// If second argument (value) is a function it's a converter...
				result = read(cookie, value);
				break;
			}
			// Prevent storing a cookie that we couldn't decode.
			if (!key && (cookie = read(cookie)) !== undefined) {
				result[name] = cookie;
			}
		}
		return result;
	};
	config.defaults = {};
	$.removeCookie = function (key, options) {
		if ($.cookie(key) === undefined) {
			return false;
		}
		// Must not alter options, thus extending a fresh object...
		$.cookie(key, '', $.extend({}, options, { expires: -1 }));
		return !$.cookie(key);
	};
}));//EOF: jQuery Cookie

/*! Sidr - v1.1.1 - 2013-03-14
 * https://github.com/artberri/sidr
 * Copyright (c) 2013 Alberto Varela; Licensed MIT */
(function(e){var t=!1,i=!1,o={isUrl:function(e){var t=RegExp("^(https?:\\/\\/)?((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|((\\d{1,3}\\.){3}\\d{1,3}))(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*(\\?[;&a-z\\d%_.~+=-]*)?(\\#[-a-z\\d_]*)?$","i");return t.test(e)?!0:!1},loadContent:function(e,t){e.html(t)},addPrefix:function(e){var t=e.attr("id"),i=e.attr("class");"string"==typeof t&&""!==t&&e.attr("id",t.replace(/([A-Za-z0-9_.\-]+)/g,"sidr-id-$1")),"string"==typeof i&&""!==i&&"sidr-inner"!==i&&e.attr("class",i.replace(/([A-Za-z0-9_.\-]+)/g,"sidr-class-$1")),e.removeAttr("style")},execute:function(o,n,s){"function"==typeof n?(s=n,n="sidr"):n||(n="sidr");var a,d,l,c=e("#"+n),f=e(c.data("body")),u=e("html"),p=c.outerWidth(!0),y=c.data("speed"),v=c.data("side");if("open"===o||"toogle"===o&&!c.is(":visible")){if(c.is(":visible")||t)return;if(i!==!1)return r.close(i,function(){r.open(n)}),void 0;t=!0,"left"===v?(a={left:p+"px"},d={left:"0px"}):(a={right:p+"px"},d={right:"0px"}),l=u.scrollTop(),u.css("overflow-x","hidden").scrollTop(l),f.css({width:f.width(),position:"absolute"}).addClass('sidr-shown').animate(a,y),$('#sider-overlay').css('display','block'),c.css("display","block").animate(d,y,function(){t=!1,i=n,"function"==typeof s&&s(n)})}else{if(!c.is(":visible")||t)return;t=!0,"left"===v?(a={left:0},d={left:"-"+p+"px"}):(a={right:0},d={right:"-"+p+"px"}),l=u.scrollTop(),u.removeAttr("style").scrollTop(l),f.animate(a,y).removeClass('sidr-shown'),$('#sider-overlay').css('display','none'),c.animate(d,y,function(){c.removeAttr("style"),f.removeAttr("style"),e("html").removeAttr("style"),t=!1,i=!1,"function"==typeof s&&s(n)})}}},r={open:function(e,t){o.execute("open",e,t)},close:function(e,t){o.execute("close",e,t)},toogle:function(e,t){o.execute("toogle",e,t)}};e.sidr=function(t){return r[t]?r[t].apply(this,Array.prototype.slice.call(arguments,1)):"function"!=typeof t&&"string"!=typeof t&&t?(e.error("Method "+t+" does not exist on jQuery.sidr"),void 0):r.toogle.apply(this,arguments)},e.fn.sidr=function(t){var i=e.extend({name:"sidr",speed:200,side:"left",source:null,renaming:!0,body:"body"},t),n=i.name,s=e("#"+n);if(0===s.length&&(s=e("<div />").attr("id",n).appendTo(e("body"))),s.addClass("sidr").addClass(i.side).data({speed:i.speed,side:i.side,body:i.body}),"function"==typeof i.source){var a=i.source(n);o.loadContent(s,a)}else if("string"==typeof i.source&&o.isUrl(i.source))e.get(i.source,function(e){o.loadContent(s,e)});else if("string"==typeof i.source){var d="",l=i.source.split(",");if(e.each(l,function(t,i){d+='<div class="sidr-inner">'+e(i).html()+"</div>"}),i.renaming){var c=e("<div />").html(d);c.find("*").each(function(t,i){var r=e(i);o.addPrefix(r)}),d=c.html()}o.loadContent(s,d)}else null!==i.source&&e.error("Invalid Sidr Source");return this.each(function(){var t=e(this),i=t.data("sidr");i||(t.data("sidr",n),t.click(function(e){e.preventDefault(),r.toogle(n)}))})}})(jQuery);
//EOF Sidr plugin

//jQuery Appear plugin
(function($) {
  var selectors = [];

  var check_binded = false;
  var check_lock = false;
  var defaults = {
    interval: 250,
    force_process: false
  }
  var $window = $(window);

  var $prior_appeared;

  function process() {
    check_lock = false;
    for (var index = 0; index < selectors.length; index++) {
      var $appeared = $(selectors[index]).filter(function() {
        return $(this).is(':appeared');
      });

      $appeared.trigger('appear', [$appeared]);

      if ($prior_appeared) {
        var $disappeared = $prior_appeared.not($appeared);
        $disappeared.trigger('disappear', [$disappeared]);
      }
      $prior_appeared = $appeared;
    }
  }

  // "appeared" custom filter
  $.expr[':']['appeared'] = function(element) {
    var $element = $(element);
    if (!$element.is(':visible')) {
      return false;
    }

    var window_left = $window.scrollLeft();
    var window_top = $window.scrollTop();
    var offset = $element.offset();
    var left = offset.left;
    var top = offset.top;

    if (top + $element.height() >= window_top &&
        top - ($element.data('appear-top-offset') || 0) <= window_top + $window.height() &&
        left + $element.width() >= window_left &&
        left - ($element.data('appear-left-offset') || 0) <= window_left + $window.width()) {
      return true;
    } else {
      return false;
    }
  }

  $.fn.extend({
    // watching for element's appearance in browser viewport
    appear: function(options) {
      var opts = $.extend({}, defaults, options || {});
      var selector = this.selector || this;
      if (!check_binded) {
        var on_check = function() {
          if (check_lock) {
            return;
          }
          check_lock = true;

          setTimeout(process, opts.interval);
        };

        $(window).scroll(on_check).resize(on_check);
        check_binded = true;
      }

      if (opts.force_process) {
        setTimeout(process, opts.interval);
      }
      selectors.push(selector);
      return $(selector);
    }
  });

  $.extend({
    // force elements's appearance check
    force_appear: function() {
      if (check_binded) {
        process();
        return true;
      };
      return false;
    }
  });
})(jQuery);
//EOF: jQuery Appear plugin

//======================================== END PLUGINS =======================================

//======================================== GEOLOCATION =======================================
//this function checks if browser support geolocation and gets lat,long

function showGpsLoader(show)
{
	if(show)
	{
	$("#autocomplete-ajax")
		.css("background-image","url(http://m.st.wthr.ws/assets/images/mobile-theme/loading_transparent/autocomplete.gif)")
		.css("background-position","left")
		.css("background-repeat","no-repeat")
		.css("opacity","0.6");
	}
	else
	{
		$("#autocomplete-ajax").css("background-image","none");
	}
}

function handleLocation(exceute)
{
	getGeoLocation(function(data)
		{
			// mean : err from gps or no data found in gps , so save default values
			if(data.default_cookie)
			{
				setCookie(
				{
					prefix:globalSettings.currentDomain,
					adminID:globalSettings.defaultCookieValues.adminID,
					adminTitle:globalSettings.defaultCookieValues.adminTitle,
					locationID:globalSettings.defaultCookieValues.locationID,
					locationTitle:globalSettings.defaultCookieValues.locationTitle
				});
			}
			else
			{
				setCookie(
				{
					prefix:globalSettings.currentDomain,
					adminID:data.location_id.aid,
					adminTitle:data.location_id.aname_ar,
					locationID:data.location_id.weather_id,
					locationTitle:data.location_id.lname_ar
				});
			}
			exceute(data);
		});
		
}

function handleLocationForRegionalOnly(exceute)
{
	getGeoLocation(function(data)
	{
		exceute(data);
	});
		
}

var gpsTimeOut;

function getGeoLocation(callback){
	
	//check if browser support geolocation
	if (navigator.geolocation ){
		//get the coords or show error
		var CurrentLat = '' ;
		var CurrentLong = '';
		
		//if undefined for 5 seconds callback
		gpsTimeOut = setTimeout(function(){
			if(CurrentLat == '' || CurrentLat == null){
				//get default data
				_gaq.push(['_trackEvent', 'mobileGPS', 'TimeOut']);
				alert('لم نتمكن من تحديد موقعك، يرجى البحث عن موقعك');
				callback({done:false,location_id:null,error:'ajax error',default_cookie:true});
				}
			},10000);
		
		navigator.geolocation.getCurrentPosition(function(position)
		{
			var CurrentLat = position.coords.latitude ;
			var CurrentLong = position.coords.longitude;
			//get the nearest area 
			var LinkLatLngOnly = "/ajax/geos/latLngOnly";
			var serviceLink = LinkLatLngOnly + '/' + CurrentLat + '/' + CurrentLong + '/'+globalSettings.currentDomain+'/1';
			$.ajax({
					url: serviceLink,
			}).done(function( data ) {
			clearTimeout(gpsTimeOut);
			
			  //define the nearest area
				if(data.response.length ==0)
				{
					_gaq.push(['_trackEvent', 'mobileGPS', 'notFound', CurrentLat+','+CurrentLong]);
					callback({done:true,location_id:null,error:null,default_cookie:true});
				}
				else
				{
					_gaq.push(['_trackEvent', 'mobileGPS', 'found',data.response.docs[0].lname_ar, CurrentLat+','+CurrentLong]);
					callback({done:true,location_id:data.response.docs[0],error:null,default_cookie:false})
				}
					
			  }).fail(function() {
					_gaq.push(['_trackEvent', 'mobileGPS', 'GeosFail']);
					clearTimeout(gpsTimeOut);
					//get default data
					callback({done:false,location_id:null,error:'ajax error',default_cookie:true});
			  });
		},function(error){
				_gaq.push(['_trackEvent', 'mobileGPS', 'Error']);
				clearTimeout(gpsTimeOut);
				callback({done:false,location_id:null,error:error,default_cookie:true});
			});
		
	}else{
		_gaq.push(['_trackEvent', 'mobileGPS', 'NotSupported']);
		clearTimeout(gpsTimeOut);
		//browser does NOT support geolocation
		callback({done:false,location_id:null,error:null,default_cookie:true});
	}
}

//======================================== END GEOLOCATION =======================================
//======================================== COOKIE =======================================
function setCookie(params)
{
	////!TODO add this line to settings - removed for testing on ip -
	//cookieDomain : "m."+params.prefix+".arabiaweather.com",
	var settings = {
			domainPrefix: "m_" + params.prefix + "_",
			cookiePeriod : 365,
			cookiePath : '/',
			cookieRaw:true
		};

	// Set Administrative ID
	$.cookie(settings.domainPrefix + 'settings_administrative', params.adminID, 
	{expires: settings.cookiePeriod, path: settings.cookiePath, domain: settings.cookieDomain, raw: settings.cookieRaw});
	// Set Administrative Title 
	$.cookie(settings.domainPrefix + 'settings_administrative_title', params.adminTitle, 
	{expires: settings.cookiePeriod, path: settings.cookiePath, domain: settings.cookieDomain, raw: settings.cookieRaw});
	// Set Location ID
	$.cookie(settings.domainPrefix + 'settings_location', params.locationID, 
	{expires: settings.cookiePeriod, path: settings.cookiePath, domain: settings.cookieDomain, raw: settings.cookieRaw});
	// Set Location Title
	$.cookie(settings.domainPrefix + 'settings_location_title', params.locationTitle, 
	{expires: settings.cookiePeriod, path: settings.cookiePath, domain: settings.cookieDomain, raw: settings.cookieRaw});

}

function getCookie(params)
{
	var key = getCookieKeys(params.key);
	return $.cookie("m_" + params.prefix + "_" + key);
}

function getCookieKeys(search)
{
	var key = "";
	switch(search)
	{
		case "aid":
			key = "settings_administrative";
		break;
		
		case "at":
			key = "settings_administrative_title";
		break;
		
		case "lid":
			key = "settings_location";
		break;
		
		case "lt":
			key = "settings_location_title"
		break;

	}
	return key;
}
//======================================== END COOKIE =======================================
//======================================== HOME PAGE AREA =======================================
/// Resize Gradient Area
resizeGradientArea = function(){
	var GradientAreaSettings=
	{
		minGradientHeight : 300 ,
		GradientAreaHeight : 300,
		upperBarHeight : 44,
		bottomBarHeight : 40,
		secondBarHeight : 50,
		advBarHeight : 62,
		GradientAreaWidth : window.innerWidth
	};
	//resize gradient area height
	if( window.innerHeight <= GradientAreaSettings.minGradientHeight + GradientAreaSettings.upperBarHeight + GradientAreaSettings.bottomBarHeight + GradientAreaSettings.secondBarHeight + GradientAreaSettings.advBarHeight){
		GradientAreaSettings.GradientAreaHeight = GradientAreaSettings.minGradientHeight;
	}
	else{
		GradientAreaSettings.GradientAreaHeight = window.innerHeight - GradientAreaSettings.upperBarHeight - GradientAreaSettings.bottomBarHeight - GradientAreaSettings.secondBarHeight - GradientAreaSettings.advBarHeight ;
	};//EOF: resize gradient area height
	$('.gradient-area').height(GradientAreaSettings.GradientAreaHeight + 40);
	$('.10percentHeight').css('height', (GradientAreaSettings.GradientAreaHeight * 0.1)+'px');
	$('.10percentHeight').css('line-height', (GradientAreaSettings.GradientAreaHeight * 0.1)+'px');
	$('.10percentHeight').css('font-size', (GradientAreaSettings.GradientAreaHeight * 0.1 / 2 )+'px');
	$('.10percentHeightWpadding').css('height', (GradientAreaSettings.GradientAreaHeight * 0.06)+'px');
	$('.10percentHeightWpadding').css('width', (GradientAreaSettings.GradientAreaHeight * 0.06)+'px');
	$('.10percentHeightWpadding').css('padding', (GradientAreaSettings.GradientAreaHeight * 0.02)+'px');
	$('.8percentHeightWpadding').css('height', (GradientAreaSettings.GradientAreaHeight * 0.06)+'px');
	$('.8percentHeightWpadding').css('width', (GradientAreaSettings.GradientAreaHeight * 0.06)+'px');
	$('.8percentHeightWpadding').css('padding', (GradientAreaSettings.GradientAreaHeight * 0.01)+'px');
	$('.32percentHeight').css('height', (GradientAreaSettings.GradientAreaHeight * 0.32)+'px');
	$('.32percentHeight').css('line-height', (GradientAreaSettings.GradientAreaHeight * 0.32)+'px');
	$('.8percentHeight').css('height', (GradientAreaSettings.GradientAreaHeight * 0.08)+'px');
	$('.8percentHeight').css('line-height', (GradientAreaSettings.GradientAreaHeight * 0.08)+'px');
	//width
	$('.30percentWidth').css('width', (GradientAreaSettings.GradientAreaWidth * 0.29)+'px');
	$('.17percentWidth').css('width', (GradientAreaSettings.GradientAreaWidth * 0.15)+'px');
	$('.41percentWidth').css('width', (GradientAreaSettings.GradientAreaWidth * 0.4)+'px');
	$('.10percentWidth').css('width', (GradientAreaSettings.GradientAreaWidth * 0.1)+'px');
	$('.16percentWidth').css('width', (GradientAreaSettings.GradientAreaWidth * 0.14)+'px');
	//taxonomy listing
	//$('.taxonomy-row').css('width', (GradientAreaSettings.GradientAreaWidth * 0.96)+'px');
	$('.96container').css('width', (GradientAreaSettings.GradientAreaWidth * 0.96)+'px');
	//$('.taxonomy-row').css('height', (GradientAreaSettings.GradientAreaWidth * 0.3)+'px');
	$('.full-width-button-container').css('width', (GradientAreaSettings.GradientAreaWidth * 0.96)+'px');
	$('.increasableText iframe').each(function(){
	  if($(this).attr('src').match(/youtube/)){$(this).addClass('youtubeVideo')};
	});
	$('.youtubeVideo').css('width', '100%');
	$('.youtubeVideo').css('height', (GradientAreaSettings.GradientAreaWidth * 0.66)+'px');
	
	$('.article-status-row').css('width', (GradientAreaSettings.GradientAreaWidth * 0.96)+'px');
	$('.newsletter-container').css('width', (GradientAreaSettings.GradientAreaWidth * 0.96)+'px');
	//facebook comments
	$('.fb-comments').attr('data-width', (GradientAreaSettings.GradientAreaWidth * 0.96));
	$('.fb-comments').css('margin-right', (GradientAreaSettings.GradientAreaWidth * 0.015)+'px');
	//socialbox
	$('.social-box').css('width', (GradientAreaSettings.GradientAreaWidth * 0.96)+'px');
	
	//$('.taxonomy-title-container').css('height', (GradientAreaSettings.GradientAreaWidth * 0.3 - 47)+'px');
	//$('.taxonomy-title-container').css('width', (GradientAreaSettings.GradientAreaWidth * 0.66 - 20)+'px');
	$('.node-title-container h2').css('margin-bottom', (GradientAreaSettings.GradientAreaWidth * (83/339)/5.5)+'px');
	$('.node-title-container h2').css('margin-top', (GradientAreaSettings.GradientAreaWidth * (83/339)/16)+'px');
	$('.node-title-container h2').css('font-size', ((GradientAreaSettings.GradientAreaWidth * (83/339) )/5)+'px');
	$('.node-title-container h2').css('line-height', ((GradientAreaSettings.GradientAreaWidth * (83/339) )/4)+'px');

	$('.node-date-container').css('margin-top', (GradientAreaSettings.GradientAreaWidth * (83/339)/-10)+'px');
	$('.node-date-container h2').css('font-size', ((GradientAreaSettings.GradientAreaWidth * (83/339) )/6)+'px');
	$('.node-date-container h2').css('line-height', ((GradientAreaSettings.GradientAreaWidth * (83/339) )/4)+'px');
	$('.node-date-container h2').css('margin-bottom', (GradientAreaSettings.GradientAreaWidth * (83/339)/12)+'px');
	
	$('.font-size-buttons').css('margin-top', (GradientAreaSettings.GradientAreaWidth * (83/339)/-10)+'px');
	$('.font-size-buttons').css('height' , ($('.node-date-container').height()));
	
	$('#decreaseFontSize , #increaseFontSize').css('margin-top', (GradientAreaSettings.GradientAreaWidth * (83/339)/10)+'px');
	$('#decreaseFontSize img, #increaseFontSize img').css('width' , $('#decreaseFontSize').height());
	
	percentage = GradientAreaSettings.GradientAreaWidth / 320 ;

	$('h2').css('font-size' , percentage*95 +'%');
	
	$('.country-autocomplete').css('width', (window.innerWidth - 65) +'px');
	$('.autocomplete').css('width', (window.innerWidth - 65 - 70 - 3) +'px');
	
};///EOF: resizeGradientArea function

///this function shows the black box when you click on the gradient area on homepage
showBox = function(selector){
	trace('bottom = '+$(selector).css('bottom'));
	if($(selector).css('bottom') < '0px'){
		$(selector).css('display','block');
		$(selector).animate({bottom: '0'});
	}
	else{
		hideBox(selector);
	};//end if else
};///EOF: showBox
	
///this function hides the black box when you click on it on homepage	
hideBox = function(selector){
	trace('bottom = '+$(selector).css('bottom'));
	if($(selector).css('bottom') >= '0px'){
		
		$(selector).animate(
		{bottom: '-220px'},
		500,
		function() {
			// Animation complete.
			$(selector).css('display','none');
		  }
		);
	};//end if
};///EOF: hideBox

///window resize
$(window).resize(function() {
	//resize gradient area
	resizeGradientArea();
	//responsive leader board
	resizeLB();
});///EOF: window resize

//======================================== END HOME PAGE AREA =======================================


//======================================== AutoComplete Plugin =======================================

function fill_cities()
{
	var currentDomain = globalSettings.currentDomain;
	var country_id =  globalSettings.currentCountryID;
	$.getJSON('/ajax/geos/getAdministrative/'+country_id+'/'+currentDomain, function(data)
	{
		html = "";
		$("#country-select").find('option').remove();
		$("#city-select").html('');
		var cindex = parseInt(country_id);
		if (cindex == -1)
			return;
		
		var cities = data[Object.keys(data)[0]].city;
		var default_city_title = "";
		
		var administrativeCookie = getCookie({key:'aid',prefix:currentDomain});
	
		$.each(cities, function(key, value) {
			if(value.id == administrativeCookie)
				html += '<option value="' + value.id + '" selected="selected" >' + value.title + '</option>';
			else
				html += '<option value="' + value.id + '" >' + value.title + '</option>';
		});
		$("#country-select").append(html);
		
		change_region();
	});
}

function change_region()
{
	var currentDomain = globalSettings.currentDomain;
	var country_id =  globalSettings.currentCountryID;

	$.getJSON('/ajax/geos/getLocations/'+country_id+'/'+currentDomain, function(data)
	{
		html = "";
		$("#city-select").find('option').remove();
		var selectedAdministrative = $("#country-select").val();
		var saIndex = parseInt(selectedAdministrative);
		if (saIndex === -1)
			return;
	   
		myRegions = data[saIndex].regions;
	   
		$.each(myRegions, function(key, value) {
			html += '<option value="' + value.id + '">' + value.title + '</option>';
		});
		$("#city-select").append(html);
		// Check Cookie IsSet

		var administrativeCookie = getCookie({prefix:currentDomain,key:'aid'});
		var locationCookie = getCookie({prefix:currentDomain,key:'lid'});
		
	
		if (locationCookie !== null && selectedAdministrative == administrativeCookie)
			$("#city-select").val(locationCookie).attr("selected", true);
		else
			$("#city-select option:first").attr('selected',true);
			
	});
	
}  

function initzAutoComplete(callback)
{	
	
	// AutoComplete
	$('#autocomplete-ajax').autocomplete({
		paramName:'',
		params:{cid:globalSettings.currentCountryID},
		serviceUrl: '/ajax/geos/autoComplete/',
		dataType:'json',
		transformResult: function(source) {
			
			return {
				
				suggestions: $.map(source.response.docs, function(dataItem) {
					return { value: dataItem.lname_ar, ox:{region_id: dataItem.weather_id,city_id:dataItem.aid,city_name:dataItem.aname_ar} };
				})
			};
		},
		onSelect: function (suggestion) {
			setCookie(
			{
				prefix:globalSettings.currentDomain,
				adminID:suggestion.ox.city_id,
				adminTitle:suggestion.ox.city_name,
				locationID:suggestion.ox.region_id,
				locationTitle:suggestion.value
			});
			
			callback();
		},
		onHint: function (hint) {
			$('#autocomplete-ajax-x').html(hint);
		},
		onInvalidateSelection: function() {
			//$('#selction-ajax').html('You selected: none');
		}
	}); // End Of AutoComplete
	
	
	
	$("#autocomplete-ajax").focus(function(e) {
		$(this).val('');
	}).blur(function(e) {

		$(this).val(getCookie({key:'lt',prefix:globalSettings.currentDomain}));
	});

} /// EOF:autoComplete
	
//======================================== END AutoComplete Plugin =======================================

/// Home page inner widget
function loadInnerPageWidget(){
	
	var weather_id = getCookie({prefix:globalSettings.currentDomain,key:'lid'});
	$( "#inner-page-weather-widget" ).hide();
	$.get("/weather/innerPageWeatherWidget/"+ weather_id , function( data ) {
		$("#inner-page-weather-widget").html(data);
	}).done(function() {
		var cookieLocationTitle = getCookie({prefix:globalSettings.currentDomain,key:'lt'});
		$(".dayname").html(cookieLocationTitle);
		$( "#inner-page-weather-widget" ).fadeIn(750);
	});
}

//======================================== Document ready =======================================
$(document).ready(function() {
	//Call Side Menu sidr
	$('#simple-menu , #sidr-logo , #sider-overlay').sidr();
	//responsive leader board
	resizeLB();
	
	//Call Collapsable Menu
	collapsableMenu();
	//Domain Menu
	$('.flag').change(function(){
		currentHref = window.location.origin;//window.location.href ;
		newHref = currentHref.replace(window.location.origin , 'http://m.'+$('.flag option:selected').attr('prefix')+'.arabiaweather.com');
		window.location.href = newHref;
	});
	//back to top button
	backToTop('#back-to-top');
	//popup box hide
    $('#select-area-close , #select-area-close-btn , .weather-box , #overlay-autocomplete').click(function(e) {
    	$('#overlay-autocomplete , .select-area-box').fadeOut(400);
	});
	//popup box show
	$('#select-your-area').click(function(e) {
       
        var administrativeCookie = getCookie({prefix:globalSettings.currentDomain,key:'aid'});
		$("#country-select").val(administrativeCookie).attr("selected", true).trigger("change");
		 $('#overlay-autocomplete , .select-area-box').fadeIn(400);
    });
    
    // Popup [select city]
	$("#country-select").change(function() {
		change_region();
	});
	
	//resize gradient area
	resizeGradientArea();
	//onClick increaseFontSize
	$('#increaseFontSize').click(function(){ increaseFontSize('.increasableText p'); });
	//onClick decreaseFontSize
	$('#decreaseFontSize').click(function(){ decreaseFontSize('.increasableText p'); });
	//set font size from cookie
	setFontSize('.increasableText p');
	// search 
$('#seach-keyword,#search-page-input').keypress(function (e) {
  if (e.which == 13) {
	var searchUrl = location.origin+"/q/"+$(this).val();
	location.href = searchUrl;
    return false;    //<---- Add this line
  }
});
	
});
//======================================== END Document ready =======================================
//card
$(function() {
	$(document.body).on('appear', '.card', function(e, $affected) {
		// add class called “appeared” for each appeared element
		$(this).addClass("appeared");
	});
	$('.card').appear({force_process: true});
});
//responsive leaderboard
var LBOriginalWidth = 728;
var LBOriginalHeight = 90;
function resizeLB(){
	var LBScale = (window.innerWidth / LBOriginalWidth ) < 1 ? ( window.innerWidth / LBOriginalWidth):1;
	var newLBWidth = LBScale * LBOriginalWidth;
	var newLBHeight = LBScale * LBOriginalHeight;
    $('.lb-adv').css('-webkit-transform','scale('+ LBScale +')').css('-moz-transform','scale('+ LBScale +')').css('-o-transform','scale('+ LBScale +')').parent('.lb-container').css('height', newLBHeight);
	$('body').css('padding-top', 44 + newLBHeight + 10);
	$('#notification-bar-container').css('top', 44 + 50 + 10 +$('.lb-container').height());
}//EOF: resizeLB()
resizeLB();