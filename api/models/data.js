const mongoose = require('mongoose');
const dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    latitude:{
        type: Number,
        required: true
    },
    longitude:{
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    compassX: {
        type: Number,
        required: true
    },
    compassY:{
        type: Number,
        required: true
    },
    compassZ:{
        type:Number,
        required: true
    }
});

module.exports = mongoose.model("Data", dataSchema);