$('#search_friends').keydown(function(e){
  let value = e.target.value.trim()
  $.ajax({
      method: "GET",
      url: `/searchFriend?q=${value}`,
      async: false
    })
      .done(function(data) {
          console.log(data)
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
