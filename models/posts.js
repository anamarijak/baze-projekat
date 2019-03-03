//mongoose je ODM (analogno kao ORM za sql baze)
const mongoose = require('mongoose');
//posto nema autoincrement, mora se module uzet koji ce to radit za nas
//da nebi rucno pravili funckiju koja to radi
const autoIncrement = require('mongoose-sequence')(mongoose);
//definisemo schemu koja ce predstavljat kolekciju u bazi
const Schema = mongoose.Schema;

//definisemo schemu koja ce predstavljat document u bazi
const postsSchema = new Schema({
    postId: { type: Number, index: true },
    content: {type: String, default: undefined },
    likes: { type: Number, default: 0},
    author: { type: Schema.Types.ObjectId, ref: 'User'},
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comment'}],
  },
  {
    //lista opcija, da stavlja kad je sta ko
    //po default dodaje u document createdAt i updatedAt
    timestamps: true
  });
//zakacimo autoincrement za id prop
postsSchema.plugin(autoIncrement, {inc_field: 'postId'});

module.exports = mongoose.model('Post', postsSchema);