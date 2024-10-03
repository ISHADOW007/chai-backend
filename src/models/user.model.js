// Import necessary modules
import mongoose, { Schema } from "mongoose";  // Mongoose for MongoDB interactions and schema creation
import jwt from "jsonwebtoken";              // JWT for generating tokens
import bcrypt from "bcrypt";                 // Bcrypt for hashing passwords

// Define the User schema for MongoDB
const userSchema = new Schema(
  {
    // User's unique username
    username: {
      type: String,
      required: true,
      unique: true,       // Ensure username is unique in the collection
      lowercase: true,    // Convert the value to lowercase
      index: true,        // Index this field for faster search
      trim: true,         // Trim any surrounding white spaces
    },
    // User's unique email
    email: {
      type: String,
      required: true,
      unique: true,       // Ensure email is unique in the collection
      lowercase: true,    // Convert the value to lowercase
      trim: true,         // Trim any surrounding white spaces
    },
    // User's full name
    fullName: {
      type: String,
      required: true,      // Full name is mandatory
      index: true,         // Indexed for search purposes
      trim: true,          // Trim any surrounding white spaces
    },
    // URL to user's avatar image
    avatar: {
      type: String,
      required: true,      // Avatar is required
    },
    // URL to user's cover image
    coverImage: {
      type: String,
      required: true,      // Cover image is required
      lowercase: true,     // Ensure the URL is in lowercase
      trim: true,          // Trim any surrounding white spaces
    },
    // Array of watched video references
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",      // Reference to the Video collection
      },
    ],
    // User's password, which will be hashed before saving
    password: {
      type: String,
      required: [true, "Password is required"], // Password is mandatory with a custom error message
    },
    // Refresh token for the user
    refreshToken: {
      type: String,        // Store refresh token in the user document
    },
  },
  {
    timestamps: true,       // Automatically add createdAt and updatedAt timestamps
  }
);

// Pre-save middleware to hash the password before saving the user document
userSchema.pre("save", async function (next) {
  // If password is not modified, move to the next middleware
  if (!this.isModified("password")) {
    return next();
  }
  
  // Hash the password using bcrypt with 10 salt rounds
  this.password = await bcrypt.hash(this.password, 10);
  next(); // Proceed with the save operation
});

// Method to compare entered password with hashed password in the database
userSchema.methods.isPasswordCorrect = async function (password) {
  // Compare plain password with the stored hashed password
  return await bcrypt.compare(password, this.password);
};

// Method to generate Access Token for the user
userSchema.methods.generateAccessToken = function () {
  // JWT payload containing user info
  const token = jwt.sign(
    {
      _id: this._id,          // Include user's ID
      email: this.email,      // Include user's email
      username: this.username, // Include user's username
      fullName: this.fullName, // Include user's full name
    },
    process.env.ACCESS_TOKEN_SECRET, // Secret key to sign the access token
    { expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m" } // Token expiration (default to 15 minutes if not provided)
  );
  
  return token; // Return the generated access token
};

// Method to generate Refresh Token for the user
userSchema.methods.generateRefreshToken = function () {
  // JWT payload containing user ID for refresh token
  const refreshToken = jwt.sign(
    {
      _id: this._id, // Include user's ID only in refresh token
    },
    process.env.REFRESH_TOKEN_SECRET,  // Secret key to sign the refresh token
    { expiresIn: process.env.REFRESH_TOKEN_EXPIRY || "7d" } // Refresh token expiration (default to 7 days)
  );

  this.refreshToken = refreshToken; // Store refresh token in the user document
  return refreshToken; // Return the generated refresh token
};

// Export the User model to use in other parts of the app
export const User = mongoose.model("User", userSchema);
