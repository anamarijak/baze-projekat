$(document).ready(function(){
  $('#signUpForm').on('submit',function(e){
    e.preventDefault();
    const user = {
      username: $('#username').val(),
      email: $('#email').val(),
      password: $('#password').val(),
      name: $('#name').val(),
      surname: $('#surname').val(),
    };
    console.log(user);
    $.ajax({
      url: '/user/create',
      method: 'POST',
      data: user,
      success: function(response){
        //dodati message, da je uspjesno registrovan
        location.assign('/user/signin');
      },
      error: function(response, statusText, error){
        //ovdje cemo handle alert
      }
    });
  });
  $('#signInForm').on('submit',function(e){
    e.preventDefault();
    const user = {
      email: $('#email').val(),
      password: $('#password').val(),
    };
    console.log(user);
    $.ajax({
      url: '/user/signin',
      method: 'POST',
      data: user,
      success: function(response){
        location.assign('/home');
      },
      error: function(response, statusText, error){
        //ovdje cemo handle alert
        console.log(response);
      }
    });
  });
});