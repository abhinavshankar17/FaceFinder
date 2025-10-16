<
# 🧠 FaceFinder — AI-Based Face Recognition System

![FaceFinder Banner](https://github.com/abhinavshankar17/FaceFinder/assets/banner.png)

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-000000?style=for-the-badge&logo=ejs&logoColor=white)

---

### 🔍 Overview

**FaceFinder** is an AI-powered face recognition demo designed to identify and match users based on facial embeddings.  
It enables finding possible Instagram profiles (or other identities) from an uploaded photo — with **user consent first**.  
The system uses **DeepFace (FaceNet)** to extract embeddings, compares them using **cosine similarity**, and stores results securely in **MongoDB**.

---



[![YouTube](https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg)](https://www.youtube.com/shorts/DOv_VhFuTZs)


## 🚀 Features

- 🧬 **AI Face Matching:** Detects and compares facial features using DeepFace embeddings.
- 🙋‍♂️ **User Registration:** Upload 1–3 selfies with your Instagram handle to register your identity.
- 🖼️ **Smart Image Preview:** Real-time preview of uploaded images before submission.
- 💾 **Face Embedding Storage:** Saves numeric face vectors in MongoDB for efficient search.
- 🔒 **Privacy & Consent:** Identification works **only with user opt-in**; no scraping or third-party data.
- 🌐 **Responsive Interface:** Built with Bootstrap and EJS for a clean, mobile-friendly user experience.

---

## 🧰 Tech Stack

**Frontend:**  
- HTML  
- CSS  
- JavaScript  
- EJS  
- Bootstrap  

**Backend:**  
- Node.js  
- Express.js  

**AI / ML Layer:**  
- Python (Flask microservice)  
- DeepFace (FaceNet-style CNN embeddings)  

**Database:**  
- MongoDB  

---

## ⚙️ How It Works

1. **User Registration:**  
   - User enters Instagram handle and uploads 1–3 selfies.  
   - Each image is sent to a Python Flask service for embedding extraction via DeepFace.  
   - The generated embeddings are stored in MongoDB under the user’s profile.

2. **Search & Matching:**  
   - A new uploaded image is converted to an embedding.  
   - Cosine similarity is computed against all stored user embeddings.  
   - The most similar profile (if any) is displayed with a similarity score.

3. **Architecture Summary:**
   - **Frontend:** EJS + Bootstrap for clean upload and preview UI.  
   - **Backend:** Node.js/Express handles uploads and DB interaction.  
   - **AI Layer:** Flask microservice returns embeddings via API.  
   - **Storage:** MongoDB stores user data and embedding arrays.

---

## 🧠 Learning Highlights

- Integrated a **Node.js + Python hybrid system** using Axios and Flask.  
- Understood **facial embeddings** and how they enable vector-based similarity search.  
- Implemented **Multer** for local uploads and dynamic preview rendering.  
- Explored **privacy-first design** principles in AI-driven applications.  

---

## 🧩 Folder Structure

```
FaceFinder/
│
├── app.js                 # Main Express server
├── models/
│   └── User.js            # Mongoose schema for users
├── utils/
│   └── cosineSimilarity.js # Helper function for similarity calculation
├── views/
│   ├── index.ejs          # Search page
│   └── register.ejs       # User registration page
├── uploads/               # Temporary image uploads
├── public/                # Static files (CSS, images)
└── flask_app.py           # Python microservice for DeepFace embeddings
```

---

## 🛠️ Installation & Setup

### Prerequisites
- Node.js and npm
- Python 3.x
- MongoDB (local or Atlas)
- pip packages: `flask`, `deepface`

### Steps

1. **Clone the repo**
   ```bash
   git clone https://github.com/yourusername/FaceFinder.git
   cd FaceFinder
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start MongoDB**
   ```bash
   mongod
   ```

4. **Run the Flask microservice**
   ```bash
   python flask_app.py
   ```

5. **Run the Node.js server**
   ```bash
   node app.js
   ```

6. **Visit the app**
   ```
   http://localhost:3000
   ```

---

## ⚖️ Ethics & Safety

This project is intended **solely for educational and research purposes**.  
Real-world face search systems can pose serious **privacy, consent, and misuse risks**.  
FaceFinder ensures:
- Only **opt-in users** are discoverable.  
- Images are **stored temporarily** and deleted post-processing.  
- Embeddings can be hashed or anonymized for ethical deployment.

---

## 📅 Future Improvements

- Fine-tune face detection models for better robustness.  
- Add confidence thresholds for “possible matches.”  
- Introduce a consent dashboard and audit logs.  
- Enable on-device embedding extraction to reduce data exposure.

---

## 💡 Author

**Abhinav Shankar**  
B.Tech CSE (w/s IT) • SRM Institute of Science and Technology  
📍 Chennai, India  

🔗 [LinkedIn](https://www.linkedin.com/in/abhinav-shankar-0885b1208/)  
🔗 [GitHub](https://github.com/abhinavshankar17)

---

