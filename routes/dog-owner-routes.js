const express = require('express');
const router = express.Router()
const DogOwner = require("../models/dog-owner-model");
const DogSitter = require("../models/dog-sitter-model");
const bcrypt = require ("bcryptjs")
const fileUpload = require("../configs/cloudinary")
const nodemailer = require("nodemailer")


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

//Send email to request booking
router.post("/request-booking", async (req,res) => {
  const {email, requestText} = req.body;
  let transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "doggo.paws.services",
        pass: "One234567",
      },
    });
    const response = await transporter.sendMail({
      from: "doggo.paws.services@gmail.com",
      to: email,
      subject: 'Booking Request', 
      text: 'yada yada',
      html: `<b>${requestText}</b>`
    })

    res.status(200).json(response)
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