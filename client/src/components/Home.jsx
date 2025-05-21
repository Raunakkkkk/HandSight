import React from "react";
import { Link } from "react-router-dom";
import { FaLanguage, FaInfoCircle, FaChartBar } from "react-icons/fa";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 pt-24">
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
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition duration-300 transform hover:scale-105"
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
              className="w-full object-contain rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Feature cards */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Discover HandSight
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Translator Card */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl transition duration-300 hover:shadow-xl hover:transform hover:scale-105">
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 text-blue-600 mb-6">
                  <FaLanguage className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Translator
                </h3>
                <p className="mb-6 text-gray-600">
                  Use our real-time ASL translator to convert signs to text
                  instantly
                </p>
                <Link
                  to="/translator"
                  className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition duration-300"
                >
                  Start Translating
                </Link>
              </div>
            </div>

            {/* How It Works Card */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl transition duration-300 hover:shadow-xl hover:transform hover:scale-105">
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 text-indigo-600 mb-6">
                  <FaInfoCircle className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  How It Works
                </h3>
                <p className="mb-6 text-gray-600">
                  Learn about the technology behind our ASL recognition system
                </p>
                <Link
                  to="/how-it-works"
                  className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 transition duration-300"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Results Card */}
            <div className="bg-white overflow-hidden shadow-lg rounded-xl transition duration-300 hover:shadow-xl hover:transform hover:scale-105">
              <div className="p-8 text-center">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100 text-green-600 mb-6">
                  <FaChartBar className="h-8 w-8" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  Results
                </h3>
                <p className="mb-6 text-gray-600">
                  Explore our model's performance and accuracy metrics
                </p>
                <Link
                  to="/performance"
                  className="inline-flex items-center justify-center w-full px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 transition duration-300"
                >
                  View Results
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
