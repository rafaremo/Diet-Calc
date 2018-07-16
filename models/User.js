const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
  },
  dietas:{
    type:Schema.Types.ObjectId,
    ref:'Dieta'
  },
},{
  timestamps:{
    createdAt:'created_at',
    updatedAt: 'updated_at'
  }
}) 

userSchema.plugin(passportLocalMongoose, {usernameField:'email'})

module.exports = mongoose.model('user', userSchema);