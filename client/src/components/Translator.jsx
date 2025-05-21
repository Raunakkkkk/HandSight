import React, { useState, useRef, useEffect } from "react";
import WebcamDisplay from "./translator/WebcamDisplay";
import TextOutput from "./translator/TextOutput";
import Instructions from "./translator/Instructions";
import ASLReferenceCard from "./translator/ASLReferenceCard";
import useWebcam from "./translator/useWebcam";
import {
  processWebcamFrame,
  isVideoReady,
} from "./translator/translatorService";

const Translator = () => {
  // State related to predictions and text
  const [prediction, setPrediction] = useState("");
  const [confidence, setConfidence] = useState(0);
  const [sentence, setSentence] = useState("");
  const [signHoldTime, setSignHoldTime] = useState(0);
  const [handDetected, setHandDetected] = useState(false);
  const [processedImage, setProcessedImage] = useState("");
  const [currentWord, setCurrentWord] = useState("");
  const [backspaceActive, setBackspaceActive] = useState(false);

  // Use refs for timer state to ensure it's up-to-date in animation frames
  const signHoldTimeRef = useRef(0);
  const lastPredictionRef = useRef("");
  const lastSignTimeRef = useRef(0);
  const lastAddedTimeRef = useRef(0);

  // Use our webcam hook
  const {
    isRunning,
    videoRef,
    canvasRef,
    requestRef,
    processingRef,
    startWebcam: initWebcam,
    stopWebcam: stopWebcamBase,
    getFrameDeltaTime,
    cleanup,
  } = useWebcam();

  // Time thresholds in milliseconds
  const TIME_TO_RECORD_SIGN = 3000; // 3 seconds to record a sign
  const TIME_FOR_NEW_SIGN = 1000; // 1 second pause to separate signs

  // Start webcam and initialize processing
  const startWebcam = async () => {
    const success = await initWebcam();

    if (success) {
      // Reset timers
      signHoldTimeRef.current = 0;
      lastPredictionRef.current = "";
      lastSignTimeRef.current = 0;
      lastAddedTimeRef.current = 0;

      // Start processing frames
      requestRef.current = requestAnimationFrame(processFrame);
    }
  };

  // Stop webcam and reset state
  const stopWebcam = () => {
    stopWebcamBase();

    // Reset state
    setPrediction("");
    setConfidence(0);
    setHandDetected(false);
    setProcessedImage("");
    setSignHoldTime(0);

    // Reset refs
    signHoldTimeRef.current = 0;
    lastPredictionRef.current = "";
    lastSignTimeRef.current = 0;
    lastAddedTimeRef.current = 0;
  };

  // Process a single frame
  const processFrame = async (timestamp) => {
    if (!videoRef.current || !canvasRef.current || processingRef.current) {
      requestRef.current = requestAnimationFrame(processFrame);
      return;
    }

    processingRef.current = true;

    // Calculate time difference between frames
    const deltaTime = getFrameDeltaTime(timestamp);

    try {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext("2d");

      // Make sure video is ready
      if (!isVideoReady(video)) {
        processingRef.current = false;
        requestRef.current = requestAnimationFrame(processFrame);
        return;
      }

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Process the frame
      const result = await processWebcamFrame(video, context, canvas);
      const currentTime = Date.now();

      // Update state with the prediction
      const currentPrediction = result.handDetected ? result.prediction : "";
      setPrediction(currentPrediction);
      setConfidence(result.handDetected ? result.confidence : 0);
      setHandDetected(result.handDetected);
      setProcessedImage(result.processedImage || "");

      // SIMPLIFIED SIGN RECOGNITION LOGIC
      if (result.handDetected && currentPrediction) {
        // If we're showing the same prediction as before, increase hold time
        if (currentPrediction === lastPredictionRef.current) {
          signHoldTimeRef.current += deltaTime;
          setSignHoldTime(signHoldTimeRef.current);

          // If we've held the sign long enough, add the letter to the word
          if (signHoldTimeRef.current >= TIME_TO_RECORD_SIGN) {
            setCurrentWord((prev) => prev + currentPrediction);
            lastSignTimeRef.current = currentTime;
            lastAddedTimeRef.current = currentTime;

            // After adding a letter, reset the hold time
            signHoldTimeRef.current = 0;
            setSignHoldTime(0);
          }
        } else {
          // New prediction, reset the timer and update the last prediction
          signHoldTimeRef.current = 0;
          setSignHoldTime(0);
          lastPredictionRef.current = currentPrediction;
        }
      } else {
        // No hand detected, reset timer
        signHoldTimeRef.current = 0;
        setSignHoldTime(0);
        lastPredictionRef.current = "";

        // If no hand for a while and we have a word, add it to the sentence
        if (
          currentWord &&
          currentWord.length > 0 &&
          currentTime - lastSignTimeRef.current > TIME_FOR_NEW_SIGN
        ) {
          setSentence(
            (prev) =>
              prev + (prev && !prev.endsWith(" ") ? " " : "") + currentWord
          );
          setCurrentWord("");
        }
      }
    } catch (error) {
      console.error("Error processing frame:", error);
    }

    processingRef.current = false;
    requestRef.current = requestAnimationFrame(processFrame);
  };

  // Handle keypress events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isRunning) return;

      if (e.key === " ") {
        // Space - add space to sentence
        setSentence((prev) => prev + " ");
        setCurrentWord("");
      } else if (e.key === "Backspace") {
        // Backspace - use the same handler as the button
        handleBackspace();
      } else if (e.key === "Escape") {
        // Escape - stop webcam
        stopWebcam();
      } else if (e.key === "Enter") {
        // Enter - commit current word to sentence
        commitWord();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isRunning, currentWord]);

  // Clean up on unmount
  useEffect(() => {
    return cleanup;
  }, [cleanup]);

  // Reset sentence
  const clearSentence = () => {
    setSentence("");
    setCurrentWord("");
  };

  // Add word to sentence
  const commitWord = () => {
    if (currentWord) {
      setSentence(
        (prev) => prev + (prev && !prev.endsWith(" ") ? " " : "") + currentWord
      );
      setCurrentWord("");
    }
  };

  // Handle backspace functionality
  const handleBackspace = () => {
    if (currentWord.length > 0) {
      // First remove from current word if it exists
      setCurrentWord((prev) => prev.slice(0, -1));
    } else if (sentence.length > 0) {
      // Then remove from the sentence
      setSentence((prev) => prev.slice(0, -1));
    }

    // Add visual feedback when backspace is pressed
    setBackspaceActive(true);
    setTimeout(() => {
      setBackspaceActive(false);
    }, 200);
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-blue-800 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            ASL Translator
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Use your webcam to translate American Sign Language in real-time
          </p>
        </div>

        {/* Two-column layout on larger screens, stack on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Webcam Card */}
          <div className="bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="p-4 bg-gray-50 border-b">
              <h2 className="text-xl font-semibold text-gray-800">
                ASL Recognition
              </h2>
            </div>
            <div className="p-6">
              <div className="max-w-xl mx-auto">
                <WebcamDisplay
                  isRunning={isRunning}
                  videoRef={videoRef}
                  processedImage={processedImage}
                  handDetected={handDetected}
                  prediction={prediction}
                  confidence={confidence}
                  signHoldTime={signHoldTime}
                  TIME_TO_RECORD_SIGN={TIME_TO_RECORD_SIGN}
                  startWebcam={startWebcam}
                  stopWebcam={stopWebcam}
                />
              </div>

              <TextOutput
                sentence={sentence}
                currentWord={currentWord}
                backspaceActive={backspaceActive}
                handleBackspace={handleBackspace}
                commitWord={commitWord}
                clearSentence={clearSentence}
              />
            </div>
          </div>

          {/* ASL Reference Card */}
          <ASLReferenceCard />
        </div>

        <Instructions />
      </div>

      {/* Hidden canvas for processing */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default Translator;
