

//submit form edit other
document.querySelector('#form_setting_other').addEventListener('submit',function(e){
  e.preventDefault();
  const data = {
    introduce : $('#setting_introduce').val(),
    interests : $('#setting_interests').val(),
    study : $('#setting_study').val(),
    experience : $('#setting_experience').val(),
  }
  fetch('/profile/settingInfo', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(response => {
    $(function() {
      "use strict";
      $(function() {
          $(".preloader").fadeIn();
      });
    });
    if(response.status =='oke'){
      $(function() {
        "use strict";
        $(function() {
            $(".preloader").fadeOut();
        });
      });
      $('#setting_introduce').val(response.data.other.introduce)
      $('#setting_interests').val(response.data.other.interests)
      $('#setting_study').val(response.data.other.study)
      $('#setting_experience').val(response.data.other.experience)
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
})
//submit form edit user
document.querySelector('#form_settings_user').addEventListener('submit',function(e){
  e.preventDefault();
  const data = {
    username : $('#username').val(),
    phone : $('#phone').val(),
    male : $('input:radio[name=sex]:checked').val(),
    city: $('#city').val()
  }
  fetch('/profile/settingUser', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(response => {
    $(function() {
      "use strict";
      $(function() {
          $(".preloader").fadeIn();
      });
    });
    if(response.status =='oke'){
      $(function() {
        "use strict";
        $(function() {
            $(".preloader").fadeOut();
        });
      });
      $('#username').val(response.data.username),
      $('#phone').val(response.data.phone),
      response.data.male == 'male' ? $('input:radio[name=sex]')[0].checked = true : response.data.male == 'female' ? $('input:radio[name=sex]')[1].checked = true : $('input:radio[name=sex]')[2].checked = true
      $('#city').val(response.data.city)
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
})
document.querySelector('#form_setting_passwrod').addEventListener('submit',function(e){
  e.preventDefault();
  let newPassword = $('#newPassword').val();
  let confirmPassword =  $('#confirmPassword').val();
  if(newPassword != confirmPassword){
    $('#message_warning').text(' Mật khẩu không khớp ');
    $('#modal_alert').css("display","block");
  }
  const data = {
    currentPassword : $('#currentPassword').val(),
    newPassword : newPassword,
    confirmPassword : confirmPassword
  }
  console.log(data)
  fetch('/profile/settingPassword', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
  })
  .then(response => response.json())
  .then(response => {
    $(function() {
      "use strict";
      $(function() {
          $(".preloader").fadeIn();
      });
    });
    if(response.status =='oke'){
      $(function() {
        "use strict";
        $(function() {
            $(".preloader").fadeOut();
        });
      });
    }
    else if(response.status =='error'){
      $('#message_warning').text(response.message);
      $('#modal_alert').css("display","block");
      $(function() {
        "use strict";
        $(function() {
            $(".preloader").fadeOut();
        });
      });
    }
  })
  .catch((error) => {
    console.error('Error:', error);
  });
})