
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
      console.log(data.userSearch._id)
            socket.emit("add-friend",{userId: data.userSearch._id, userRequest : window.currentUser});
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

//accept friends
function acceptFriend(){
  let icon_accept = document.getElementsByClassName('accept_friends');
  console.log(icon_accept)
  for(let i = 0; i<icon_accept.length;i++){
    icon_accept[i].addEventListener('click',function(e){
      console.log(e.target.getAttribute('url'))
      $.ajax({
        method: "PATCH",
        url: e.target.getAttribute('url'),
      })
        .done(function(data) {
        if(data.status == 'oke'){
          e.target.parentElement.remove();
          document.getElementById('count_request').innerHTML = data.user.requests.length;
        }
        }); 
    })
  }
}
function block_Friends(){
  let icon_block = document.getElementsByClassName('block_friends');
  for(let i = 0; i<icon_block.length;i++){
    icon_block[i].addEventListener('click',function(e){
      console.log(e.target.getAttribute('url'))
      $.ajax({
        method: "DELETE",
        url: e.target.getAttribute('url'),
      })
        .done(function(data) {
        if(data.status == 'oke'){
          e.target.parentElement.remove();
          document.getElementById('count_request').innerHTML = data.userSearch.requests.length;
        }
        }); 
    })
  }
}

acceptFriend()
block_Friends()
//destroy friends
let btn_destroy = document.getElementById('destroy_friends');
if(btn_destroy){
  btn_destroy.addEventListener('click',function(e){
    e.preventDefault();
    $.ajax({
      method: "DELETE",
      url: e.target.getAttribute('href'),
    })
      .done(function(data) {
       if(data.status == 'oke'){
        window.location.href = `/profile/${data.user._id}`
       }
      });
  })
}

$('.destroy_friends').on('click',function(e){
    e.preventDefault();
    $.ajax({
      method: "DELETE",
      url: e.target.getAttribute('href'),
    })
      .done(function(data) {
      if(data.status == 'oke'){
        window.location.href = `/profile/${data.user._id}/friends`
      }
      });
})
$('#request_blockUser').on('click',function(e){
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: e.target.getAttribute('href'),
  })
    .done(function(data) {
    if(data.status == 'oke'){
      e.target.innerHTML = 'Bỏ chặn'
      e.target.setAttribute("href", `/friends/${data.id_user}/unblock`)
      e.target.setAttribute("id", `request_unblockUser`)
    }
    unblock()
    });
    
})
unblock()
function unblock(){
  $('#request_unblockUser').on('click',function(e){
    e.preventDefault();
    $.ajax({
      method: "PATCH",
      url: e.target.getAttribute('href'),
    })
      .done(function(data) {
      if(data.status == 'oke'){
        e.target.innerHTML = 'chặn'
        e.target.setAttribute("href", `/friends/${data.id_user}/block`)
        e.target.setAttribute("id", `request_blockUser`)
      }
      });
  })
}
if(document.getElementById('select_sort_firend')){
  document.getElementById('select_sort_firend').addEventListener('change',function(e){
    $.ajax({
      method: "GET",
      url: `/friends/${e.target.getAttribute('data-id')}/sort?key=${e.target.value}`,
    })
      .done(function(data) {
      if(data.status == 'oke'){
        $('.group_listFriends').html('')
        for(let friend of data.listFriends){
           let html = `<div class="col-lg-3 col-md-6 col-sm-6">
           <div class="friend-block">
               <div class="more-opotnz">
                   <i class="fa fa-ellipsis-h"></i>
                   <ul>
                       <li><a href="#" title="">Chặn</a></li>
                       <li><a href="#" title="">Bỏ Chặn</a></li>                                         
                           <li><a class="destroy_friends" href="/friends/${friend._id}/destroy" title="">Hủy Kết Bạn</a></li>
                   </ul>
               </div>
               <figure>
                   <img src="${friend.image}" alt="">
               </figure>
               
               <div class="frnd-meta">
                   <div class="frnd-name">
                       <a href="/profile/${friend._id}" title="">${friend.username}</a>
                       <span>${friend.city}</span>
                   </div>
                   <a class="send-mesg" href="#" title="">Nhắn tin</a>
               </div>
           </div>
       </div>`      
           $('.group_listFriends').append(html)      
            $(".friend-block").show();
  
            
        }
      }
  
      });
  })
}

// realtime
socket.on("notifycation-friend",function(data){
  if(window.currentUser.id.toString() == data.userTo._id.toString()){
    // let id_request =  data.request.find(e=>e.fromTo.toString() == data._id.toString())._id
    let html = `<li class="list-group-item right-menu-item">
                  <div class="user">
                      <img src="${data.userFrom.image}" alt="">
                  </div>
                  <div class="name">
                      <a href="/profile/${data.userFrom._id}"><strong class="username">${data.userFrom.username}</strong></a>
                      <p class="status friend">20 bạn chung</p>
                  </div>
                  <i url="/requestFriends/${data.request_id}/accept/${data.userFrom._id}" class="fas fa-user-plus accept_friends" style="color: #38a9ff;"></i>
                  <i class="fas fa-user-minus" style="color: #9899a4;"></i>
              </li>` 
      $(html).insertAfter("li.list-group-first");
      let count_requets = document.getElementById('count_request');
      if(count_requets){
        count_requets.innerHTML = data.userTo.requests.length
      }
      else{
        let html =` <div class="inform-icon" style="background: #38a9ff;">
                        <p id="count_request">${ data.userTo.requests.length }</p>
                    </div>`
        $(html).insertAfter("i.icon_first_element")     
      }
      acceptFriend()     
  }
})