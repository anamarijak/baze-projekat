//mongoose je ODM (analogno kao ORM za sql baze)
const mongoose = require('mongoose');
//posto nema autoincrement, mora se module uzet koji ce to radit za nas
//da nebi rucno pravili funckiju koja to radi
const autoIncrement = require('mongoose-sequence')(mongoose);
//uvedemo funkciju za hash pw
const encrypt = require('../utils/encrypt');
//definisemo schemu koja ce predstavljat kolekciju u bazi
const Schema = mongoose.Schema;
//definisemo schemu koja ce predstavljat document u bazi
const userSchema = new Schema({
  id: {type: Number, index: true},
  username: {type: String, default: undefined},
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: {type: String, required: true },
  name: {type: String , default: undefined },
  surname: {type: String, default: undefined },
},{
    //lista opcija, da stavlja kad je sta ko
    //po default dodaje u document createdAt i updatedAt
  timestamps: true
});
// pre save hook, da prije nego sto uradi save (insert u db) izvrsi se ova funkcija
userSchema.pre('save', async function (next) {
  if (this.password && this.isModified('password'))
    this.password = await encrypt(this.password);
  next();
});
//zakacimo autoincrement za id prop
userSchema.plugin(autoIncrement, {inc_field: 'id'});

module.exports = mongoose.model('User', userSchema);