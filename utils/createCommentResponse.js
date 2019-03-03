const formatDate = require('../utils/formatDate');
module.exports = data =>{
  console.log('Data: ',data);
  let date = formatDate(data.comment.createdAt);
  return `<article class="row">
                        <div class="col-md-2 col-sm-2 hidden-xs">
                            <figure class="thumbnail">
                                <img class="img-responsive"
                                     src="/images/user-avatar-placeholder.png">
                                <figcaption class="text-center">
                                    <a href="/profile/${data.user._id}">${data.user.username}</a>
                                </figcaption>
                            </figure>
                        </div>
                        <div class="col-md-10 col-sm-10 col-xs-12">
                            <div class="panel panel-default arrow left">
                                <div class="panel-body">
                                    <header class="text-left">
                                        <div class="comment-user">
                                            <i class="fa fa-user"></i>
                                            <a href="/profile/${data.user._id}">${data.user.username}</a>
                                        </div>
                                        <hr>
                                        <time class="comment-date" datetime="${date}">
                                            <i class="fa fa-clock-o"></i>${date}
                                        </time>
                                    </header>
                                    <div class="comment-post">
                                        <p>
                                            ${data.comment.content}
                                        </p>
                                    </div>
                                    <hr>
                                    <div class="row" style="margin-left: 5px">
                                        <button id='like' class="btn btn-danger likeComment" name="${data.comment._id}">
                                            Like comment
                                        </button>
                                        <span id='numberOfLikes' class="mr-auto">${data.comment.likes}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>`
};