const express = require('express');
const router = express.Router()
const DogSitter = require("../models/dog-sitter-model")
const fileUpload = require("../configs/cloudinary")


//Create profile => become a sitter page
router.post("/create-profile", async (req,res) => {
  const {
    email,
    name,
    dogAge,
    pottyTrained,
    rate,
    services,
    size,
    imageUrl,
    space,
    about,
    area} = req.body;
/*   if (!pottyTrained || !rate || !size || !imageUrl) {
      res.status(400).json("missing feilds");
      return;
  } */

  try {
      const response = await DogSitter.create ({
        email,
        name,
        dogAge,
      pottyTrained,
    rate,
    services,
    size,
    imageUrl,
    space,
    about,
    area
      });
      res.status(200).json(response);
  } catch(e) {
      res.status(500).json(`error occured ${e}`)
  }

});


//Delete profile => not yet available
router.delete("/profiles/:id", async (req, res) =>{
  try {
      await DogSitter.findByIdAndRemove(req.params.id);
      res.status(200).json(`profile with id ${req.params.id} deleted`)
  } 
  catch(e){
      res.status(500).json(`error occured ${e}`)
  }
})


//Update profile
router.put("/profiles/:id", async (req,res) => {
  try {
      const {
        service,
        space,
        about,
        dogSize,
        dogAge,
        pottyTrained,
        imageUrl} = req.body
     await DogSitter.findByIdAndUpdate(req.params.id, {
      service,
      space,
      about,
      dogSize,
      dogAge,
      pottyTrained,
      imageUrl
      });
      res.status(200).json(`profile with id ${req.params.id} was updated`)
  } 
  catch (e) {
      res.status(500).json(`error occured ${e}`)
  }
})


//Upload images to Cloudinary
router.post("/upload", fileUpload.single("file"), (req,res) => {
  try {
   res.status(200).json({fileUrl: req.file.path})
  } catch (e) {
      res.status(500).json(`error occured ${e}`)
  }
})


module.exports = router;