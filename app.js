const express = require("express");
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const axios = require("axios");
const mongoose = require("mongoose");
const User = require("./models/User");
const { cosineSimilarity } = require("./utils/cosineSimilarity");
const FormData = require("form-data");
const app = express();

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/facefinder", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));

// Multer config for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// ========================
// Routes
// ========================

// Homepage → Search page
app.get("/", (req, res) => {
  res.render("index", { result: null, searched: false });
});

// Register page → GET
app.get("/register", (req, res) => {
  res.render("register");
});

// Register page → POST
app.post("/register", upload.array("faces", 3), async (req, res) => {
  try {
    const { username } = req.body;
    const files = req.files;

    // Collect embeddings from Python DeepFace service
    const embeddings = [];
    for (let file of files) {
      const formData = new FormData();
      formData.append("image", fs.createReadStream(file.path));

      const response = await axios.post("http://localhost:5001/get-embedding", formData, {
        headers: formData.getHeaders(),
      });

      embeddings.push(response.data.embedding);
      fs.unlinkSync(file.path); // delete temp file
    }

    // Save in MongoDB
    let user = await User.findOne({ username });
    if (!user) {
      user = new User({ username, embeddings: [] });
    }
    user.embeddings.push(...embeddings);
    await user.save();

    res.send(`<h3>✅ Registered Successfully: ${username}</h3><a href="/">Back to Search</a>`);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error registering user");
  }
});

// Search → POST (image upload + find best match)
app.post("/upload", upload.array("faces", 3), async (req, res) => {
  try {
    const files = req.files;

    // Take first image for simplicity
    const file = files[0];
    const formData = new FormData();
    formData.append("image", fs.createReadStream(file.path));

    const response = await axios.post("http://localhost:5001/get-embedding", formData, {
      headers: formData.getHeaders(),
    });
    const queryEmbedding = response.data.embedding;
    fs.unlinkSync(file.path);

    // Compare with all users
    const users = await User.find();
    let bestMatch = null;
    let bestScore = -1;

    users.forEach((user) => {
      user.embeddings.forEach((embedding) => {
        const score = cosineSimilarity(queryEmbedding, embedding);
        if (score > bestScore) {
          bestScore = score;
          bestMatch = user.username;
        }
      });
    });

    if (bestMatch) {
      res.render("index", { result: { username: bestMatch, score: bestScore }, searched: true });
    } else {
      res.render("index", { result: null, searched: true });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error searching user");
  }
});

// ========================
// Start Server
// ========================
const PORT = 3000;
app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
