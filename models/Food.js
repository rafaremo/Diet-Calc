const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const foodSchema = new Schema({
  name: String,
  serving: {
    amount: Number,
    unit: String
  },
  cal: Number,
  protein: Number,
  carbs: Number,
  fat: Number
},{
  timestamps:{
    createdAt:'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Food', foodSchema);