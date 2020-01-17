const mongoose = require('mongoose');

const PointSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['point'],
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
});

export default PointSchema;
