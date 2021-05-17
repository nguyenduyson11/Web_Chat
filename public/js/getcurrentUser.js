$.ajax({
  method: "GET",
  url: "/getuser",
  async: false
})
  .done(function( data ) {
    window.currentUser = {
        id:data.user._id,
        username: data.user.username,
        image: data.user.image,
        inbox: data.user.messages,
        friends: data.user.friends
    }
  });
