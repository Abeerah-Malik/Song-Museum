//timeline image
var timeline;

//fonts
var musicnet;
var gunplay;
var technology;


//songs
var songcassette;
var songcd;
var songipod;
var songyoutube;
var songspotify;


//buttons
var btncassette;
var btncd;
var btnipod;
var btnyoutube;
var btnspotify;
//button to play automatically
var btnplayauto;
//button to play manually
var btnplaymanual;

//variables to play songs automatically
var playauto = false;
var currentsongstart = 0;
var songorder = [];

//manual variable
var manualInteraction = false;

// background color
var bg;

// Description 
var descriptionTxt;

// Title 
var headerTxt;

// Info about currentl playing song
var currentlyPlayingTxt;


function preload() {

	//preload all the song snippets
	songcassette = loadSound('thriller.mp3');
	songcd = loadSound('heart.mp3');
	songipod = loadSound('umberella.mp3');
	songyoutube = loadSound('uptown.mp3');
	songspotify = loadSound('lights.mp3');

	//preload all the fonts
	musicnet = loadFont('musicnet.ttf');
	gunplay = loadFont('gunplay.otf');
	technology = loadFont('technology.ttf');

	//add timeline image
	timeline = loadImage('timeline.png');

}

function setup() {
	//create canvas
	cnv = createCanvas(600, 550);


	//create slider for volume
	slider = createSlider(0, 1, 0.5, 0.01);
	slider.position(10, height - 30);


	// HTML image buttons
	//Cassette button
	btncassette = new imageButton("cassette.png", 150, 150);
	btncassette.position(-20, height / 2 - 40); // Set x and y position of the button
	btncassette.mousePressed(cassetteBtnPressed); // play song
	btncassette.mouseReleased(cassetteBtnReleased); // stop song

	//CD button
	btncd = new imageButton("cd.png", 100, 100);
	btncd.position(130, height / 2 - 10);
	btncd.mousePressed(cdBtnPressed);
	btncd.mouseReleased(cdBtnReleased);

	//Ipod button
	btnipod = new imageButton("ipod.png", 100, 100);
	btnipod.position(250, height / 2);
	btnipod.mousePressed(ipodBtnPressed);
	btnipod.mouseReleased(ipodBtnReleased);

	//Youtube button
	btnyoutube = new imageButton("youtube.png", 100, 100);
	btnyoutube.position(370, height / 2 - 20);
	btnyoutube.mousePressed(youtubeBtnPressed);
	btnyoutube.mouseReleased(youtubeBtnReleased);

	//Spotify button
	btnspotify = new imageButton("spotify.png", 90, 90);
	btnspotify.position(485, height / 2 - 5);
	btnspotify.mousePressed(spotifyBtnPressed);
	btnspotify.mouseReleased(spotifyBtnReleased);


	//button to play automatically
	btnplayauto = createButton('Play Automatically');
	btnplayauto.position(430, height - 35);
	btnplayauto.mousePressed(playSongsauto);

	//button to play manually
	btnplaymanual = createButton('Play Manually');
	btnplaymanual.position(430, height - 60); // Positioned next to the Play All button
	btnplaymanual.mousePressed(playsongsmanual);



	// Title and description text
	bg = "#E5E2DC"
	headerTxt = "Playback";
	descriptionTxt = "Click the various listening devices to play a song that defined each era!";

	// Currently playing track information 
	currentlyPlayingTxt = "...";

	//set a song order for play automatically 
	songorder = [songcassette, songcd, songipod, songyoutube, songspotify];


	//background color
	background(bg);



}

function draw() {
	// Set the background color
	background(bg);

	//updates the volume of all songs based on slider created
	var volume = slider.value();
	songcassette.setVolume(volume);
	songcd.setVolume(volume);
	songipod.setVolume(volume);
	songyoutube.setVolume(volume);
	songspotify.setVolume(volume);


	noStroke();
	// Header 
	textAlign(CENTER);
	textSize(60);
	textFont(musicnet);
	textLeading(22);
	fill('#000');
	text(headerTxt, 300, 65);

	// Description 
	textAlign(LEFT);
	textSize(16);
	textFont(gunplay);
	textLeading(24);
	fill('#000');
	text(descriptionTxt, 20, 95, width - 50);

	//timeline image
	image(timeline, 8, -20);


	//currently playing info
	if (songcassette.isPlaying() == true) {
		currentlyPlayingTxt = 'Thriller by Michael Jackson';
	} else if (songcd.isPlaying() == true) {
		currentlyPlayingTxt = 'My Heart will Go on by Celine Dion';
	} else if (songipod.isPlaying() == true) {
		currentlyPlayingTxt = 'Umberella by Rihanna';
	} else if (songyoutube.isPlaying() == true) {
		currentlyPlayingTxt = 'Uptown Funk by Bruno Mars';
	} else if (songspotify.isPlaying() == true) {
		currentlyPlayingTxt = 'Blinding Lights by The Weeknd';
	} else {
		currentlyPlayingTxt = '..'; //when nothing is playing
	}


	// Currently playing text settings
	textAlign(CENTER);
	textSize(30);
	textFont(technology);
	fill('#dd1c1a');
	text(currentlyPlayingTxt, 20, height - 80, width - 50);
}


//functions for play automatically
// Play all songs one by one
function playSongsauto() {
  manualInteraction = false;
	playauto = true;
	currentsongstart = 0;
	playNextsong();
}

// Play the next song in the list
function playNextsong() {
		if (manualInteraction == true) {
		playAll = false;
		currentSongIndex = 0;
		return;
	}
	else if (currentsongstart < songorder.length) {
		var currentSong = songorder[currentsongstart];
		currentSong.play();
		currentSong.onended(playNextsong); //callback to play the next song
		currentsongstart++;
	} else {
		//reset after all have been played in order
		playauto = false;
		currentsongstart = 0;
	}
}

function playsongsmanual() {
	manualInteraction = true;
	stopallsongs();
	
}


function stopallsongs() {
	playauto = false;
	for(var i = 0; i < songorder.length; i = i + 1){
		songorder[i].stop();
	}

}


//cassette
function cassetteBtnPressed() {
	songcassette.play(); // Play song
}

function cassetteBtnReleased() {
	songcassette.stop(); // stop song
}


//CD
function cdBtnPressed() {
	songcd.play();
}

function cdBtnReleased() {
	songcd.stop();
}


//Ipod
function ipodBtnPressed() {

	songipod.play();
}

function ipodBtnReleased() {
	songipod.stop();
}


//Youtube
function youtubeBtnPressed() {
	songyoutube.play();
}

function youtubeBtnReleased() {
	songyoutube.stop();
}


//Spotify
function spotifyBtnPressed() {
	songspotify.play();
}

function spotifyBtnReleased() {
	songspotify.stop();
}


