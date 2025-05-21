import React from "react";
import { FaCode, FaChartBar } from "react-icons/fa";

const modelArchitectureCode = `model = Sequential([
    Dense(128, activation='relu', input_shape=(X.shape[1],)),
    Dropout(0.3),
    Dense(64, activation='relu'),
    Dropout(0.3),
    Dense(26, activation='softmax')  # 26 letters
])

model.compile(optimizer='adam', 
              loss='categorical_crossentropy', 
              metrics=['accuracy'])`;

const Performance = () => {
  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <h1 className="text-4xl font-extrabold text-blue-900 sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
            Performance Metrics & Results
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
            Evaluation of our ASL recognition system on test data.
          </p>
        </div>

        {/* Results Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
            <FaChartBar className="mr-2" /> Results
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <div className="bg-white rounded-lg p-6 shadow">
                <div className="space-y-4">
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-gray-700">
                      Accuracy:
                    </span>
                    <span className="font-bold text-green-600">98.31%</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-gray-700">
                      Precision:
                    </span>
                    <span className="font-bold text-green-600">98.36%</span>
                  </div>
                  <div className="flex justify-between items-center border-b pb-2">
                    <span className="font-semibold text-gray-700">Recall:</span>
                    <span className="font-bold text-green-600">98.31%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-700">
                      F1 Score:
                    </span>
                    <span className="font-bold text-green-600">98.32%</span>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="bg-white rounded-lg p-6 shadow h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold mb-3 text-center">
                  Confusion Matrix
                </h3>
                <div className="flex justify-center">
                  <img
                    src="../../public/images/confusion-matrix.png"
                    alt="Confusion Matrix (ASL A-Z)"
                    className="max-w-full h-auto"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-gray-600">
              The model achieved high accuracy across all 26 ASL alphabet
              letters. Most misclassifications occurred between visually similar
              signs like M / N and R / U.
            </p>
          </div>
        </div>

        {/* Model Architecture Section */}
        <div className="bg-gray-50 rounded-xl p-8 mb-10">
          <h2 className="text-2xl font-bold text-blue-800 mb-4 flex items-center">
            <FaCode className="mr-2" /> Model Architecture
          </h2>
          <p className="text-gray-600 mb-4">
            We implemented a neural network with the following architecture:
          </p>
          <div className="bg-gray-900 text-green-400 p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">{modelArchitectureCode}</pre>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                Key Components
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>
                  Input layer matching the hand landmark features (63 values for
                  21 3D landmarks)
                </li>
                <li>First dense layer with 128 neurons and ReLU activation</li>
                <li>Dropout layer (0.3) for regularization</li>
                <li>Second dense layer with 64 neurons and ReLU activation</li>
                <li>Another dropout layer (0.3)</li>
                <li>
                  Output layer with 26 neurons (A-Z) and softmax activation
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-blue-700 mb-3">
                Training Parameters
              </h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-700">
                <li>Optimizer: Adam</li>
                <li>Loss function: Categorical Cross-Entropy</li>
                <li>Batch size: 32</li>
                <li>Maximum epochs: 50</li>
                <li>Early stopping with patience of 5 epochs</li>
                <li>Validation split: 10%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Performance;
