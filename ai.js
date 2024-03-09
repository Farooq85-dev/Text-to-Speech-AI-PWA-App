let speech = new SpeechSynthesisUtterance;
let voices = [];
let selectVoices = document.getElementById("select");
let isSpeak = true
let st = speechSynthesis;

window.speechSynthesis.onvoiceschanged = () => {
    voices = window.speechSynthesis.getVoices();
    // console.log("Voices:", voices); // Debugging: Log voices array
    for (let voice of voices) {
        // console.log(voice);
        // Default voice
        let selectedVoice = voice.name === "Microsoft David - English (United States)" ? "selected" : "";
        let options = `<option value="${voice.name}" ${selectedVoice}>${voice.name} (${voice.lang})</option>`
        selectVoices.innerHTML += options;
    }
}

play.addEventListener('click', () => {
    // console.log("Button clicked"); // Debugging: Log button click
    speech.text = document.getElementById("text").value;
    window.speechSynthesis.cancel(speech);
    window.speechSynthesis.speak(speech);
    // console.log("Selected voice:", selectVoices.value); // Debugging: Log selected voice
    for (let voice of voices) {
        if (voice.name === selectVoices.value) {
            speech.voice = voice;
        }
    }
    if (isSpeak) {
        st.resume();
        isSpeak = false;
        play.innerText = "Pause";
        playIcon.src = "images/pause-solid.svg"
    } else {
        st.pause();
        isSpeak = true;
        play.innerText = "Resume";
        playIcon.src = "images/play-solid.svg"
    }
});

// Theme Toggler Js
const checkbox = document.getElementById("checkbox")
checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark")
})

//Registered Service Worker
if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
        navigator.serviceWorker
            .register("/serviceWorker.js")
            .then(res => console.log("service worker registered"))
            .catch(err => console.log("service worker not registered", err))
    })
    navigator.serviceWorker.ready.then((swReg) => {
        var options = {
            message: "This is message body.",
            icon: "/images/icons/icon-512x512.png",
        }
        swReg.showNotification("This is message title.", options);
    })
}

