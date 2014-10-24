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
  phrase="C'est en pause."};
if(data.sabnzbd=='Resume_all'){
  url=config.url+'/sabnzbd/api?mode=resume&apikey='+config.apikey;
  phrase="C'est remis"};
if(data.sabnzbd=='Set_speed'){
  speed=data.speed;
  url=config.url+'/sabnzbd/api?mode=config&name=speedlimit&apikey='+config.apikey+'&value='+speed;
  if(speed==''){
    phrase="C'est fait"}
  else{
    phrase="OK. "+speed+" kilos octets par secondes"}};
if(data.sabnzbd=='Version'){
  url=config.url+'/sabnzbd/api?mode=version&output=json&apikey='+config.apikey;
  phrase="La version de sabe N Z B D est "};
if(data.sabnzbd=='Queue'){
  url=config.url+'/sabnzbd/api?mode=queue&start=START&limit=LIMIT&output=json&apikey='+config.apikey;
  phrase=""};
  
var request = require('request');
	console.log(url);
	request({ 'uri' : url }, function (err, response, body){
		if (err || response.statusCode != 200) {
			callback({'tts': "L'action a échoué"});
			return;
		};
	if (data.sabnzbd=='Version') {		
		versionarray  = JSON.parse(body).version.split(".");
		version="";
		for (var i = 0; i < versionarray.length-1; i++) {
		version+=versionarray[i]+ " point ";}
		version+=versionarray[versionarray.length-1];
		phrase+=version;
		};
	if (data.sabnzbd=='Queue') {
		queue  = JSON.parse(body).queue.slots;
		nbelement = queue.length;
		if (nbelement==0) {
			if (data.detail=="yes") {
				phrase="Il n'y en a pas"}
			else {
			phrase="Non. Aucun."}}
		else {
			if (data.detail=="yes") {
			for (var i = 0; i<nbelement;i++){
			fichier=queue[i].filename;
			taille=queue[i].mb.replace("."," virgule ");
			restant=queue[i].sizeleft.replace("."," virgule ");
			status=queue[i].status;
			if (status=="Queued") {
			status="En attente"}
			else if (status=="Downloading"){
			status="En cours"}
			phrase+="En "+(i+1)+". "+fichier+". Status : "+status+". Taille restante : "+restant+". "}}
			else {
				phrase="Oui. "+nbelement +" élément"}
		}}
	console.log(phrase);
	callback({'tts': phrase});
		});
	
	
};