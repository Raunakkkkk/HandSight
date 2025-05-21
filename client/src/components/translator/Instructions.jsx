import React from "react";

const Instructions = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Instructions:
        </h2>
        <ul className="text-gray-600 space-y-3">
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>
              Position your hand in front of the camera to sign letters
            </span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Hold a sign for 3 seconds to add it to the current word</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Words are automatically added when you pause signing</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Press 'Enter' key or click 'Add Word' to finish a word</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Press 'Space' key to add a space manually</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Press 'Backspace' to delete the last character</span>
          </li>
          <li className="flex items-start">
            <span className="mr-2">•</span>
            <span>Press 'ESC' key to stop the recognition</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Instructions;
