console.log("Welcome to Spotify");
//initialize the variables
let songIndex=0;
let audioElement=new Audio('1.mp3');
let masterPlay=document.getElementById('masterPlay');
let myProgressBar=document.getElementById('myProgressBar');
let gif=document.getElementById('gif');
let masterSongName=document.getElementById("masterSongName");
let songItems=Array.from(document.getElementsByClassName("songItem"));
let songs=[
    {songName:"ncs-1", filePath:"1.mp3", coverPath:"1.jpg"},
    {songName:"ncs-2", filePath:"2.mp3", coverPath:"2.jpg"},
    {songName:"ncs-3", filePath:"3.mp3", coverPath:"3.jpg"},
    {songName:"ncs-4", filePath:"4.mp3", coverPath:"4.jpg"},
    {songName:"ncs-5", filePath:"5.mp3", coverPath:"5.jpg"},
    {songName:"ncs-6", filePath:"6.mp3", coverPath:"6.jpg"},
    {songName:"ncs-7", filePath:"7.mp3", coverPath:"7.jpg"},
    {songName:"ncs-8", filePath:"8.mp3", coverPath:"8.jpg"},
    {songName:"ncs-9", filePath:"9.mp3", coverPath:"9.jpg"},
    {songName:"ncs-10", filePath:"10.mp3", coverPath:"10.jpg"}
    
]
songItems.forEach((element,i)=>{
    
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
})
// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        gif.style.opacity=0;    
    }
})

//Listen to Events
audioElement.addEventListener('timeupdate', function(){
    //Update seekbar
    let progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value=progress;
})
myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value * audioElement.duration/100;
}
)
const makeAllPlays=() =>{
    
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element, index) => {
    element.addEventListener('click', (e) => {
        makeAllPlays();
        songIndex=parseInt(e.target.id)
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');

        masterSongName.innerText=songs[songIndex-1].songName;
        audioElement.src = `${songs[index].filePath}`; 
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        element.classList.remove('fa-play');
        element.classList.add('fa-pause');
    });
});

document.getElementById("next").addEventListener('click', () => {
    if (songIndex < songs.length - 1) {
        songIndex += 1;
    } else {
        songIndex = 0;
    }
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});

document.getElementById("previous").addEventListener('click', () => {
    if (songIndex > 0) {
        songIndex -= 1;
    } else {
        songIndex = songs.length - 1;
    }
    masterSongName.innerText=songs[songIndex].songName;
    audioElement.src = songs[songIndex].filePath;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity=1;
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
});
