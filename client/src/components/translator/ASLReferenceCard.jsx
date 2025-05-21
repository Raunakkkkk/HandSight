import React from "react";

const ASLReferenceCard = () => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 border-b">
        <h2 className="text-xl font-semibold text-gray-800">
          ASL Alphabet Reference
        </h2>
      </div>

      <div className="p-4">
        <img
          src="/images/asl_alphabet_digits.png"
          alt="ASL Alphabet and Numbers"
          className="w-full rounded-lg"
        />

        <div className="mt-4 text-gray-600 text-sm">
          <p>
            Use this reference chart to practice your ASL signs. Hold each sign
            steady in front of the camera for 3 seconds to record it.
          </p>
          <p className="mt-2">
            Signs for letters A-Z and numbers 0-9 are shown above.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ASLReferenceCard;
