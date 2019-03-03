const router = require('express').Router(),
  Post = require('../models/posts'),
  Comment = require('../models/comments'),
  formatDate = require('../utils/formatDate'),
  createPostResponse = require('../utils/createPostResponse'),
  createCommentResponse = require('../utils/createCommentResponse');
//TODO: kad stigne front, popravit za renderovanje da salje podatke od usera i posta
router.get('/',async (req, res, next) => {
  try{
    const posts = await Post.find().sort({createdAt: 'desc'})
      .populate({path: 'author', select: '_id username'})
      .populate({path: 'comments',select:'_id content author likes createdAt' ,
        populate:{ path:'author', select:'_id username'}});
    console.log("Posts: ",posts);
    res.render('posts',{ posts , formatDate , username: req.user.username });
  }catch (err){
    res.json(err);
  }
});

router.post('/create', async (req, res, next) => {
  let post = new Post({
    content: req.body.content,
    author: req.user._id
  });
  //console.log("konzola", post.author);
  let response = '';
  try{
    let createdPost = await post.save();
    console.log(createdPost);
    response = createPostResponse({post: createdPost, user: req.user});
    res.json(response);
  }catch (err){
    //TODO: experimentalno error, handle ga treba
    res.status(400).json(err);
  }
});
//ovo je za update method put, za likeove
router.put('/like/:id', async (req, res, next) => {
  let postId = req.params.id;
  try {
    let post = await Post.findByIdAndUpdate(postId, {$inc: { likes: 1} });
    console.log(post);
    res.json({msg: 'success'});
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete('/:id', async (req, res, next) =>{
  try{
    let deleted = await Post.findOneAndDelete({ _id: req.params.id });
    let deletedComments = await deleted.comments.remove();
    console.log(deleted);
    console.log(deletedComments);
    res.json({deleted, deletedComments});
  }catch(err){
    console.log(err);
    res.status(500).json(err);
  }
});
/* kraj za postove kreiranje i slicno, idemo na comments */

router.post('/:id/comment/create', async (req, res, next) => {
  let postId = req.params.id;
  let newComment = new Comment({
    content: req.body.content,
    author: req.user._id,
    post: postId,
  });
  try{
    let comment = await newComment.save();
    let post = await Post.findOneAndUpdate({_id: postId},{ $push:{ comments: comment._id }});
    let createdComment = createCommentResponse({comment,user: req.user});
    res.json(createdComment);
  } catch(err) {
    console.log(err);
    res.status(409).json(err);
  }
});

router.delete('/:postId/comment/:commentId', async (req, res, next) =>{
  let postId = req.params.postId,
      commentId = req.params.commentId;
  console.log('Post:',postId,' | comment:',commentId);
  try{
    //TODO: Mozda ovo moze i u 2 poteza da se uradi
    let comment = await Comment.findByIdAndRemove(commentId);
    console.log('Removed comment:');
    console.log(comment);
    let post = await Post.findById(postId);
    let deleted = await post.comments.pull(commentId);
    await post.save();
  //TODO: proper massage
    res.json({deleted,comment});
  }catch(err){
    res.json(err);
  }
});
router.put('/comment/like/:id', async (req, res, next) => {
  let commentId = req.params.id;
  console.log(commentId);
  try {
    let comment = await Comment.findByIdAndUpdate(commentId, {$inc: { likes: 1} });
    console.log(comment);
    res.json({msg:'success'});
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;