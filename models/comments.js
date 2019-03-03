//mongoose je ODM (analogno kao ORM za sql baze)
const mongoose = require('mongoose');
//posto nema autoincrement, mora se module uzet koji ce to radit za nas
//da nebi rucno pravili funckiju koja to radi
const autoIncrement = require('mongoose-sequence')(mongoose);
//definisemo schemu koja ce predstavljat kolekciju u bazi
const Schema = mongoose.Schema;
//definisemo schemu koja ce predstavljat document u bazi

const commentsSchema = new Schema({
    comentId: { type: Number, index: true },
    content: { type: String, default: undefined },
    likes: { type: Number, default: 0 },
  //kreiramo relaciju, svaki komentar postavljen ima tacno jednog usera koji ga je ostavio
    author: { type: Schema.Types.ObjectId, ref:'User'},
    post: { type: Schema.Types.ObjectId, ref:'Post'},
  },
  {
    //lista opcija, da stavlja kad je sta ko
    //po default dodaje u document createdAt i updatedAt
    timestamps: true
  });
// pre save hook, da prije nego sto uradi save (insert u db) izvrsi se ova funkcija

//zakacimo autoincrement za id prop
commentsSchema.plugin(autoIncrement, {inc_field: 'commentId'});

module.exports = mongoose.model('Comment', commentsSchema);