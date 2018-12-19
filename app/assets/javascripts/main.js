const recordAudio = () =>
    new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];
        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });
        const start = () => mediaRecorder.start();
        const stop = () =>
            new Promise(resolve => {
                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks); // Creates a file
                    const audioUrl = URL.createObjectURL(audioBlob); // A url for the file
                    const formData = new FormData(); // Start of setting up params
                    formData.append("audio_summary[audio]", audioBlob); // Adding params
                    //   formData.append("audio_summary[google_id]", window.location.pathname.replace("/books/", "")
                    //   );
                    // Send a POST request to /audio_summaries - done √
                    // That will run audio_summaries#create - done √
                    // It will receive two parameters (google_id and audio) - done √
                    // It will add them both into the database
                    //   The audio will be uploaded automatically to Cloudinary (because of the uploader)
                    //   Cloudinary will give you back a URL that you can use to play the audio
                    fetch("/audio_summaries", {
                        method: "POST",
                        headers: {
                            //   "Content-Type": "multipart/form-data",
                            Accept: "application/json"
                        },
                        body: formData
                    });
                    const audio = new Audio(audioUrl);
                    const play = () => audio.play();
                    resolve({ audioBlob, audioUrl, play });
                });
                mediaRecorder.stop();
            });
        resolve({ start, stop });
    });
let recorder = null;
let audio = null;
const recordStop = async () => {
    if (recorder) {
        audio = await recorder.stop();
        recorder = null;
        document.querySelector("#record-stop-button").textContent = "Record";
        document.querySelector("#play-audio-button").removeAttribute("disabled");
    } else {
        recorder = await recordAudio();
        recorder.start();
        document.querySelector("#record-stop-button").textContent = "Stop";
    }
};
const playAudio = () => {
    if (audio && typeof audio.play === "function") {
        audio.play();
    }
};
function sendWaveToPost(blob) {
    alert("in");
    var data = new FormData();
    data.append("audio", blob, new Date().getTime() + ".wav");
    var oReq = new XMLHttpRequest();
    oReq.open("POST", "/audio/save_file");
    oReq.send(data);
    oReq.onload = function (oEvent) {
        if (oReq.status == 200) {
            console.log("Uploaded");
        } else {
            console.log("Error " + oReq.status + " occurred uploading your file.");
        }
    };
}