exports.action = function(data, callback, config, SARAH){

// Recuperation de la config
	config = config.modules.sabnzbd;
	if (!config.url){
		console.log("La variable url n'est pas configurée");
		return callback({'tts' : "La variable adresse n'est pas configurée"})};
	if (!config.apikey){
		console.log("La variable apikey n'est pas configurée");
		return callback({'tts' : "La variable A P I n'est pas configurée"})};


if(data.sabnzbd=='Pause_all'){
  url=config.url+'/sabnzbd/api?mode=pause&apikey='+config.apikey;
  callback({'tts':"J'ai mis les téléchargements en pause."})};
if(data.sabnzbd=='Resume_all'){
  url=config.url+'/sabnzbd/api?mode=resume&apikey='+config.apikey;
  callback({'tts':"J'ai remis les téléchargements."})};
if(data.sabnzbd=='Set_speed'){
  speed=data.speed;
  url=config.url+'/sabnzbd/api?mode=config&name=speedlimit&apikey='+config.apikey+'&value='+speed;
  if(speed==''){
    callback({'tts':"J'ai mis la vitesse des téléchargements à fond"})}
  else{
    callback({'tts':"J'ai mis la vitesse des téléchargements à "+speed+" kilos octets par secondes"})}};

var request = require('request');
	console.log(url);
	request({ 'uri' : url }, function (err, response, body){
		if (err || response.statusCode != 200) {
			callback({'tts': "L'action a échoué"});
			return;
		};
		});
};