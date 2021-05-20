const express = require('express');
const router = express.Router()
const DogOwner = require("../models/dog-owner-model");
const DogSitter = require("../models/dog-sitter-model");

const fileUpload = require("../configs/cloudinary")



//Get/view all sitters => available sitters page
router.get("/sitters", async (req,res) => {
  try {
      const allSitters = await DogSitter.find();
 res.status(200).json(allSitters); 
  } catch(e) {
      res.status(500).json(`error occured ${e}`)
  }
});



//Create dog sitting request
router.post("/sitter-request", async (req,res) => {
  const {
    services,
    address,
    pickUp,
    dropOff,
    dogSize,
    dogAge,
    otherDogs,
    specialComments} = req.body;
  if (!services || !address || !pickUp || !dropOff) {
      res.status(400).json("missing feilds");
      return;
  }

  try {
      const response = await DogOwner.create ({
        services,
        address,
        pickUp,
        dropOff,
        dogSize,
        dogAge,
        otherDogs,
        specialComments
      });
      res.status(200).json(response);
  } catch(e) {
      res.status(500).json(`error occured ${e}`)
  }

});


//Upload images to Cloudinary => search sitters page
router.post("/upload", fileUpload.single("file"), (req,res) => {
  try {
   res.status(200).json({fileUrl: req.file.path})
  } catch (e) {
      res.status(500).json(`error occured ${e}`)
  }
})


//Create sitter request (by id) => search sitters page-certain sitter
router.get("/sitters/:id", async (req, res) => {
  try {
      const sitter = await DogSitter.findById(req.params.id);
      res.status(200).json(sitter)
  } 
  catch (e) {
      res.status(500).json(`error occured ${e}`)
  }
})

module.exports = router;