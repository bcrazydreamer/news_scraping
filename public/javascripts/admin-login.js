var code = '';
code += '<div class="alert alert-danger alert-dismissible" id="error-message">';
code += '<button type="button" class="close" data-dismiss="alert">&times;</button>';
code += '    <center>Invalid username/password</center>';
code += '</div>';
code += '<form id="login-form" onsubmit="return false">';
code += '<center><label><h4>Admin Login</h4></label></center>';
code += '<div class="form-group"><label for="username">Username:</label>';
code += '     <input type="email" class="form-control" id="username" placeholder="Enter username" name="username">';
code += '</div>';
code += '<div class="form-group"><label for="password">Password:</label>';
code += '   <input type="password" class="form-control" id="password" placeholder="Enter password" name="password">';
code += '</div>';
code += '<div class="form-group form-check">';
code += '<label class="form-check-label">';
code += '  <input class="form-check-input" type="checkbox"> Remember me';
code += '</label>';
code += '</div>';
code += '<button class="btn btn-primary" id="login-btn">Submit</button>';
code += '<button class="btn btn-warning" style="float:right" id="goToHomeBtn">Home</button>';
code += '</form>';
code += '<div class="loading-div-login">';
code += '   <center><img src="app_pics/bg/loading3.gif" /></center>';
code +='</div>';


openLoginPop();

function openLoginPop(){
  $.confirm({
      title: '<div style="position:absolute"></div>',
      content:code,
      buttons: {
          'cancel': {btnClass: 'btn-danger blank-button',}
      }
  });
}

$("#login-form").submit(function(e) {
    e.preventDefault();
});

$(document).on('click', '#goToHomeBtn', function() {

  window.location.href = '/';

});

$(document).on('click', '#login-btn', function() {
      $('.loading-div-login').css('display','inline');
      $('#login-form').css('display','none');
      var data = {};
      data.username = $('#username').val();
      data.password = $('#password').val();
      $.ajax({
            type: 'POST',
            data: JSON.stringify(data),
            contentType: 'application/json',
            url: '/admin',
            success: function (response) {
              if(response==true){
                window.location.href = '/admin/dashboard';
              }else{
                $('.loading-div-login').css('display','none');
                $('#login-form').css('display','inline');
                $('#error-message').css('display','block');
              }
            },
            error: function (err) {
              $('.loading-div-login').css('display','none');
            }
        });
 });



function loadingLogin(){
  $.confirm({
      title: ' ',
      content:"<center><img src='app_pics/bg/loading3.gif' class='loading-pop-img' /></center>",
      buttons: {
          'blank': {btnClass: 'btn-danger testing',}
      }
  });
  $('.testing').click();
}
