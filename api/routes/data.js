const express = require('express');
const router = express.Router();
const multer = require('multer');
const Data = require('../models/data');
const mongoose = require('mongoose');

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);

const hostname = 'http://backend.digitaltwincities.info/'

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './images/');
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const fileFilter = (req, file, cb) =>{
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null, true);
    }else{
        cb(null, false);
    }

};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.get("/", (req, res, next) => {

    data = Data.find()
    .select("longitude latitude compass image classification createdDate")
    .exec()
    .then(docs => {
        const response = {
            count: docs.length,
            data: docs.map(doc => {
                return {
                    latitude: doc.latitude,
                    longitude: doc.longitude,
                    compass: doc.compass,
                    classification: doc.classification,
                    createdDate: doc.createdDate,
                    image: hostname+doc.image
                }
            })
        }

        res.status(200).json(response);
    })
    .catch(err => {
        console.log(err);
        res.send(500).json({
            error: err
        })
    })
    
})

router.post("/", upload.single('image'),(req, res, next)=>{
    data = new Data({
        _id: new mongoose.Types.ObjectId(),
        latitude: req.body.latitude,
        longitude: req.body.longitude,
        compass: req.body.compass,
        classification: req.body.classification,
        image: req.file.path
    });

    data
    .save()
    .then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Added the image successfull'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});

// Delete everythin in the server
router.delete("/", (req,res,next)=>{
    Data.deleteMany({})
    .then(result =>{
        res.status(200).json({
            message: 'Deleted all documents'
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        })
    })
});
module.exports = router;