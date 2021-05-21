

let request_group_new = document.getElementById('request_group_new');
let request_group_remove = document.getElementById('request_group_remove');
if(request_group_new){
  request_group_new.addEventListener('click',function(e){
    e.preventDefault()
    console.log($('#post_request_group').attr('action'))
    $.ajax({
      method: "POST",
      url: $('#post_request_group').attr('action'),
    })
      .done(function(data) {
      if(data.status == 'oke'){
        console.log(data.request)
        socket.emit('send-request-add-group',data.request);
        window.location.href = `/group/${data.request.idGroup}`
      }
      }); 
  })
}
if(request_group_remove){
  request_group_remove.addEventListener('click',function(e){
    e.preventDefault()
    console.log($('#remove_request_group').attr('action'))
    $.ajax({
      method: "DELETE",
      url: $('#remove_request_group').attr('action'),
    })
      .done(function(data) {
      if(data.status == 'oke'){
        console.log(data)
        window.location.href = `/group/${data.group._id}`
      }
      }); 
  })
}
//remove post
$('.remove_post').click(function(e){
  $.ajax({
    method: "DELETE",
    url: e.target.getAttribute('url'),
  })
    .done(function(data) {
    if(data.status == 'oke'){
      console.log(data)
      window.location.href = `/group/${data.group._id}`
    }
    }); 
})