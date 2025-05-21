import os
import base64
from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import mediapipe as mp
import cv2
import pickle as pkl
import numpy as np
import io
from PIL import Image

app = Flask(__name__, static_folder='client/dist')
CORS(app)

# Load model only once when server starts
model_path = os.path.join(os.path.dirname(__file__), 'model.pkl')
with open(model_path, 'rb') as f:
    model = pkl.load(f)

# MediaPipe setup
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
hands = mp_hands.Hands(min_detection_confidence=0.3, min_tracking_confidence=0.3)

@app.route('/api/process-frame', methods=['POST'])
def process_frame():
    # Get the frame data from the request
    data = request.json
    
    # Check if the key for the image data is 'image' or 'imageData'
    if 'image' in data:
        image_data = data['image'].split(',')[1]
    elif 'imageData' in data:
        image_data = data['imageData'].split(',')[1]
    else:
        return jsonify({'error': 'No image data provided'}), 400
    
    try:
        # Decode the base64 image
        nparr = np.frombuffer(base64.b64decode(image_data), np.uint8)
        frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
        
        if frame is None or frame.size == 0:
            return jsonify({
                'error': 'Invalid image data',
                'handDetected': False,
                'prediction': '',
                'confidence': 0
            }), 400
        
        # Process frame
        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        result = hands.process(rgb_frame)
        
        prediction = ""
        confidence = 0
        
        if result.multi_hand_landmarks:
            data = []
            hand_landmarks = result.multi_hand_landmarks[0]
            
            # Draw hand landmarks on the frame
            mp_drawing.draw_landmarks(
                frame, 
                hand_landmarks, 
                mp_hands.HAND_CONNECTIONS,
                mp_drawing.DrawingSpec(color=(0, 0, 255), thickness=2, circle_radius=4),
                mp_drawing.DrawingSpec(color=(0, 255, 0), thickness=2)
            )
            
            # Get wrist as reference point
            wrist_x = hand_landmarks.landmark[0].x
            wrist_y = hand_landmarks.landmark[0].y
            
            # Extract normalized landmarks
            for landmark in hand_landmarks.landmark:
                x = landmark.x
                y = landmark.y
                data.append(x - wrist_x)
                data.append(y - wrist_y)
            
            # Make prediction
            prediction = model.predict([data])[0]
            
            # If model provides probability, get it (assuming it's a classifier that supports predict_proba)
            try:
                proba_result = model.predict_proba([data])[0]
                best_idx = np.argmax(proba_result)
                confidence = float(proba_result[best_idx])
            except:
                confidence = 1.0
        
        # Convert the processed frame back to base64 for sending to frontend
        _, buffer = cv2.imencode('.jpg', frame)
        processed_image = base64.b64encode(buffer).decode('utf-8')
        
        return jsonify({
            'prediction': prediction,
            'confidence': confidence,
            'handDetected': result.multi_hand_landmarks is not None,
            'processed_image': processed_image
        })
    except Exception as e:
        print(f"Error processing frame: {e}")
        return jsonify({
            'error': str(e),
            'handDetected': False,
            'prediction': '',
            'confidence': 0
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'ok',
        'model_loaded': True,
        'opencv_version': cv2.__version__,
        'mediapipe_version': mp.__version__
    })

# Serve React static files in production
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(os.path.join(app.static_folder, path)):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    print("Starting Flask server on http://localhost:5000")
    app.run(debug=True, port=5000) 