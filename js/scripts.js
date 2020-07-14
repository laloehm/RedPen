$('.owl-carousel').owlCarousel({
    loop: true,
    margin: 10,
    nav: true,
    responsive: {
        0: {
            items: 1
        },
        600: {
            items: 2
        },
        1000: {
            items: 3
        }
    }
})

var holding = false;
var track = document.getElementById('track');
var progress = document.getElementById('progress');
var play = document.getElementById('play');
var next = document.getElementById('next');
var prev = document.getElementById('prev');
var title = document.getElementById('title');
var artist = document.getElementById('artist');
var art = document.getElementById('art');
var current_track = 0;
var song, audio, duration;
var playing = false;
var songs = [{
        title: 'Audio-1',
        artist: 'RedPen',
        url: '../Audios/Audio-1.mp3',
        art: '../Audios/Img-music.jpg'
    },

    {
        title: 'Audio-2',
        artist: 'RedPen',
        url: '../Audios/Audio-2.mp3',
        art: '../Audios/Img-music.jpg'
    },

    {
        title: 'Audio-3',
        artist: 'RedPen',
        url: '../Audios/Audio-3.mp3',
        art: '../Audios/Img-music.jpg'
    },
    {
        title: 'Audio-4',
        artist: 'RedPen',
        url: '../Audios/Audio-4.mp3',
        art: '../Audios/Img-music.jpg'
    },
    {
        title: 'Audio-5',
        artist: 'RedPen',
        url: '../Audios/Audio-5.mp3',
        art: '../Audios/Img-music.jpg'
    },
    {
        title: 'Audio-6',
        artist: 'RedPen',
        url: '../Audios/Audio-6.mp3',
        art: '../Audios/Img-music.jpg'
    },
    {
        title: 'Audio-7',
        artist: 'RedPen',
        url: '../Audios/Audio-7.mp3',
        art: '../Audios/Img-music.jpg'
    },
    {
        title: 'Audio-8',
        artist: 'RedPen',
        url: '../Audios/Audio-8.mp3',
        art: '../Audios/Img-music.jpg'
    },
    {
        title: 'Audio-9',
        artist: 'RedPen',
        url: '../Audios/Audio-9.mp3',
        art: '../Audios/Img-music.jpg'
    },
    {
        title: 'Audio-10',
        artist: 'RedPen',
        url: '../Audios/Audio-10.mp3',
        art: '../Audios/Img-music.jpg'
    }

];

window.addEventListener('load', init(), false);

function init() {
    song = songs[current_track];
    audio = new Audio();
    audio.src = song.url;
    title.textContent = song.title;
    artist.textContent = song.artist;
    art.src = song.art;
}


audio.addEventListener('timeupdate', updateTrack, false);
audio.addEventListener('loadedmetadata', function () {
    duration = this.duration;
}, false);
window.onmousemove = function (e) {
    e.preventDefault();
    if (holding) seekTrack(e);
}
window.onmouseup = function (e) {
    holding = false;
    console.log(holding);
}
track.onmousedown = function (e) {
    holding = true;
    seekTrack(e);
    console.log(holding);
}
play.onclick = function () {
    playing ? audio.pause() : audio.play();
}
audio.addEventListener("pause", function () {
    play.innerHTML = '<img class="pad" src="http://abarcarodriguez.com/lab/play.png" />';
    playing = false;
}, false);

audio.addEventListener("playing", function () {
    play.innerHTML = '<img src="http://abarcarodriguez.com/lab/pause.png" />';
    playing = true;
}, false);
next.addEventListener("click", nextTrack, false);
prev.addEventListener("click", prevTrack, false);


function updateTrack() {
    curtime = audio.currentTime;
    percent = Math.round((curtime * 100) / duration);
    progress.style.width = percent + '%';
    handler.style.left = percent + '%';
}

function seekTrack(e) {
    event = e || window.event;
    var x = e.pageX - player.offsetLeft - track.offsetLeft;
    percent = Math.round((x * 100) / track.offsetWidth);
    if (percent > 100) percent = 100;
    if (percent < 0) percent = 0;
    progress.style.width = percent + '%';
    handler.style.left = percent + '%';
    audio.play();
    audio.currentTime = (percent * duration) / 100
}

function nextTrack() {
    current_track++;
    current_track = current_track % (songs.length);
    song = songs[current_track];
    audio.src = song.url;
    audio.onloadeddata = function () {
        updateInfo();
    }
}

function prevTrack() {
    current_track--;
    current_track = (current_track == -1 ? (songs.length - 1) : current_track);
    song = songs[current_track];
    audio.src = song.url;
    audio.onloadeddata = function () {
        updateInfo();
    }
}

function updateInfo() {
    title.textContent = song.title;
    artist.textContent = song.artist;
    art.src = song.art;
    art.onload = function () {
        audio.play();
    }
}