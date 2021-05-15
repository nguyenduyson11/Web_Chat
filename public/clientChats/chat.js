$(document).ready(function(){
  const socket = io("http://localhost:3000");
  
  $('.item_user_chat').click(function(e){
    document.querySelector('.tab-pane').classList.add('show');
    $.ajax({
      method: "GET",
      url: `/friends/${e.target.getAttribute('data-id')}`,
    })
      .done(function(data) {
        $('.avatar_user_chat').attr("src",data.userSelect.image);
        $('.username_user_chat').html(data.userSelect.username);
        $('.about_user_chat').html((data.userSelect.other ? data.userSelect.other.introduce : ''));
        $('.phone_user_chat').html(`<span>Phone:</span> ${data.userSelect.phone}`);
        $('.email_user_chat').html(data.userSelect.email);
        $('.messenger').attr("data-id",data.userSelect._id);
      });
  })
})