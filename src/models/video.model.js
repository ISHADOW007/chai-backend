import mongoose, { Schema } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2"; // Importing pagination plugin for mongoose

// Define the Video schema for storing video-related information
const videoSchema = new Schema(
  {
    // URL to the video file (likely stored on Cloudinary or other cloud storage)
    videoFile: {
      type: String,
      required: true, // Video file is required
    },
    // URL to the video thumbnail image
    thumbnail: {
      type: String,
      required: true, // Thumbnail is required
    },
    // Title of the video
    title: {
      type: String,
      required: true, // Title is required
    },
    // Description of the video
    description: {
      type: String,
      required: true, // Description is required
    },
    // Duration of the video in seconds
    duration: {
      type: Number,
      required: true, // Duration is required
    },
    // Number of views the video has received, defaults to 0
    views: {
      type: Number,
      default: 0, // Default value for views is 0
    },
    // Flag indicating whether the video is published or not
    isPublished: {
      type: Boolean,
      default: true, // Default value is true, meaning the video is published by default
    },
    // Reference to the User who owns this video (foreign key relationship)
    owner: {
      type: Schema.Types.ObjectId, // Mongoose ObjectId to reference the User model
      ref: "User", // Reference to the "User" model
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt timestamps
  }
);

// Apply the pagination plugin to the video schema
videoSchema.plugin(mongooseAggregatePaginate); 

// Export the Video model to be used in the app
export const Video = mongoose.model("Video", videoSchema);
