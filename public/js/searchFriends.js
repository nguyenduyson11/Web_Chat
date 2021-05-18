$('#search_friends').keydown(function(e){
  let value = e.target.value.trim()
  $.ajax({
      method: "GET",
      url: `/searchFriend?q=${value}`,
      async: false
    })
      .done(function(data) {
          let html = data.users.map(function(user){
              return `<li class="list-group-item right-menu-item">
                          <div class="user">
                              <img src="${user.image}" alt="">
                          </div>
                          <div class="name">
                              <a href="/profile/${user._id}"><strong class="username">${user.username}</strong></a>
                              <p class="status friend">21 bạn chung</p>
                          </div>
                      </li>`
          }).join('')           
          $('#list_friends_search').html(html)
      }); 
})

// get list message
if(window.currentUser){
    let listInbox = window.currentUser.inbox
    let inboxs = listInbox.map((data)=>{
        return data.inbox.pop();
    })
    inboxs = inboxs.sort((a,b)=>{
        return (b.createDate - a.createDate); 
    })
    let html =``;
    for(let data of inboxs){
        html+= `<li id="${data.from}" class="list-group-item right-menu-item">
                        <div class="user">
                            <img src="${data.avatar}" alt="">
                        </div>
                        <div class="name">
                            <a href="#"><strong class="username">${data.username}</strong></a>
                            
                            <p id="content-${data.from}" class="status friend"> ${(data.icon || data.file) ? 'Gửi một hình ảnh' : `${data.message}` }</p>
                        </div>
                        <div></div>
                        <i class="far fa-comments" style="color: #9899a4;"></i>
                    </li>`
    }
    $(html).insertAfter("li.title_info_message")


}
//get list user online
$.ajax({
    method: "GET",
    url: `/getListFriends`,
    async: false
  })
    .done(function(data) {
        socket.emit('getlistUserOnline',window.currentUser.id);
        let html = ``;
        let html2 =``;
        let listFriends = data;
        var listOnline
        socket.on('userOnline',function(data){
            listOnline = [...data];
            listFriends.forEach(friend => {
                let isOnline = (listOnline.findIndex(e=>e.toString() == friend._id.toString())) != -1 ? true : false ;
                html += `<li class="right-menu-item">
                            <div class="user">
                                <img src="${friend.image}" alt="">
                                <div class="${isOnline ? 'status-online': 'status-busy'}"></div>
                            </div>
                            <div class="name">
                                <a href="/profile/${friend._id}"><strong class="username">${friend.username}</strong></a>
                                <p class="status"> ${isOnline ? 'ĐANG HOẠT ĐỘNG': 'NGOẠI TUYẾN'}  </p>
                            </div>
                            <div class="more"><i class="fas fa-ellipsis-h"></i>
                                <div class="right-big-list-icon-item">
                                    <a href="/messages"><i class="fas fa-comment-dots"></i></a>
                                    <a href="/messages"><i class="fas fa-comments"></i></a>
                                    <a href=""><i class="fas fa-comment-slash"></i></a>
                                </div>
                            </div>
                        </li>`
                html2 += `<li>
                            <div class="user">
                                <img src="${friend.image}" alt="">
                                <div class="${isOnline ? 'status-online': 'status-busy'}"></div>
                            </div>
                        </li>`
            });
            $(html).insertAfter("li.title_list_Friends")
            $('#list_user_friends').html(html2);
        })
    }); 

//listen notifycation inbox
socket.on('message-Notifycation',function(data){
    console.log(data)
    let html = `<li class="list-group-item right-menu-item">
                    <div class="user">
                        <img src="${data.sender.image}" alt="">
                    </div>
                    <div class="name">
                        <a href="#"><strong class="username">${data.sender.username}</strong></a>
                        
                        <p id="content-${data.messageObj._id}" class="status friend"> ${(data.messageObj.icon || data.messageObj.file) ? 'Gửi một hình ảnh' : `${data.messageObj.message}` }</p>
                    </div>
                    <div></div>
                    <i class="far fa-comments" style="color: #9899a4;"></i>
                </li>`
    if( !$(`#${data.sender._id}`)){
        $(html).insertAfter("li.title_info_message")
    }
    else{
        console.log(data.sender._id)
        $(`#content-${data.sender._id}`).text(data.messageObj.message)
    }
    $('#count_inbox').text(1)            
            
})
// search list friends right bar
$('.right-edit-input').keydown(function(e){
    let value = e.target.value.trim()
    $.ajax({
        method: "GET",
        url: `/searchFriend?q=${value}`,
        async: false
      })
        .done(function(data) {
            console.log(data)
            let listFriends = window.currentUser.friends;
            let results = data.users.map(function(user){
                if(listFriends.indexOf(user._id) != -1)
                    return user;
            })
            let html =`<li class="title title_list_Friends">
                        <div class="subtitle"><a href="#">BẠN THÂN</a></div>
                        <div class="setting"><a href="#">CÀI ĐẶT</a></div>
                      </li>`;
            results.forEach(function(friend){
                html += `<li class="right-menu-item">
                                <div class="user">
                                    <img src="${friend.image}" alt="">
                                    <div class="status-online"></div>
                                </div>
                                <div class="name">
                                    <a href="/profile/${friend._id}"><strong class="username">${friend.username}</strong></a>
                                    <p class="status">ĐANG HOẠT ĐỘNG</p>
                                </div>
                                <div class="more"><i class="fas fa-ellipsis-h"></i>
                                    <div class="right-big-list-icon-item">
                                        <a href="/messages"><i class="fas fa-comment-dots"></i></a>
                                        <a href="/messages"><i class="fas fa-comments"></i></a>
                                        <a href=""><i class="fas fa-comment-slash"></i></a>
                                    </div>
                                </div>
                            </li>`
                            
            })
            $("ul#list_item_friends").html(html)
        }); 
  })

//get list notifycation
$.ajax({
    method: "GET",
    url: `/getListNotifycations`,
    async: false
  })
    .done(function(data) {
        let result;
        let html = ``
        if(data.length > 3){
            result = animals.slice(0,4);
        }
        else{
            result = data;
        }
        result.forEach(function(data){
            html += `<li class="list-group-item right-menu-item">
                    <div class="user">
                        <img src="${data.avatar}" alt="">
                    </div>
                    <div class="name">
                        <a href="/post/${data.type_id}">
                            <p class="notify username">${data.username}<span class="notify-content"> ${data.content}.</span></p>
                        </a>
                    </div>
                    <div></div>
                    <i class="fas fa-bolt" style="color: #9899a4;"></i>
                </li>`   
        })
        $(html).insertAfter("li.list_notify_users")
        
}); 