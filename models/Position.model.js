const { mongoose, Schema, model } = require('mongoose');

const positionSchema = new Schema(
  {
    title: String,
    description: String,
    company: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Company"
    },
    jobRating: Number,
    hrEmail: String,
  },
  {
    timestamps: true
  }
);

module.exports = model('Position', positionSchema);
