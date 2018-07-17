const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const dietaSchema = new Schema({
  name: {
    type: String,
    default: 'Dieta - ' + new Date()
  },
  usuario: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  comidas: [{
    food: {
      type: Schema.Types.ObjectId,
      ref: 'Food'
    },
    quantity: Number
  }],
  inputInfo: {
    edad: Number,
    peso: Number,
    altura: Number,
    sexo: String,
    activity: Number
  }
},{
  timestamps:{
    createdAt:'created_at',
    updatedAt: 'updated_at'
  }
})

module.exports = mongoose.model('Dieta', dietaSchema);