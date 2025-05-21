# ASL Recognition Project

This project is a web application for American Sign Language (ASL) recognition using a pre-trained machine learning model. The application captures video from a webcam, processes it to detect hand signs, and displays the recognized letters in real-time.

## Project Structure

- **Backend**: Flask server (`app.py`) that runs the Python model for ASL recognition.
- **Frontend**: React application built with Vite and styled with Tailwind CSS.
- **Model**: Pre-trained model file (`model.pkl`) used for ASL recognition.

## Setup Instructions

### Prerequisites

- Python 3.8 or higher
- Node.js and npm

### Backend Setup

1. Create a virtual environment and activate it:

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

2. Install the required Python packages:

   ```bash
   pip install -r requirements.txt
   ```

3. Run the Flask server:
   ```bash
   python app.py
   ```

### Frontend Setup

1. Navigate to the client directory:

   ```bash
   cd client
   ```

2. Install the required npm packages:

   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage

- Open your web browser and go to `http://localhost:5173` to access the application.
- Allow the application to access your webcam.
- Hold your hand in front of the camera to see the recognized ASL letters.

## Additional Information

- The application uses a time-based sign recognition system, requiring you to hold a sign for 3 seconds to register a letter.
- The frontend is modular, with components for the webcam display, text output, and instructions.

## License

This project is licensed under the MIT License.
