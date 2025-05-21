import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero section with image */}
        <div className="lg:flex lg:items-center lg:justify-between">
          <div className="lg:w-1/2">
            <div className="text-left">
              <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
                Breaking Communication Barriers
              </h1>
              <p className="mt-5 max-w-xl text-xl text-gray-500">
                HandSight is a real-time American Sign Language (ASL) translator
                that bridges the gap between gestures and text, making
                communication more inclusive and accessible for everyone.
              </p>
              <div className="mt-8">
                <Link
                  to="/translator"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Get Started →
                </Link>
              </div>
            </div>
          </div>
          <div className="mt-10 lg:mt-0 lg:w-1/2">
            <img
              src="/images/1.png"
              alt="ASL Hand Signs"
              className="w-full object-contain rounded-lg"
            />
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">Translator</h3>
              <p className="mt-2 text-sm text-gray-500">
                Use our real-time ASL translator to convert signs to text
              </p>
              <div className="mt-4">
                <Link
                  to="/translator"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Start Translating
                </Link>
              </div>
            </div>
          </div>

          <div className="bg-white overflow-hidden shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg font-medium text-gray-900">
                How It Works
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Learn about the technology behind our ASL recognition system
              </p>
              <div className="mt-4">
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
                >
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              About HandSight
            </h2>
            <p className="text-gray-600">
              HandSight uses computer vision and machine learning to recognize
              American Sign Language (ASL) gestures in real-time. The system
              captures hand movements through your webcam and translates them
              into text, making communication more accessible.
            </p>
            <p className="mt-4 text-gray-600">
              Our model is trained to recognize hand shapes and gestures
              corresponding to ASL letters, and can operate in real-time
              directly in your browser.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
