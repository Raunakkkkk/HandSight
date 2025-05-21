import React from "react";

const WebcamDisplay = ({
  isRunning,
  videoRef,
  processedImage,
  handDetected,
  prediction,
  confidence,
  signHoldTime,
  TIME_TO_RECORD_SIGN,
  startWebcam,
  stopWebcam,
}) => {
  return (
    <div className="aspect-video bg-gray-200 rounded-lg flex items-center justify-center relative">
      {!isRunning ? (
        <div className="text-center p-4">
          <p className="text-gray-500 mb-4">
            Click the button below to start ASL translation
          </p>
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
            onClick={startWebcam}
          >
            Start Translator
          </button>
        </div>
      ) : (
        <>
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
          {processedImage && (
            <img
              src={processedImage}
              alt="Processed webcam"
              className="absolute top-0 left-0 w-full h-full object-cover"
              style={{ transform: "scaleX(-1)" }}
            />
          )}
        </>
      )}

      {/* Camera controls */}
      {isRunning && (
        <div className="absolute bottom-4 right-4 flex gap-2">
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-3 rounded-md text-sm"
            onClick={stopWebcam}
          >
            Stop
          </button>
        </div>
      )}

      {/* Prediction overlay */}
      {isRunning && (
        <div className="absolute top-0 left-0 p-4 bg-black bg-opacity-50 text-white rounded-br-lg">
          {handDetected ? (
            <>
              <p>Current: {prediction || "None"}</p>
              <p>Confidence: {Math.round(confidence * 100)}%</p>
              <p>
                Hold time: {Math.round(signHoldTime / 1000)}/
                {Math.round(TIME_TO_RECORD_SIGN / 1000)}s
              </p>
            </>
          ) : (
            <p>No hand detected</p>
          )}
        </div>
      )}

      {/* Progress bar for sign recognition */}
      {isRunning && handDetected && signHoldTime > 0 && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300">
          <div
            className="h-full bg-green-500"
            style={{
              width: `${Math.min(
                100,
                (signHoldTime / TIME_TO_RECORD_SIGN) * 100
              )}%`,
            }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default WebcamDisplay;
