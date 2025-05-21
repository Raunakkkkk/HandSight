import { useState, useRef, useCallback } from "react";

const useWebcam = () => {
  const [isRunning, setIsRunning] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const processingRef = useRef(false);
  const requestRef = useRef(null);
  const lastFrameTimeRef = useRef(0);

  // Start webcam
  const startWebcam = useCallback(async () => {
    try {
      setIsRunning(true);

      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width: 640, height: 480 },
      });

      streamRef.current = stream;

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        return true;
      }
      return false;
    } catch (error) {
      console.error("Error accessing webcam:", error);
      setIsRunning(false);
      return false;
    }
  }, []);

  // Stop webcam
  const stopWebcam = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }

    setIsRunning(false);
  }, []);

  // Calculate frame delta time
  const getFrameDeltaTime = useCallback((timestamp) => {
    let deltaTime = 0;
    if (lastFrameTimeRef.current) {
      deltaTime = timestamp - lastFrameTimeRef.current;
      // Limit delta time to avoid huge jumps if tab was inactive
      if (deltaTime > 100) deltaTime = 100;
    }
    lastFrameTimeRef.current = timestamp;
    return deltaTime;
  }, []);

  // Clean up on unmount
  const cleanup = useCallback(() => {
    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  }, []);

  return {
    isRunning,
    setIsRunning,
    videoRef,
    canvasRef,
    requestRef,
    processingRef,
    lastFrameTimeRef,
    startWebcam,
    stopWebcam,
    getFrameDeltaTime,
    cleanup,
  };
};

export default useWebcam;
