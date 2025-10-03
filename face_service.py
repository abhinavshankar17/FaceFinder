from deepface import DeepFace
from flask import Flask, request, jsonify
import os

app = Flask(__name__)

@app.route("/get-embedding", methods=["POST"])
def get_embedding():
    file = request.files['image']
    filepath = os.path.join("temp", file.filename)
    file.save(filepath)

    try:
        embedding = DeepFace.represent(img_path=filepath, enforce_detection=False)[0]["embedding"]
        return jsonify({"embedding": embedding})
    except Exception as e:
        return str(e), 500

if __name__ == "__main__":
    # Make sure the folder for temporary images exists
    if not os.path.exists("temp"):
        os.makedirs("temp")
    
    # Run the Flask server
    app.run(host="127.0.0.1", port=5001, debug=True)
