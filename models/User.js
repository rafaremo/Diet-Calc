const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');
const findOrCreate = require('mongoose-findorcreate');

const userSchema = new Schema({
  username:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
  },
  dietas:[
    {
      type: Schema.Types.ObjectId,
      ref: 'Dieta'
    }
  ],
  photoURL: {
    type: String,
    default: 'https://www.tenforums.com/geek/gars/images/2/types/thumb__ser.png'
  },
  active: {
    type: Boolean,
    default: false
  },
  confirmationCode: String
},{
  timestamps:{
    createdAt:'created_at',
    updatedAt: 'updated_at'
  }
}) 

userSchema.plugin(passportLocalMongoose, {usernameField:'email'})
userSchema.plugin(findOrCreate);

module.exports = mongoose.model('user', userSchema);