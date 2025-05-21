# ASL Recognition Web App

This project uses a Python model for ASL (American Sign Language) recognition with a React frontend.

## Project Structure

- `server/`: Express.js backend that runs the Python model
- `client/`: React Vite frontend with Tailwind CSS
- `testing model.py`: Python script for ASL recognition
- `model.pkl`: Trained machine learning model for ASL recognition

## Setup

### Python Environment Setup

1. Create a virtual environment:

   ```
   python -m venv venv
   ```

2. Activate the virtual environment:

   - On Windows:
     ```
     .\venv\Scripts\Activate.ps1
     ```
   - On macOS/Linux:
     ```
     source venv/bin/activate
     ```

3. Install Python dependencies:
   ```
   pip install -r requirements.txt
   ```

### Server Setup

1. Navigate to the server directory:

   ```
   cd server
   ```

2. Install server dependencies:

   ```
   npm install
   ```

3. Start the server:
   ```
   npm run dev
   ```

### Client Setup

1. Navigate to the client directory:

   ```
   cd client
   ```

2. Install client dependencies:

   ```
   npm install
   ```

3. Start the React development server:
   ```
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:5173`
2. Click the "Start ASL Recognition" button
3. A separate window will open with your webcam feed
4. Position your hand in the frame to see ASL recognition in action

### Controls in the Recognition Window:

- Press 'q' to quit
- Press 'space' to add a space to the sentence
- Press 'backspace' to delete the last character
