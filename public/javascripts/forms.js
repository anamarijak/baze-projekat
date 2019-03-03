$(document).ready(_init);

function _init(){
  $('#login-form').on('submit',handleLogin);
  $('#reg-form').on('submit',handleReg);
}

function handleLogin(e){
  e.preventDefault();
  e.stopPropagation();

  let email = $('#email').val().trim(),
   password = $('#password').val().trim();
  console.log(email,password);
  if(email.match(/^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/)){
    alert('Invalid email');
    return;
  }
  //TODO: Message update for invalid mail and short password
  if(password.length < 4) {
    alert('Password is too short');
    return;
  }
  $.ajax({
    url:  '/user/signin',
    method: 'POST',
    data :{email, password},
    success: function(response){
      alert('success');
      console.log(response)
      location.assign('/home');
    },
    error: function(response, statusText, error){
      if(response.status === 401)
        alert('Invalid username/password');
      else if(reponse.status === 500)
        alert('Error on server, pls try again in 5min');
    }
  });
}

function handleReg(e){
  e.preventDefault();
  e.stopPropagation();

  let email = $('#input-email').val().trim(),
    username = $('#input-username').val().trim(),
    password = $('#input-password').val().trim(),
    name = capitalize($('#input-first').val().trim()),
    surname = capitalize($('#input-surname').val().trim());

  if(email.match(/^[A-Z0-9+_.-]+@[A-Z0-9.-]+$/)){
    alert('Invalid email');
    return;
  }
  //TODO: Message update for invalid mail and short password
  if(password.length < 4) {
    alert('Password is too short');
    return;
  }
  $.ajax({
    url:  '/user/create',
    method: 'POST',
    data :{email, password , username, name, surname},
    success: function(response){
      alert('success register, proceed to login');
      console.log(response);
      location.assign('/');
    },
    error: function(response, statusText, error){
      console.log(response);
      console.log(statusText);
      console.log(error);
      alert('Error during registration');
    }
  });
}

function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}