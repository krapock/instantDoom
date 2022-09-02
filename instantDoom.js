var instantDoom = {
 combinaisons:["iddad", "iddqd", "idkfq", "idkfa"],
 lastletters:"",
 audioElement:null,
 face:null,
 godmode:false,
 switchGodmode(){
 	this.godmode = !this.godmode
 	if(this.godmode){
	 	console.log("Hurt me plenty !");
		this.face.style.display='block'
		this.audioElement.play();
	}else{
		this.face.style.display='none'
	}
 }
}

function setup(e){
  const body = document.getElementsByTagName("body")[0];
  const audio = document.createElement("audio")
  audio.innerHTML='<source src="instantDoom.wav">'
  body.appendChild(audio)
  instantDoom.audioElement = audio
  
  addFace()
}

function addFace(){
  const body = document.getElementsByTagName("body")[0];
  const img = document.createElement("div")
  img.style.display='none'
  img.style.position='fixed'
  img.style.right=0
  img.style.bottom=0
  img.innerHTML='<img src="instantDoom.png"/>'
  img.addEventListener('click',e=>instantDoom.switchGodmode() );
  body.appendChild(img)
  instantDoom.face = img
}

document.onkeydown = function(e) {
    var typed = "abcdefghijklmnopqrstuvwxyz"[e.keyCode-65]
    instantDoom.lastletters = (instantDoom.lastletters+typed).slice(-10)
    
    if( instantDoom.combinaisons.find( combo => instantDoom.lastletters.endsWith(combo) ) ){
      instantDoom.switchGodmode();
    }
}



setup();
