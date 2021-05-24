

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
//post comment
$('.group_post_coment_new').submit(function(e){
  $(".preloader").fadeIn();
  e.preventDefault();
  $.ajax({
    method: "POST",
    url: $('.group_post_coment_new').attr('action'),
    data: { content: $('.content_coment').val()}
  })
    .done(function(data) {
      console.log(data)
      let html  = `<li id="comment-${data.comment.id}" style="display: inline-block;">
                      <div class="comet-avatar">
                          <img src="${data.comment.avatar}" alt="">
                      </div>
                      <div class="we-comment">
                              <i class="fas fa-times icon_remove_comment " url="/group/post/${data.comment.post}/comment/${data.comment.id}/remove"></i>
                          <h5><a href="time-line.html" title="">${data.comment.username}</a></h5>
                          <p>${data.comment.content}</p>
                          <div class="inline-itms">
                              <a class="we-reply" href="#" title="Reply"><i class="fa fa-reply"></i><span id="count_subc-<%= comment._id %>">${ data.comment.child.length }</span</a>
                              <a href="#" title=""><i class="fa fa-heart heart-comment " data-id="<%= comment._id %>" ></i><span id="heartComment-${data.comment._id}"><${data.comment.hearts.length }</span></a>
                          </div>
                          <ul id="sub_comment-${data.comment._id}" class="we-comet sub-comet">
                              <li class="post-comment sub-post" style="display: inline-block;">
                                  <div class="comet-avatar">
                                      <img src="${window.currentUser.image}" alt="">
                                  </div>
                                  <div class="post-comt-box">
                                      <form class="post_subcoment_new" method="post" action="">
                                          <textarea  name="content" placeholder="Viết bình luận..."></textarea>
                                          
                                          <div class="button-post-comt">
                                              <button type="submit"></button>
                                              <i class="fas fa-paper-plane"></i>
                                          </div>
                                      </form>	
                                  </div>
                              </li>
                          </ul>
                      </div>
                  </li>` 
        $('.content_coment').val('');
        console.log(`#commentofPost-${data.comment.post}`);           
       $(`#commentofPost-${data.comment.post}`).prepend(html);
       $(".preloader").fadeOut();
       removeComment();
    });
})
function removeComment(){
  $('.icon_remove_comment').click(function(e){
    $.ajax({
      method: "DELETE",
      url: e.target.getAttribute('url'),
    })
      .done(function(data) {
      if(data.status == 'oke'){
        $(`#comment-${data.comment.id}`).remove()
      }
      }); 
  })
}
removeComment();