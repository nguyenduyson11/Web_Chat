
// send addfirend
$('#requestFriend').click(function(e){
  e.preventDefault();
  console.log(e.target.getAttribute('href'))
  $.ajax({
    method: "POST",
    url: e.target.getAttribute('href'),
    async: false
  })
    .done(function(data) {
      let html = ` <a id="removeFriend" href="/requestFriends/${data.userSearch._id}/remove" title="Add friend" data-toggle="tooltip">
      <i id="icon_removeRequest" href="/requestFriends/${data.userSearch._id}/remove" class="fas fa-user-minus"></i>
      </a>`
     $('#friendRequestGroup').html(html);
      // $('#requestFriend').html(' <i  class="fas fa-user-plus"></i>')
      //
      $('#removeFriend').click(function(e){
        e.preventDefault();
        console.log(e.target.getAttribute('href'))
        $.ajax({
          method: "DELETE",
          url: e.target.getAttribute('href'),
          async: false
        })
          .done(function(data) {
            console.log('thành công')
            let html = ` <a id="requestFriend" href="/requestFriends/${data.userSearch._id}/add" title="Add friend" data-toggle="tooltip">
              <i id="icon_addRequest" href="/requestFriends/${data.userSearch._id}/add" class="fas fa-user-plus"></i>
            </a>`
            $('#friendRequestGroup').html(html);
            // $('#requestFriend').html(' <i  class="fas fa-user-plus"></i>')
          }); 
      })
      
    }); 
})
//remove addfriend
$('#removeFriend').click(function(e){
  e.preventDefault();
  console.log(e.target.getAttribute('href'))
  $.ajax({
    method: "DELETE",
    url: e.target.getAttribute('href'),
    async: false
  })
    .done(function(data) {
      console.log('thành công')
      let html = ` <a id="requestFriend" href="/requestFriends/${data.userSearch._id}/add" title="Add friend" data-toggle="tooltip">
        <i id="icon_addRequest" href="/requestFriends/${data.userSearch._id}/add" class="fas fa-user-plus"></i>
      </a>`
      $('#friendRequestGroup').html(html);
      // $('#requestFriend').html(' <i  class="fas fa-user-plus"></i>')
    }); 
})
window.addEventListener('change', e => {
  console.log('State changed', e);
});

