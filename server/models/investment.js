const mongoose = require("mongoose");

const investmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
});

const Investment = mongoose.model("Investment", investmentSchema);

module.exports = Investment;