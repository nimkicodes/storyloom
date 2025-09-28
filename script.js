document.addEventListener("DOMContentLoaded", () => {
    const recordButton = document.getElementById("record-button");
    const statusMessage = document.getElementById("status-message");
    let isRecording = false;
    let mediaRecorder;
    let audioChunks = [];

    recordButton.addEventListener("click", () => {
        console.log("Record button clicked!");
        if (!isRecording) {
            startRecording();
        } else {
            stopRecording();
        }
    });

    async function startRecording() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder = new MediaRecorder(stream);
            mediaRecorder.ondataavailable = event => {
                audioChunks.push(event.data);
            };
            mediaRecorder.onstop = () => {
                const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
                // We will handle the audio blob later
                console.log("Recording stopped, audio blob created.");
                audioChunks = [];
            };
            mediaRecorder.start();
            isRecording = true;
            recordButton.textContent = "Stop Recording";
            statusMessage.textContent = "Recording in progress...";
        } catch (error) {
            console.error("Error accessing microphone:", error);
            statusMessage.textContent = "Could not access microphone. Please check permissions.";
        }
    }

    function stopRecording() {
        mediaRecorder.stop();
        isRecording = false;
        recordButton.textContent = "Record Your Story";
        statusMessage.textContent = "Recording stopped. Processing your story...";
        // Placeholder for API calls
        processStory();
    }

    function processStory() {
        // This is where we will send the audio to the Speech-to-Text API
        // Then send the text to the LLM API
        // And finally use the themes to generate images
        console.log("Processing story...");
        // For now, we just show a placeholder
        setTimeout(() => {
            displayZine();
        }, 2000);
    }

    function displayZine() {
        const zineContainer = document.getElementById("zine-container");
        zineContainer.classList.remove("hidden");
        zineContainer.innerHTML = `<h2>Your Zine</h2><p>This is a placeholder for the generated zine.</p>`;
        statusMessage.textContent = "Your zine is ready!";
    }
});
