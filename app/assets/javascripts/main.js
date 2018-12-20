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
                    const term = document.querySelector("#word_term").value
                    const english_form = document.querySelector("#word_english_form").value
                    const arabic_form = document.querySelector("#word_arabic_form").value
                    const example = document.querySelector("#word_example").value
                    const collection_id = document.querySelector("#word_collection_id").value
                    const image = document.querySelector("#word_image").files[0]


                    formData.append("word[audio]", audioBlob); // Adding params
                    formData.append("word[term]", term); // Adding params
                    formData.append("word[english_form]", english_form); // Adding params
                    formData.append("word[arabic_form]", arabic_form); // Adding params
                    formData.append("word[example]", example); // Adding params
                    formData.append("word[image]", image); // Adding params
                    formData.append("word[collection_id]", collection_id); // Adding params


                    //   formData.append("audio_summary[google_id]", window.location.pathname.replace("/books/", "")
                    //   );
                    // Send a POST request to /audio_summaries - done √
                    // That will run audio_summaries#create - done √
                    // It will receive two parameters (google_id and audio) - done √
                    // It will add them both into the database
                    //   The audio will be uploaded automatically to Cloudinary (because of the uploader)
                    //   Cloudinary will give you back a URL that you can use to play the audio
                    fetch("/words", {
                        method: "POST",
                        headers: {
                            //   "Content-Type": "multipart/form-data",
                            Accept: "application/json"
                        },
                        body: formData
                    }).then(res => res.json()).then(function (data) {
                        location.href = `/words/${data.id}`
                    })
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