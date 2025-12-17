const express = require("express");
const router = express.Router();
const Notes = require("../models/Note");
const fetchUser = require("../middlewares/getuser");
const User = require("../models/User");
const { body, validationResult } = require("express-validator");

// Fetch all notes

router.get("/fetchallnotes", fetchUser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

//Add a new note

router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Enter a valid description").isLength({ min: 1 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      let { title, description, tag } = req.body;
      const newnote = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savednote = await newnote.save();
      res.json(savednote);
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
  }
);

router.get("/getnote/:id",fetchUser,async(req,res)=>{
   try {
      const note = await(Notes.findById(req.params.id));
      res.json(note)
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal server error");
    }
})

// updating note : /api/notes/updatenote

router.put("/updatenote/:id", fetchUser, async (req, res) => {
  try {
    const noteid = req.params.id;
    const newnote = {};
    const { title, description, tag } = req.body;
    if (title) {
      newnote.title = title;
    }
    if (description) {
      newnote.description = description;
    }
    if (tag) {
      newnote.tag = tag;
    }

    const note = await Notes.findById(noteid);
    if (!note) {
      return res.status(404).send("No note exsists");
    }

    if (req.user.id !== note.user.toString()) {
      return res.status(401).send("Not Allowed");
    }
    const updated = await Notes.findByIdAndUpdate(
      noteid,
      { $set: newnote },
      { new: true }
    );
    res.json(updated);
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

// deleting note : /api/notes/deletenote

router.delete("/deletenote/:id", fetchUser, async (req, res) => {
  try {
    const noteid = req.params.id;
    const note = await Notes.findById(noteid);
    if (!note) {
      return res.status(404).send("No note exsists");
    }   
    if (req.user.id !== note.user.toString()) {
      return res.status(401).send("Not Allowed"); 
    }
    const deletednote = await Notes.findByIdAndDelete(noteid);
    res.json({ Success: "Note has been deleted", note: deletednote });
  } catch (error) {
    console.log(error);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
