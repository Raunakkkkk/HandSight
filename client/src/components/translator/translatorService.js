import axios from "axios";

// Process a single frame and handle image analysis
export const processWebcamFrame = async (frame, context, canvas) => {
  try {
    // Draw the current frame on the canvas
    context.drawImage(frame, 0, 0, canvas.width, canvas.height);

    // Get image data as base64
    const imageData = canvas.toDataURL("image/jpeg", 0.9);

    // Send image to server for processing
    const response = await axios.post("/api/process-frame", {
      image: imageData,
    });

    return {
      prediction: response.data.prediction,
      confidence: response.data.confidence,
      handDetected: response.data.handDetected,
      processedImage: response.data.processed_image
        ? `data:image/jpeg;base64,${response.data.processed_image}`
        : null,
    };
  } catch (error) {
    console.error("Error processing frame:", error);
    throw error;
  }
};

// Utility function to check if video is ready for processing
export const isVideoReady = (video) => {
  return video.readyState === video.HAVE_ENOUGH_DATA;
};

// Calculate time differences and manage sign recognition
export const handleSignRecognition = (
  handDetected,
  currentPrediction,
  lastPrediction,
  signHoldTime,
  deltaTime,
  thresholdTime,
  timeForNewSign,
  currentWord,
  lastSignTime
) => {
  const currentTime = Date.now();
  let newSignHoldTime = signHoldTime;
  let newLastPrediction = lastPrediction;
  let newLastSignTime = lastSignTime;
  let newWord = currentWord;
  let addToSentence = false;

  if (handDetected) {
    if (currentPrediction && currentPrediction !== "") {
      if (currentPrediction === lastPrediction) {
        // Same sign, increase hold time
        newSignHoldTime += deltaTime;

        // If we've held long enough, add to word
        if (newSignHoldTime >= thresholdTime) {
          // Add letter to word only if hand is detected
          newWord += currentPrediction;
          newLastSignTime = currentTime;
          newSignHoldTime = 0;
        }
      } else {
        // Different sign, reset timer
        newSignHoldTime = 0;
        newLastPrediction = currentPrediction;
      }
    }
  } else {
    // No hand detected
    newSignHoldTime = 0;

    // Don't keep last prediction when hand disappears
    newLastPrediction = "";

    // If no hand for a while and we have a word, add to sentence
    if (
      currentWord &&
      currentWord.length > 0 &&
      currentTime - lastSignTime > timeForNewSign
    ) {
      addToSentence = true;
      newWord = "";
    }
  }

  return {
    signHoldTime: newSignHoldTime,
    lastPrediction: newLastPrediction,
    lastSignTime: newLastSignTime,
    currentWord: newWord,
    addToSentence,
  };
};
