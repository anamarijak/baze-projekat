//mongoose je ODM (analogno kao ORM za sql baze)
const mongoose = require('mongoose');
//posto nema autoincrement, mora se module uzet koji ce to radit za nas
//da nebi rucno pravili funckiju koja to radi
const autoIncrement = require('mongoose-sequence')(mongoose);
//definisemo schemu koja ce predstavljat kolekciju u bazi
const Schema = mongoose.Schema;

//definisemo schemu koja ce predstavljat document u bazi
const MessagesSchema = new Schema({
    msgId: { type: Number, index: true },
    content: {type: String, default: undefined },
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    date: {type: Date},
  },
  {
    //lista opcija, da stavlja kad je sta ko
    //po default dodaje u document createdAt i updatedAt
    timestamps: true
  });
//zakacimo autoincrement za id prop
MessagesSchema.plugin(autoIncrement, {inc_field: 'msgId'});

module.exports = mongoose.model('MessageModel', MessagesSchema);