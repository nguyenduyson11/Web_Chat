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
    let html =``
    for(let data of inboxs){
        html+= `<li class="list-group-item right-menu-item">
                        <div class="user">
                            <img src="${data.avatar}" alt="">
                        </div>
                        <div class="name">
                            <a href="#"><strong class="username">${data.username}</strong></a>
                            <p class="status friend">${data.message}</p>
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
                                <p class="status"> ${isOnline ? 'ĐANG HOẠT ĐỘNG': ''}  </p>
                            </div>
                            <div class="more"><i class="fas fa-ellipsis-h"></i>
                                <div class="right-big-list-icon-item">
                                    <a href=""><i class="fas fa-comment-dots"></i></a>
                                    <a href=""><i class="fas fa-comments"></i></a>
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


