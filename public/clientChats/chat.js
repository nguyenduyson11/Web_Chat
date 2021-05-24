const socket = io("http://localhost:3000");
$(document).ready(function(){
  
  var selectedFriend = null;
  //call video
  $('.audio-call-user, .video-call-user').click(function(e){
    e.stopPropagation();
    socket.emit('call-video',{
      receiver : selectedFriend._id,
      sender : window.currentUser
    })
    window.open(`/videoCall/${selectedFriend._id}`, '_blank');
  });

  $('.image_icon').click(function(e){{
    $('#file_image_icon').val(e.target.getAttribute('src'))
      $('#input_message_chat').val(e.target.getAttribute('alt'))
  }})
function getlistUserChat(){
  $('.item_user_chat').on('click',function(e){
    document.querySelector('.tab-pane').classList.add('show');
    $.ajax({
      method: "GET",
      url: `/friends/${e.target.getAttribute('data-id')}`,
    })
      .done(function(data) {
        selectedFriend = data.userSelect;
        $('#view_info').attr('href',`/profile/${selectedFriend._id}`)
        $('.avatar_user_chat').attr("src",data.userSelect.image);
        $('.username_user_chat').html(data.userSelect.username);
        $('.about_user_chat').html((data.userSelect.other ? data.userSelect.other.introduce : ''));
        $('.phone_user_chat').html(`<span>Phone:</span> ${data.userSelect.phone}`);
        $('.email_user_chat').html(data.userSelect.email);
        $('.messenger').attr("data-id",data.userSelect._id);
        let html = ``;
        for(let i =0;i<data.inbox.length;i++){
          if(data.inbox[i].from.toString() == window.currentUser.id.toString()){
            html+= `<li class="me">
                      <figure><img src="${window.currentUser.image}" alt=""></figure>
                      <div class="text-box">
                          <p>
                          ${data.inbox[i].icon ? `<span><img src="${data.inbox[i].icon}" alt=""></span>` : `${data.inbox[i].message}`}            
                          ${data.inbox[i].file ? `<span><img src="/upload/${data.inbox[i].file}" alt=""></span>` : ''}
                          </p>
                          <span><i class="fa fa-check" style="margin: 5px 0px;" aria-hidden="true"></i><i class="fa fa-check" style="margin: 5px;" aria-hidden="true"></i> ${data.inbox[i].createAt}</span>
                      </div>
                  </li>`
          }
          else{
            html+= `<li class="you">
                      <figure><img src="${data.userSelect.image}" alt=""></figure>
                      <div class="text-box">
                          <p>
                          ${data.inbox[i].icon ? `<span><img src="${data.inbox[i].icon}" alt=""></span>` : `${data.inbox[i].message}`}            
                          ${data.inbox[i].file ? `<span><img src="/upload/${data.inbox[i].file}" alt=""></span>` : ''}
                          </p>
                          <span><i class="fa fa-check" style="margin: 5px 0px;" aria-hidden="true"></i><i class="fa fa-check" style="margin: 5px;" aria-hidden="true"></i> ${data.inbox[i].createAt}</span>
                      </div>
                  </li>`
          }
        }
        
        $('.audio-call-user').attr('url',`/video/${data.userSelect._id}`);
        $('.video-call-user').attr('url',`/video/${data.userSelect._id}`);
        document.querySelector('.conversations').innerHTML = html;
        document.querySelector('.conversations').scrollTop = document.querySelector('.conversations').scrollHeight;
        //listen event keyboard
        $('#input_message_chat').focus(function(){
          socket.emit('keyboard',selectedFriend._id)
        })
        //emit online or offline
        socket.emit('statusUser',selectedFriend._id)
        //listen online or offline
        socket.on('statusUser',function(data){
          console.log(data)
          if(data){
            $('#status_user').text('Online')
          }
          else{
            $('#status_user').text('Offline')
          }
        }
        )
      });
  })
}
getlistUserChat()
  //submit inbox
  document.getElementById('form_submit_message').addEventListener('submit',function(e){
    e.preventDefault();
    var input = document.getElementById('send_image_inbox');
    var form = new FormData();
    form.append('image',input.files[0])
    form.append('message',e.target.message.value);
    form.append('icon',e.target.icon.value);
    let currentTime = new Date();
    form.append('createAt',`${currentTime.getHours()}:${currentTime.getMinutes()}`);
    upload(form);
    e.target.reset();
    e.target.icon.value = ''
  })
  //submit search friends
  $('#search_user_me').keydown(function(e){
    let value = e.target.value.trim();
    console.log(value)
    $.ajax({
      method: "GET",
      url: `/searchFriend?q=${value}`,
      async: false
    })
      .done(function(data) {
          socket.emit('getlistUserOnline',window.currentUser.id);
          let listfriends = window.currentUser.friends;
          let html = ``;
          let listFriends = data.users;
          listFriends = data.users.reduce(function(rs,user){
            if(listfriends.indexOf(user._id) != -1)
                return rs.concat(user);
            return rs    
        },[])
          var listOnline
          socket.on('userOnline',function(data){
              listOnline = [...data];
              listFriends.forEach(friend => {
                  let isOnline = (listOnline.findIndex(e=>e.toString() == friend._id.toString())) != -1 ? true : false ;
                  html += ` <li  class="nav-item unread ">
                                <div data-id="${ friend._id }" style="position: absolute;top: 0;left: 0;width: 100%;height: 100%;z-index: 1000;cursor: pointer;" class="overlay_userchat item_user_chat"></div>
                                <a  class="active item_user_chat"  data-toggle="tab">
                                    <figure><img src="${friend.image}" alt="">
                                        <span class="status f-online"></span>
                                    </figure>
                                    <div class="user-name">
                                        <h6 class="">${friend.username}</h6>
                                        <span>${isOnline? 'Đang Online': 'Đã Offline'}</span>
                                    </div>
                                </a>
                            </li>`
              });
              $(".list_item_user_chat_me").html(html);
          getlistUserChat()    
          })
      }); 
  
  })
  
  //real time message
  socket.on("messageReceived",function(messageObj){
    if(selectedFriend != null && messageObj.from.toString() == selectedFriend._id.toString()){
      let html = `<li class="you">
                    <figure><img src="${selectedFriend.image}" alt=""></figure>
                    <div class="text-box">
                        <p>
                        ${messageObj.icon ? `<span><img src="${messageObj.icon}" alt=""></span>` : `${messageObj.message}`}            
                        ${messageObj.file ? `<span><img src="/upload/${messageObj.file}" alt=""></span>` : ''}
                        </p>
                        <span><i class="fa fa-check" style="margin: 5px 0px;" aria-hidden="true"></i><i class="fa fa-check" style="margin: 5px;" aria-hidden="true"></i> ${messageObj.createAt}</span>
                    </div>
                </li>`
        document.querySelector('.conversations').innerHTML += html;
        $('.type_animation').remove();
        document.querySelector('.conversations').scrollTop = document.querySelector('.conversations').scrollHeight;         
    }
  })
  //listen keyboard 
  socket.on("keyboardReceived",function(){
    if(selectedFriend != null){
        let html = `<li class="you type_animation">
                            <figure><img src="${selectedFriend.image}" alt=""></figure>
                            <div class="text-box">
                                <div class="wave">
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                                    <span class="dot"></span>
                                </div>
                            </div>
                        </li>`
        let type_animate = $('.type_animation')
        if(type_animate.length <1){
          document.querySelector('.conversations').innerHTML += html;
        }
        document.querySelector('.conversations').scrollTop = document.querySelector('.conversations').scrollHeight;         
    }
  })
  
})
var header = {
  headers :{
    "content-type": "multipart/form-data"
  }
}
const upload = (file) => {
  let id = $('.messenger').attr("data-id");
  axios.post(`/sendMessage/${id}`, file, header)
  .then(function (response) {
        let html = `<li class="me">
                  <figure><img src="${window.currentUser.image}" alt=""></figure>
                  <div class="text-box">
                      <p>
                      ${response.data.inbox.icon ? `<span><img src="${response.data.inbox.icon}" alt=""></span>` : `${response.data.inbox.message}`}            
                      ${response.data.inbox.file ? `<span><img src="/upload/${response.data.inbox.file}" alt=""></span>` : ''}
                      </p>
                      <span><i class="fa fa-check" style="margin: 5px 0px;" aria-hidden="true"></i><i class="fa fa-check" style="margin: 5px;" aria-hidden="true"></i> ${response.data.inbox.createAt}</span>
                  </div>
              </li>`
          $('.conversations').append(html);
          document.querySelector('.conversations').scrollTop = document.querySelector('.conversations').scrollHeight;
          // emit message
          socket.emit('sendMessage',{
            messageObj: response.data.inbox,
            receiver: response.data.receiver,
            sender: response.data.sender
          })
          // emit notifycation message
          socket.emit('message-Notifycation',{
            messageObj: response.data.inbox,
            receiver: response.data.receiver,
            sender: response.data.sender
          })
  })
  .catch(function (error) {
    console.log(error);
  });
};

//call video chat
socket.on('receiver-video',function(data){
  $('.image_user_call').attr('src',data.sender.image);
  $('.username_call').text(data.sender.username);
  $('.accept-call').attr('href',`/videoCall/${data.sender.id}`);
  $('.call-wraper').addClass('active'); 
})


