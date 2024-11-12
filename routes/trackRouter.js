import express from "express";
import multer from "multer";
import {
  addNewTrack,
  deleteTrackByID,
  getTracksByUserId,
} from "../model/track/trackModel.js";

const router = express.Router();

const mp3Folder = "public/songs/track";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let error = null;
    cb(error, mp3Folder);
  },
  filename: (req, file, cb) => {
    let error = null;
    const fullFileName = Date.now() + "-" + file.originalname;
    cb(error, fullFileName);
  },
});

const upload = multer({ storage });

router.get("/:user_id", async (req, res) => {
  const { user_id } = req.params;

  const response = await getTracksByUserId(user_id);
  try {
    if (response.length > 0) {
      res.json({
        status: "success",
        message: "Here are the track added by user",
        tracks: response,
      });
    } else
      res.json({
        status: "success",
        message: "No tracks found for this user",
      });
  } catch (error) {
    throw new Error("Something wrong while fetching track/s", error);
  }
});

router.post("/", upload.array("mp3", 1), async (req, res) => {
  try {
    if (req.files.length === 1) {
      req.body.mp3 = req.files[0].path;
    }

    const result = await addNewTrack(req.body);

    if (result.length > 0) {
      const newTrack = result[0];
      return res.json({
        status: "success",
        message: "New Track has been added",
        track: newTrack,
      });
    }
  } catch (error) {
    console.log("error while adding track", error);
  }
});
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const result = await deleteTrackByID(id);
  if (result.length > 0) {
    const deletedTrack = result[0];
    if (deletedTrack.id) {
      res.json({
        status: "success",
        message: "Successfully deleted the track",
        track: deletedTrack,
      });
    }
  }
});

export default router;
