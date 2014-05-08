function trackEvents(){

$('.main-menu-btn').click(function(){_gaq.push(['_trackEvent', 'Click', 'MainMenu']);});
$('.flag-container').click(function(){_gaq.push(['_trackEvent', 'Click', 'FlagMenu']);});
$('.setting-gear').click(function(){_gaq.push(['_trackEvent', 'Click', 'settingGear']);});
$('.gps-button').click(function(){_gaq.push(['_trackEvent', 'Click', 'gps']);});
$('.cn-main-btn').click(function(){
if($('.cn-menu-container').hasClass('opend')){_gaq.push(['_trackEvent', 'Click', 'CircularNav' , 'closing']);}else{_gaq.push(['_trackEvent', 'Menu', 'CircularNav' , 'opening']);}});
$('.main-menu a').each(function() {
    $(this).click(function(){
		_gaq.push(['_trackEvent', 'Click', 'MainMenuItems' , $(this).text()]);
    });
});
$('.cn-menu-container a').each(function() {
    $(this).click(function(){
		_gaq.push(['_trackEvent', 'Click', 'CircularNavItems' , $(this).attr('href')]);
    });
});
$('.gradient-area .status-row').click(function(){_gaq.push(['_trackEvent', 'Click', 'HomepageHbhLink']);});
$('.status-container , .middle-bar').click(function(){_gaq.push(['_trackEvent', 'Click', 'HomepageBlackBox']);});
$('.whatsapp').click(function(){_gaq.push(['_trackEvent', 'Click', 'Whatsapp']);});

};
$(document).ready(function(){
	trackEvents();
});//EOF: $(document).ready