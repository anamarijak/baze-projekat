$(document).ready(_init);
$(document).ready(function(){
  resetPost();
  resetComment();
});

//________________Inicijaliziacija listenere________________
function _init(){
  $(document).on('click', '.like', likeHandler);
  $(document).on('click', '.likeComment', likeCommentHandler);
  $(document).on('click', '.comment',toggleVisibleComment);
  $(document).on('click','.newComment',handleComment);
  $('#post').on('click',handlePost);

}

//_____________________Listener za like-ove na post_______________
function likeHandler(e){
  //get the id of post
  let post = $(this).attr('name');
 //jQ object for number of likes
  let likes = $(this).next();
  let numLikes = Number(likes.text())+1;
  console.log(numLikes);
  likes.val(numLikes.toString()).text(numLikes.toString());
  $.ajax({
    url:`post/like/${post}`,
    method: 'PUT',
    success:function(response){
      //well nothing :D
    },
    error:function(response, statusText, error){
      console.log(response);
      numLikes--;
      likes.val(numLikes.toString()).text(numLikes.toString());
    }
  });
}
//_________________________Listener za liko-ve na comment__________
function likeCommentHandler(e){
  //get the id of post
  let comment = $(this).attr('name');
  //jQ object for number of likes
  let likes = $(this).next();
  let numLikes = Number(likes.text())+1;
  console.log(numLikes);
  likes.val(numLikes.toString()).text(numLikes.toString());
  $.ajax({
    url:`/post/comment/like/${comment}`,
    method: 'PUT',
    success:function(response){
      //well nothing :D
    },
    error:function(response, statusText, error){
      console.log(response);
      numLikes--;
      likes.val(numLikes.toString()).text(numLikes.toString());
    }
  });
}

function handlePost(e){
  let post = $('#postContent').val().trim();
  if(!post.length) {
    resetPost();
    return;
  }
  $.ajax({
    url: '/post/create',
    method: 'POST',
    data: {content: post},
    success: function (response){
      resetPost();
      console.log(response);
      $('#post-container').prepend(response);
    },
    error: function(response, statusText, error){
      console.log("Response: ", response);
      console.log('Status text: ',statusText);
      console.log('Error: ',error);
    }
  });
}

function handleComment(e){
  console.log('Hanndling comment');
  let comment = $(this).parent().prev().prev().val().trim();
  let postId = $(this).attr('name');
  console.log(postId);
  console.log(comment);
  if(!comment.length) {
    resetPost();
    return;
  }
  $.ajax({
    url: `/post/${postId}/comment/create`,
    method: 'POST',
    data: {content: comment},
    success: function (response){
      console.log('Create post response \"n',response);
      resetComment();
      $(response).insertBefore($('#commentInputContainer'));
    },
    error: function(response, statusText, error){
      console.log("Response: ", response);
      console.log('Status text: ',statusText);
      console.log('Error: ',error);
    }
  });
}

function toggleVisibleComment(e){
  $(this).parent().parent().parent().next().slideToggle();
}

function resetPost(){ $('#postContent').val('');}
function resetComment(){ $('#commentContent').val('');}