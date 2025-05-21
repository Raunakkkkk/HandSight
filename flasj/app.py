from flask import Flask, render_template, Response, jsonify, request
import cv2
import mediapipe as mp
import pickle as pkl
import numpy as np
import base64
import os

app = Flask(__name__)

# Load the model
with open('model.pkl', 'rb') as f:
    model = pkl.load(f)

# MediaPipe setup
mp_hands = mp.solutions.hands
mp_drawing = mp.solutions.drawing_utils
mp_drawing_styles = mp.solutions.drawing_styles
hands = mp_hands.Hands(min_detection_confidence=0.3, min_tracking_confidence=0.3)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/translator')
def translator():
    return render_template('translator.html')

@app.route('/how_it_works')
def how_it_works():
    return render_template('how_it_works.html')

@app.route('/team')
def team():
    return render_template('team.html')

@app.route('/process_frame', methods=['POST'])
def process_frame():
    # Get the frame data from the request
    data = request.json
    image_data = data['image'].split(',')[1]
    
    # Decode the base64 image
    nparr = np.frombuffer(base64.b64decode(image_data), np.uint8)
    frame = cv2.imdecode(nparr, cv2.IMREAD_COLOR)
    
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
        
        # Calculate bounding box
        h, w, c = frame.shape
        x_min, x_max = w, 0
        y_min, y_max = h, 0
        
        # Find the min and max coordinates to create a bounding box
        for landmark in hand_landmarks.landmark:
            x, y = int(landmark.x * w), int(landmark.y * h)
            if x < x_min:
                x_min = x
            if x > x_max:
                x_max = x
            if y < y_min:
                y_min = y
            if y > y_max:
                y_max = y
        
        # Add padding to the bounding box (10% of width/height)
        padding_x = int((x_max - x_min) * 0.1)
        padding_y = int((y_max - y_min) * 0.1)
        
        x_min = max(0, x_min - padding_x)
        y_min = max(0, y_min - padding_y)
        x_max = min(w, x_max + padding_x)
        y_max = min(h, y_max + padding_y)
        
        # Draw rectangle around hand
        cv2.rectangle(frame, (x_min, y_min), (x_max, y_max), (0, 255, 255), 2)
        
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
        'processed_image': processed_image
    })

if __name__ == '__main__':
    app.run(debug=True) 