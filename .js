console.log("Welcome to spotify");

let songIndex=0;
let audioElement= new Audio("song/1.mp3");
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songs = [
    {
        songName: "Aaya Re Toofan",
        filepath: "song/1.mp3",
        coverPath: "images/ayare.jpg"
    },
    {
        songName: "Gori Hai Kalaiyan",
        filepath: "song/2.mp3",
        coverPath: "images/gorihai.jpg"
    },
    {
        songName: "Ladki Deewani",
        filepath: "song/3.mp3",
        coverPath: "images/ladki.jpg"
    },
    {
        songName: "Nasha - Raid 2",
        filepath: "song/4.mp3",
        coverPath: "images/nasha.jpg"
    }
];

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})
//audioElement.play()

//Handle Play/pause click
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;

    }
})
//Listen to Event
audioElement.addEventListener('timeupdate',()=>{

    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value *audioElement.duration/100;
})
const makeAllPlays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');

    })
}
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src= songs[songIndex].filepath;
        masterSongName.innerText = songs[songIndex].songName;

        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        document.querySelector('.songinfo').innerText=songs[songIndex].songName;
        gif.style.opacity=1;
    });
});

document.getElementById('next').addEventListener('click',()=>{

    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src= songs[songIndex].filepath;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

});
document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src= songs[songIndex].filepath;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

});


