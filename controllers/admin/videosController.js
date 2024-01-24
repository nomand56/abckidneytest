const cloudinary = require("cloudinary").v2;
const Video = require("../../models/addVideos");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dzryi4wwf",
  api_key: "989888121516364",
  api_secret: "Bix3uORDErcNSVMx5x-Uje8IBEU",
});

const videosController = {
  createVideo: async (req, res) => {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ message: "No file uploaded" });
    }
    try {
      const uploadResponse = await cloudinary.uploader.upload(file.path, {
        resource_type: "video",
      });
      const imageUrl = uploadResponse.secure_url;

      // Save the image URL to the database
      const newImage = new Video({
        title: req.body.title,
        url: imageUrl,
        chapter_id: req.body.chapter_id,
      });
      await newImage.save();

      res.json({ message: "Image uploaded successfully", url: imageUrl });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },

  getAllVideos: async (req, res) => {
    try {
      const videos = await Video.find();
      res.json(videos);
    } catch (error) {
      res.status(500).json({ error: "Error getting videos" });
    }
  },

  getVideoById: async (req, res) => {
    try {
      const video = await Video.find({ chapter_id: req.params.chapter_id });
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }
      res.json(video);
    } catch (error) {
      res.status(500).json({ error: "Error getting the video" });
    }
  },

  updateVideoById: async (req, res) => {
    try {
      // Upload video to Cloudinary
      const result = await cloudinary.uploader.upload(req.body.video, {
        resource_type: "video",
      });

      const updatedVideo = await Video.findByIdAndUpdate(
        req.params.videoId,
        {
          title: req.body.title,
          videoUrl: result.secure_url,
        },
        { new: true }
      );
      res.json(updatedVideo);
    } catch (error) {
      res.status(500).json({ error: "Error updating the video" });
    }
  },

  deleteVideoById: async (req, res) => {
    try {
      const video = await Video.findById(req.params.videoId);
      if (!video) {
        return res.status(404).json({ error: "Video not found" });
      }

      // Delete video from Cloudinary
      // await cloudinary.uploader.destroy(video.public_id);

      await Video.findByIdAndRemove(req.params.videoId);
      res.json({ message: "Video deleted" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting the video" });
    }
  },
};

module.exports = videosController;
