document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const video = document.getElementById("video");
  const canvas = document.getElementById("canvas");
  const startBtn = document.getElementById("startBtn");
  const stopBtn = document.getElementById("stopBtn");
  const clearBtn = document.getElementById("clearBtn");
  const currentPrediction = document.getElementById("current-prediction");
  const sentenceDisplay = document.getElementById("sentence");

  // Create a timer display element
  const timerDisplay = document.createElement("div");
  timerDisplay.className = "timer-display";
  document.querySelector(".video-container").appendChild(timerDisplay);

  // Canvas context
  const ctx = canvas.getContext("2d");

  // App state
  let stream = null;
  let isRunning = false;
  let processingInterval = null;
  let sentence = "";
  let prevPrediction = "";
  let currentTimer = 0;
  let timerInterval = null;
  const timerDuration = 3; // 3 seconds timer
  let isTimerRunning = false;

  // Apply entrance animations to the cards
  document.querySelectorAll(".card").forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });

  // Function to add a space to the sentence
  function addSpace() {
    sentence += " ";
    updateSentenceWithAnimation();
  }

  // Update sentence with animation
  function updateSentenceWithAnimation() {
    // Add animation class
    sentenceDisplay.classList.add("fadeInUp");
    sentenceDisplay.textContent = sentence;

    // Remove animation class after animation completes
    setTimeout(() => {
      sentenceDisplay.classList.remove("fadeInUp");
    }, 500);
  }

  // Add space button
  const spaceBtn = document.createElement("button");
  spaceBtn.id = "spaceBtn";
  spaceBtn.className = "btn btn-info";
  spaceBtn.innerHTML = '<i class="fas fa-space-bar"></i> Add Space';
  spaceBtn.addEventListener("click", addSpace);
  spaceBtn.disabled = true;

  // Insert after the clear button
  const buttonContainer = document.querySelector(".card-body .mt-3");
  buttonContainer.appendChild(spaceBtn);

  // Setup webcam access
  async function startWebcam() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
        audio: false,
      });

      video.srcObject = stream;
      isRunning = true;

      // Update button states
      startBtn.disabled = true;
      stopBtn.disabled = false;
      spaceBtn.disabled = false;

      // Set canvas size
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 480;

      // Show the canvas and hide the video
      canvas.style.display = "block";
      video.style.display = "none";

      // Start processing frames
      processingInterval = setInterval(processFrame, 100); // Process every 100ms
    } catch (error) {
      console.error("Error accessing webcam:", error);
      alert(
        "Unable to access webcam. Please ensure you have granted camera permissions."
      );
    }
  }

  // Stop webcam
  function stopWebcam() {
    if (stream) {
      const tracks = stream.getTracks();
      tracks.forEach((track) => track.stop());
      isRunning = false;

      // Update button states
      startBtn.disabled = false;
      stopBtn.disabled = true;
      spaceBtn.disabled = true;

      // Clear processing interval
      clearInterval(processingInterval);

      // Clear timer if running
      if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
        isTimerRunning = false;
        timerDisplay.style.display = "none";
      }

      // Clear current prediction
      currentPrediction.textContent = "";

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Hide canvas
      canvas.style.display = "none";
      video.style.display = "block";
    }
  }

  // Start a timer
  function startTimer(prediction) {
    // If timer is already running, don't start a new one
    if (isTimerRunning) return;

    isTimerRunning = true;
    currentTimer = timerDuration;
    timerDisplay.textContent = `Adding "${prediction}" in: ${currentTimer}s`;
    timerDisplay.style.display = "block";

    // Add a pulse animation to the prediction display
    currentPrediction.classList.add("pulse");

    timerInterval = setInterval(() => {
      currentTimer--;
      timerDisplay.textContent = `Adding "${prediction}" in: ${currentTimer}s`;

      if (currentTimer <= 0) {
        clearInterval(timerInterval);

        // Only add if the prediction is still the same
        if (prediction === prevPrediction) {
          sentence += prediction;
          updateSentenceWithAnimation();
        }

        isTimerRunning = false;
        timerDisplay.style.display = "none";
        currentPrediction.classList.remove("pulse");
      }
    }, 1000);
  }

  // Process a frame from the video
  function processFrame() {
    if (!isRunning) return;

    // Draw the video frame to the canvas
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image data as base64
    const imageData = canvas.toDataURL("image/jpeg");

    // Send the frame to the server
    fetch("/process_frame", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        image: imageData,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // Display the processed image with hand landmarks
        if (data.processed_image) {
          const img = new Image();
          img.onload = function () {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          };
          img.src = "data:image/jpeg;base64," + data.processed_image;
        }

        // Update the prediction display
        if (data.prediction) {
          if (currentPrediction.textContent !== data.prediction) {
            // Remove old animation class
            currentPrediction.classList.remove("fadeInUp");

            // Trigger reflow to restart animation
            void currentPrediction.offsetWidth;

            // Add animation class and update text
            currentPrediction.classList.add("fadeInUp");
            currentPrediction.textContent = data.prediction;
          } else {
            currentPrediction.textContent = data.prediction;
          }

          // Check if prediction is consistent
          if (data.prediction === prevPrediction) {
            // If prediction is stable and timer is not running, start timer
            if (!isTimerRunning) {
              startTimer(data.prediction);
            }
          } else {
            // If prediction changed, reset timer
            if (timerInterval) {
              clearInterval(timerInterval);
              isTimerRunning = false;
              timerDisplay.style.display = "none";
              currentPrediction.classList.remove("pulse");
            }
            prevPrediction = data.prediction;
          }
        } else {
          currentPrediction.textContent = "No hand detected";

          // If no hand detected, reset timer
          if (timerInterval) {
            clearInterval(timerInterval);
            isTimerRunning = false;
            timerDisplay.style.display = "none";
            currentPrediction.classList.remove("pulse");
          }
        }
      })
      .catch((error) => {
        console.error("Error processing frame:", error);
      });
  }

  // Clear the sentence
  function clearSentence() {
    sentence = "";
    sentenceDisplay.textContent = "";

    // Add a fade effect when clearing
    sentenceDisplay.classList.add("fadeIn");
    setTimeout(() => {
      sentenceDisplay.classList.remove("fadeIn");
    }, 500);
  }

  // Event listeners
  startBtn.addEventListener("click", startWebcam);
  stopBtn.addEventListener("click", stopWebcam);
  clearBtn.addEventListener("click", clearSentence);

  // Add some animation to buttons on hover
  document.querySelectorAll(".btn").forEach((btn) => {
    btn.addEventListener("mouseenter", () => {
      btn.classList.add("animate__animated", "animate__pulse");
    });

    btn.addEventListener("mouseleave", () => {
      btn.classList.remove("animate__animated", "animate__pulse");
    });
  });

  // Handle keyboard shortcuts
  document.addEventListener("keydown", function (event) {
    // Space key to add space to the sentence
    if (event.keyCode === 32 && isRunning) {
      addSpace();
      event.preventDefault(); // Prevent scrolling
    }

    // Backspace to remove the last character
    if (event.keyCode === 8 && isRunning) {
      sentence = sentence.slice(0, -1);
      updateSentenceWithAnimation();
      event.preventDefault(); // Prevent browser back navigation
    }
  });

  // Clean up resources when the page is unloaded
  window.addEventListener("beforeunload", function () {
    stopWebcam();
  });
});
