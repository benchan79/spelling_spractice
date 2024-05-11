// Array to store audio elements
const audios = [];
let currentAudio = null;

// Function to create and return an audio element
function createAudio(src) {
    const audio = new Audio(src);
    audio.addEventListener('ended', () => {
        // Reset currentAudio when audio playback ends
        currentAudio = null;
    });
    return audio;
}

// Function to play or stop audio
function toggleAudio(audio) {
    if (audio !== currentAudio) {
        // If a new audio is clicked, stop the currently playing audio
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0; // Reset the audio to the beginning
        }
        currentAudio = audio;
        audio.play();
    } else {
        // If the clicked audio button corresponds to the currently playing audio, stop it
        audio.pause();
        audio.currentTime = 0; // Reset the audio to the beginning
        currentAudio = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Selecting all audio buttons
    const audioButtons = document.querySelectorAll('.audioButton');

    // Creating audio elements and storing them in the array
    audioButtons.forEach(button => {
        const audioSrc = button.getAttribute('data-src');
        const audio = createAudio(audioSrc);
        audios.push(audio);

        // Adding click event listener to each button
        button.addEventListener('click', () => toggleAudio(audio));
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const wordForm = document.getElementById("wordForm");

    wordForm.addEventListener("submit", function(event) {
        event.preventDefault();
        const wordInput = document.getElementById("wordInput").value.trim();
        if (wordInput !== "") {
            addWordToList(wordInput);
            document.getElementById("wordInput").value = "";
            // Add code here to convert word to audio using text-to-speech
            // For demonstration, let's assume the word is added with a dummy audio source
            const newButton = createAudioButton("data/dummy.mp3", wordInput);
            const newListDiv = document.getElementById("newWordsList");
            newListDiv.appendChild(newButton);
        }
    });

    function addWordToList(word) {
        let newListDiv = document.getElementById("newWordsList");
        if (!newListDiv) {
            newListDiv = document.createElement("div");
            newListDiv.id = "newWordsList";
            newListDiv.classList.add("spelling-list");
            newListDiv.innerHTML = "<h2>New Words</h2>";
            document.getElementById("spelling-lists").appendChild(newListDiv);
        }
    }

    function createAudioButton(audioSrc, word) {
        const button = document.createElement("button");
        button.classList.add("audioButton");
        button.dataset.src = audioSrc;
        button.textContent = word;
        button.style.display = "block";
        button.style.margin = "10px auto";
        button.style.padding = "10px 10px";
        button.style.backgroundColor = "#007bff";
        button.style.color = "#fff";
        button.style.border = "none";
        button.style.borderRadius = "5px";
        button.style.cursor = "pointer";
        button.style.transition = "background-color 0.3s";
        button.addEventListener("mouseover", function() {
            button.style.backgroundColor = "#0056b3";
        });
        button.addEventListener("mouseout", function() {
            button.style.backgroundColor = "#007bff";
        });
        return button;
    }
});