import React from "react";
import {
  FaHandPaper,
  FaCode,
  FaBrain,
  FaClock,
  FaDatabase,
  FaLayerGroup,
  FaNetworkWired,
} from "react-icons/fa";
import {
  SiMediapipe,
  SiOpencv,
  SiTensorflow,
  SiPython,
  SiFlask,
  SiReact,
} from "react-icons/si";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-white  pt-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            The Technology Behind Sign Language Recognition
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Our sign language translator uses advanced machine learning and
            computer vision techniques to recognize hand gestures and convert
            them to text in real-time.
          </p>
        </div>

        <div className="space-y-20">
          {/* Recognition Process Section (all points inside one card) */}
          <div className="bg-gray-50 rounded-xl p-8">
            <div className="mb-10">
              <h2 className="text-3xl font-bold text-blue-800 mb-2">
                The Recognition Process
              </h2>
              <p className="text-xl text-gray-600">
                How we analyze and interpret hand gestures in real-time
              </p>
            </div>
            {/* Hand Detection */}
            <div className="mb-12 flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">👋</span>
                1. Hand Detection
              </h3>
              <p className="text-lg text-gray-600 mb-4 text-center">
                Using MediaPipe's hand tracking library, we detect and track the
                position of hands in each video frame. The system creates a
                detailed map of 21 landmarks representing the key points in a
                human hand.
              </p>
              <p className="text-lg text-gray-600 text-center">
                These landmarks provide precise positioning of the fingers,
                joints, and palm, allowing our system to accurately interpret
                hand shapes for ASL recognition.
              </p>
              <div className="w-full flex justify-center mt-6">
                <div className="rounded-lg overflow-hidden shadow-lg max-w-md w-full">
                  <img
                    src="/images/hand_landmarks.png"
                    alt="Hand landmarks detection showing 21 key points"
                    className="w-full h-auto object-cover"
                  />
                  <div className="bg-blue-50 p-3 text-center text-gray-600">
                    21 landmarks tracked on the hand for ASL recognition
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Extraction */}
            <div className="mb-12 flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">🔍</span>
                2. Feature Extraction
              </h3>
              <p className="text-lg text-gray-600 text-center">
                Once hand landmarks are detected, we extract the 3D coordinates
                (x, y, z) of each landmark point. These coordinates are used as
                features for our machine learning model. For training, we
                applied augmentation techniques such as rotation and translation
                to improve model robustness.
              </p>
            </div>

            {/* Machine Learning Classification */}
            <div className="mb-12 flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">🧠</span>
                3. Machine Learning Classification
              </h3>
              <p className="text-lg text-gray-600 text-center">
                The hand landmark data is fed into a neural network model
                trained on the ASL alphabet dataset. The model consists of fully
                connected layers with dropout for regularization and was trained
                using the Adam optimizer. The neural network predicts which
                letter (A-Z) the hand gesture most likely represents.
              </p>
            </div>

            {/* Temporal Filtering */}
            <div className="flex flex-col items-center">
              <h3 className="text-2xl font-semibold text-blue-800 mb-6 flex items-center">
                <span className="text-3xl mr-3">⏱️</span>
                4. Temporal Filtering
              </h3>
              <p className="text-lg text-gray-600 text-center">
                To prevent accidental inputs, our system requires a consistent
                sign to be held for multiple frames before adding it to the
                sentence. This helps filter out transitional movements between
                signs.
              </p>
            </div>
          </div>

          {/* Technologies Used Section */}
          <div className="bg-white overflow-hidden">
            <div className="pb-4 border-b border-gray-200 mb-8">
              <h2 className="text-3xl font-bold text-blue-800">
                Technologies Used
              </h2>
              <p className="mt-2 text-xl text-gray-600">
                The tools and frameworks powering our application
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
                  <SiMediapipe className="mr-3 text-blue-600" size={28} />
                  MediaPipe
                </h3>
                <p className="text-lg text-gray-600">
                  Google's open-source framework for building multimodal applied
                  ML pipelines. We use its hand tracking solution for accurate
                  hand landmark detection.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
                  <SiOpencv className="mr-3 text-blue-600" size={28} />
                  OpenCV
                </h3>
                <p className="text-lg text-gray-600">
                  Computer vision library used for image processing, drawing
                  landmarks, and handling video feeds. Also used for data
                  augmentation during model training.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
                  <SiTensorflow className="mr-3 text-blue-600" size={28} />
                  TensorFlow
                </h3>
                <p className="text-lg text-gray-600">
                  Machine learning framework used for building and training the
                  neural network model for ASL letter classification.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
                  <SiPython className="mr-3 text-blue-600" size={28} />
                  Python
                </h3>
                <p className="text-lg text-gray-600">
                  The backend processing language that handles the computer
                  vision and ML tasks.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
                  <SiFlask className="mr-3 text-blue-600" size={28} />
                  Flask
                </h3>
                <p className="text-lg text-gray-600">
                  Lightweight web framework that powers our API endpoints and
                  serves the application.
                </p>
              </div>

              <div className="bg-gray-50 rounded-xl p-8">
                <h3 className="text-2xl font-semibold text-blue-800 mb-4 flex items-center">
                  <SiReact className="mr-3 text-blue-600" size={28} />
                  React
                </h3>
                <p className="text-lg text-gray-600">
                  Frontend library used to build an interactive and responsive
                  user interface.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
