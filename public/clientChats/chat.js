$(document).ready(function(){
  const socket = io("http://localhost:3000");
  $('#click_send_chat').on('click',function(e){
    var id_user = $('#id_user_chat').val();
    var content = $(".type_msg").val();
    socket.emit('chat',{
      id_user,
      content
    });
    $(".type_msg").val('');
  })
})