const express = require('express');
const router = express.Router()
const DogOwner = require("../models/dog-owner-model");
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
    service,
    address,
    pickUp,
    dropOff,
    dogSize,
    dogAge,
    otherDogs,
    imageUrl,
    specialComments} = req.body;
  if (!service || !address || !pickUp || !dropOff || !dogSize || !dogAge || !otherDogs || !imageUrl || !specialComments) {
      res.status(400).json("missing feilds");
      return;
  }

  try {
      const response = await DogOwner.create ({
        service,
        address,
        pickUp,
        dropOff,
        dogSize,
        dogAge,
        otherDogs,
        imageUrl,
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