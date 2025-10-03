const express = require("express");
const path = require("path");
const app = express();

// Set EJS as view engine
app.set("view engine", "ejs");

// Serve static files (CSS, JS, images)
app.use(express.static(path.join(__dirname, "public")));

// Middleware to parse form data (for text fields)
app.use(express.urlencoded({ extended: true }));

// Homepage → search page
app.get("/", (req, res) => {
  res.render("index", { result: null, searched: false });
});

// Register page
app.get("/register", (req, res) => {
  res.render("register"); 
});
// checking if this works
// (Later) POST /register will handle saving user data
// app.post("/register", uploadMiddleware, async (req, res) => { ... });
//lets check again
// ========================
// Start Server
// ========================
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
