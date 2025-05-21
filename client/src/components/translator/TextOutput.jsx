import React from "react";

const TextOutput = ({
  sentence,
  currentWord,
  backspaceActive,
  handleBackspace,
  commitWord,
  clearSentence,
}) => {
  return (
    <div className="mt-8">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold text-gray-800">
          Recognized Text:
        </h2>
        <div className="flex gap-2">
          <button
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-1 px-3 rounded-md text-sm"
            onClick={commitWord}
          >
            Add Word
          </button>
          <button
            className={`${
              backspaceActive
                ? "bg-yellow-800"
                : "bg-yellow-600 hover:bg-yellow-700"
            } text-white font-medium py-1 px-3 rounded-md text-sm transition-colors`}
            onClick={handleBackspace}
          >
            Backspace
          </button>
          <button
            className="bg-gray-600 hover:bg-gray-700 text-white font-medium py-1 px-3 rounded-md text-sm"
            onClick={clearSentence}
          >
            Clear Text
          </button>
        </div>
      </div>
      <div className="p-4 bg-gray-100 rounded-lg min-h-16 border border-gray-300">
        <p className="text-xl">
          {sentence}
          {currentWord && <span className="text-blue-600"> {currentWord}</span>}
          <span className="border-r-2 border-black animate-pulse ml-1">
            &nbsp;
          </span>
        </p>
      </div>
    </div>
  );
};

export default TextOutput;
