var songs = ['barcelona.mp3', 'divide.mp3', 'supermarket.mp3','nancy.mp3', 'anyway.mp3'];

var songTitle = $('#songTitle');
var songSlider = $('#songSlider');
var volumeSlider = $('#volumeSlider');
var dur = $('#duration');
var cTime = $('#cTime');
var nextSong = $('#nextSong');

var song = new Audio();
var currentSong = 2;

//function to load the song
$(document).ready(function(){
	loadSong();
});


//function to load the song for playing
function loadSong()
{
	song.src = 'music/'+songs[currentSong];
	songTitle.html((currentSong + 1)+ ' . '+ songs[currentSong]);
	nextSong.html('Next song :'+ songs[(currentSong + 1) % songs.length]);
	song.playbackRate = 1;
	song.volume = volumeSlider.val();
	setTimeout(setDuration(), 1000);
	song.play();
}


setInterval(updateSongSlider, 1000);

//function to update song slider
function updateSongSlider()
{
	var currentTime = Math.round(song.currentTime);
	songSlider.val(currentTime);
	cTime.html(convertTime(currentTime));
	if (song.ended) {
		next();
	}
}

//this function adjusts volume according to the volume slider
function adjustVolume()
{
	song.volume = volumeSlider.val();
	$('#mute').hide();
	$('#voice').show();
}

//function to seek song by progress bar
function seekSong()
{
	song.currentTime = songSlider.val();
	cTime.html(convertTime(song.currentTime));
}


//function to convert time in seconds to normal time with minutes and seconds
function convertTime(secs)
{
	var min = Math.floor(secs/60);
	var sec = secs % 60;
	min = (min < 10) ? "0" + min : min;
	sec = (sec < 10) ? "0" + sec : sec;
	return (min +' : '+sec);
}

function setDuration()
{
	song.addEventListener('loadedmetadata', function() {
		var d = Math.floor(song.duration);
		songSlider.attr('max', d);
		dur.html(convertTime(d));
	});
}

function playPause()
{
	if (song.paused) 
	{
		song.play();
		$('#play').hide();
		$('#pause').show();
	}else{
		song.pause();
		$('#pause').hide();
		$('#play').show();
	}
}

//function to play the next song
function next()
{
	currentSong = (currentSong + 1) % songs.length;
	song.currentTime = 0;
	songSlider.val(0);
	loadSong();
}

//function to play revious song
function previous()
{
	currentSong --;
	currentSong = (currentSong < 0) ? songs.length - 1 : currentSong;
	song.currentTime = 0;
	songSlider.val(0);
	loadSong();
}

function mute()
{
	song.volume = 0;
	$('#voice').hide();
	$('#mute').show();
}

function unmute()
{
	song.volume = 0.5;
	$('#mute').hide();
	$('#voice').show();
}

function increasePlayback()
{
	song.playbackRate += 0.5;
}

function decreasePlayback()
{
	song.playbackRate -= 0.5;
}