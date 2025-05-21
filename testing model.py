import mediapipe as mp
import cv2
import pickle as pkl

with open('model.pkl', 'rb') as f:
    model = pkl.load(f)

cap = cv2.VideoCapture(0)
mp_hands = mp.solutions.hands
handed_img = mp_hands.Hands(min_detection_confidence=0.3, min_tracking_confidence=0.3)

sentence = ""
prev_pred = ""
frame_count = 0
frame_threshold = 50  # After how many consistent frames to add a letter

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break
        
    rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
    result = handed_img.process(rgb_frame)
    
    if result.multi_hand_landmarks:
        data = []
        hand_landmarks = result.multi_hand_landmarks[0]
        mp.solutions.drawing_utils.draw_landmarks(frame, hand_landmarks, mp_hands.HAND_CONNECTIONS)
        wrist_x = hand_landmarks.landmark[0].x
        wrist_y = hand_landmarks.landmark[0].y
        
        for landmark in hand_landmarks.landmark:
            x = landmark.x
            y = landmark.y
            data.append(x - wrist_x)
            data.append(y - wrist_y)
        
        prediction = model.predict([data])[0]

        if prediction == prev_pred:
            frame_count += 1
        else:
            frame_count = 0  # Reset if prediction changes

        if frame_count == frame_threshold:
            sentence += prediction
            frame_count = 0  # Reset after adding a letter

        prev_pred = prediction

        cv2.putText(frame, str(prediction), (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 2)

    cv2.putText(frame, sentence, (10, 70), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0), 2)
    cv2.imshow('Sign Language Translator', frame)
    
    key = cv2.waitKey(1) & 0xFF
    if key == ord('q'):
        break
    elif key == ord(' '):  # Space
        sentence += ' '
    elif key == 8:  # Backspace key
        sentence = sentence[:-1]  # Remove last character

cap.release()
cv2.destroyAllWindows()
