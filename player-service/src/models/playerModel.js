const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    photoUrl: { type: String, required: true, }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Player", playerSchema);
