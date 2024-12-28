import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import listingRouter from "./routes/listing.route.js";
import path from "path";
import cors from 'cors';
import Listing from "./models/listing.model.js";
import User from "./models/user.model.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"

dotenv.config();


mongoose
  .connect(process.env.MONGO, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error: " + err);
  });

const __dirname = path.resolve();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin:["https://real-estate-arova.onrender.com"],
  methods:["POST","GET","PATCH","PUT","DELETE"],
  credentials:true
}));



app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);
// app.use("/api/listing", listingRouter);
app.get("/api/listings", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.status(200).json(listings);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch listings" });
  }
});

// Endpoint to fetch a single listing by its ID
app.get("/listing/:id", async (req, res) => {
  const { id } = req.params;

  try {
    // Find the listing by its ID
    const listing = await Listing.findById(id);

    // If listing not found, return 404 error
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    // Return the found listing
    return res.json(listing);
  } catch (err) {
    console.error(err);
    // Handle other errors (e.g., invalid ID format)
    return res.status(500).json({ message: "Error fetching the listing" });
  }
});

// Endpoint to fetch 3 random listings
app.get("/random-listings", async (req, res) => {
  try {
    // Use MongoDB aggregate to get 3 random listings
    const listings = await Listing.aggregate([{ $sample: { size: 3 } }]);

    return res.json(listings);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Error fetching listings" });
  }
});



// Register Route
app.post('/api/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    // Send a success response
    res.status(201).json({
      message: 'User registered successfully',
      userId: newUser._id,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Login Route
app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET, // Make sure to set your JWT_SECRET in your environment variables
      { expiresIn: '1h' } // Token expiration time
    );

    // Send the response with the token
    res.status(200).json({
      message: 'Login successful',
      token,
      userId: user._id,
      username: user.username,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

app.use(express.static(path.join(__dirname, "/client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});
