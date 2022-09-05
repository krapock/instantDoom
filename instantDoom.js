const instantDoom = {
    combinaisons: ["iddad", "iddqd", "idkfq", "idkfa"],
    lastletters: "",
    audioElement: null,
    face: null,
    godmode: false,
    switchGodmode(options = {}) {
        let opts = {sound: true, ...options};
        this.godmode = !this.godmode
        this.sessionStore('godmode',this.godmode);
        if (this.godmode) {
            console.info("Hurt me plenty !");
            this.face.style.display = 'block'
            if (opts.sound) {
                this.audioElement.play()
            }
            this.toggleFeatures();
        } else {
            this.face.style.display = 'none'
            this.toggleFeatures();
        }
    },
    sessionStore(name, value){
        sessionStorage.setItem('instantDoom-'+name, value);
    },
    sessionRead(name, defaultValue){
        return sessionStorage.getItem('instantDoom-'+name) ?? defaultValue;
    },
    toggleFeatures() {
        const enabled = [...document.getElementsByClassName("feat-toggle-on")];
        const disabled = [...document.getElementsByClassName("feat-toggle-off")];
        for (const element of enabled) {
            element.classList.add('feat-toggle-off');
            element.classList.remove('feat-toggle-on');
        }
        for (const element of disabled) {
            element.classList.add('feat-toggle-on');
            element.classList.remove('feat-toggle-off');
        }
    },
    addMusic(body, baseUrl) {
        const audio = document.createElement("audio")
        audio.innerHTML = `<source src="${baseUrl}instantDoom.wav">`
        body.appendChild(audio)
        return audio
    },
    addFace(body, baseUrl) {
        const img = document.createElement("div")
        img.style.display = 'none'
        img.style.position = 'fixed'
        img.style.right = 0
        img.style.bottom = 0
        img.innerHTML = `<img src="${baseUrl}instantDoom.png" alt="doomguy is a god"/>`
        img.addEventListener('click', () => instantDoom.switchGodmode());
        body.appendChild(img)
        return img
    },
    onKeyDown(e) {
        const typed = "abcdefghijklmnopqrstuvwxyz"[e.keyCode - 65]
        instantDoom.lastletters = (instantDoom.lastletters + typed).slice(-10)

        if (instantDoom.combinaisons.find(combo => instantDoom.lastletters.endsWith(combo))) {
            instantDoom.switchGodmode();
            instantDoom.lastletters = "";
        }
    },
    setup() {
        const baseUrl = [...document.getElementsByTagName('script')]
            .filter(s => s.attributes.src)
            .map(s => s.attributes.src.nodeValue)
            .find(path => path.includes('instantDoom'))
            .replaceAll(/\/[^/]*$/g, "/");
        const body = document.getElementsByTagName("body")[0];

        instantDoom.audioElement = this.addMusic(body, baseUrl);
        instantDoom.face = this.addFace(body, baseUrl);

        if( this.sessionRead('godmode','false')==='true' ){
            this.switchGodmode({sound:false})
        }

        document.onkeydown = this.onKeyDown;
    },
}

instantDoom.setup();
