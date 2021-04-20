
const socket = io("http://localhost:3000");

document.addEventListener('DOMContentLoaded',function(){
  var nut = document.getElementsByClassName('nut');
  var den = document.getElementsByClassName('den');
  var ls = document.getElementsByClassName('left-sidebar-small');
  var l = document.getElementsByClassName('left-sidebar');
  var rnut = document.getElementsByClassName('right-nut');
  var rden = document.getElementsByClassName('right-den');
  var rs = document.getElementsByClassName('right-sidebar-small');
  var r = document.getElementsByClassName('right-sidebar');
  //da sua
  var seek = document.getElementsByClassName('seek');
  var sf =document.getElementsByClassName('seek-form');
  var inform = document.getElementsByClassName('inform');
  var informres = document.getElementsByClassName('inform-res')
  inform[0].onclick = function(){
      informres[0].classList.toggle('hien-res');
      informres[1].classList.remove('hien-res');
      informres[2].classList.remove('hien-res');
      sf[0].classList.remove('hien-res');
      l[0].classList.remove('open-left');
      l[0].classList.add('close-left');
      r[0].classList.remove('open-right');
      r[0].classList.add('close-right');
      rs[0].classList.remove('close-right-small');
      rs[0].classList.add('open-right-small');
      ls[0].classList.remove('close-left-small');
      ls[0].classList.add('open-left-small');
  }
  inform[1].onclick = function(){
      informres[1].classList.toggle('hien-res');
      informres[0].classList.remove('hien-res');
      informres[2].classList.remove('hien-res');
      sf[0].classList.remove('hien-res');
      l[0].classList.remove('open-left');
      l[0].classList.add('close-left');
      r[0].classList.remove('open-right');
      r[0].classList.add('close-right');
      rs[0].classList.remove('close-right-small');
      rs[0].classList.add('open-right-small');
      ls[0].classList.remove('close-left-small');
      ls[0].classList.add('open-left-small');
  }
  inform[2].onclick = function(){
      informres[2].classList.toggle('hien-res');
      informres[1].classList.remove('hien-res');
      informres[0].classList.remove('hien-res');
      sf[0].classList.remove('hien-res');
      l[0].classList.remove('open-left');
      l[0].classList.add('close-left');
      r[0].classList.remove('open-right');
      r[0].classList.add('close-right');
      rs[0].classList.remove('close-right-small');
      rs[0].classList.add('open-right-small');
      ls[0].classList.remove('close-left-small');
      ls[0].classList.add('open-left-small');
  }
  seek[0].onclick = function(){
      sf[0].classList.toggle('hien-res');
      informres[0].classList.remove('hien-res');
      informres[1].classList.remove('hien-res');
      informres[2].classList.remove('hien-res');
      l[0].classList.remove('open-left');
      l[0].classList.add('close-left');
      r[0].classList.remove('open-right');
      r[0].classList.add('close-right');
      rs[0].classList.remove('close-right-small');
      rs[0].classList.add('open-right-small');
      ls[0].classList.remove('close-left-small');
      ls[0].classList.add('open-left-small');
  }
  //het sua
  nut[0].onclick = function(){
      ls[0].classList.remove('stop');
      ls[0].classList.add('close-left-small');
      ls[0].classList.remove('open-left-small');
      l[0].classList.remove('close-left');
      l[0].classList.add('open-left');
      l[0].classList.remove('hiden-left-sidebar');
      rs[0].classList.remove('close-right-small');
      rs[0].classList.add('open-right-small');
      r[0].classList.remove('open-right');
      r[0].classList.add('close-right');
  }
  nut[1].onclick = function(){
      ls[0].classList.remove('stop');
      ls[0].classList.add('close-left-small');
      ls[0].classList.remove('open-left-small');
      l[0].classList.remove('close-left');
      l[0].classList.add('open-left');
      l[0].classList.remove('hiden-left-sidebar');
      rs[0].classList.remove('close-right-small');
      rs[0].classList.add('open-right-small');
      r[0].classList.remove('open-right');
      r[0].classList.add('close-right');
  }
  den[0].onclick = function(){
      ls[0].classList.remove('stop');
      ls[0].classList.remove('close-left-small');
      ls[0].classList.add('open-left-small');
      l[0].classList.remove('open-left');
      l[0].classList.add('close-left');
  }
  rnut[0].onclick = function(){
      rs[0].classList.remove('stop');
      rs[0].classList.add('close-right-small');
      rs[0].classList.remove('open-right-small');
      r[0].classList.remove('close-right');
      r[0].classList.add('open-right');
      r[0].classList.remove('hiden-right-sidebar');
      ls[0].classList.remove('close-left-small');
      ls[0].classList.add('open-left-small');
      l[0].classList.remove('open-left');
      l[0].classList.add('close-left');
  }
  rnut[1].onclick = function(){
      rs[0].classList.remove('stop');
      rs[0].classList.add('close-right-small');
      rs[0].classList.remove('open-right-small');
      r[0].classList.remove('close-right');
      r[0].classList.add('open-right');
      r[0].classList.remove('hiden-right-sidebar');
      ls[0].classList.remove('close-left-small');
      ls[0].classList.add('open-left-small');
      l[0].classList.remove('open-left');
      l[0].classList.add('close-left');
  }
  rden[0].onclick = function(){
      rs[0].classList.remove('stop');
      rs[0].classList.remove('close-right-small');
      rs[0].classList.add('open-right-small');
      r[0].classList.remove('open-right');
      r[0].classList.add('close-right');
  }
},false)



//show comment
$(function(){
  $('.comment').on('click', function (e) {
      $(this).parents(".post-meta").siblings(".coment-area").toggle("normal");
  })
})

//hien them comment
$(function(){
  $('li.showmore').on('click', function () {
      console.log($(this).siblings());
      $(this).siblings().slice(2,4).show("normal");
  })
})
//hien them bai viet
$(function () {
  $(".loadMore .central-meta, .postbox").slice(0, 3).show();
  $(".btn-load-more").on('click', function (e) {
      $(".loadMore .central-meta:hidden").slice(0, 2).show("normal");
      if($(".loadMore .central-meta:hidden").length == 0){
          $(".btn-load-more").hide("fast");
          $(".btn-to-back").fadeIn();
      }
  });
});
// ve dau trang
$('.btn-to-back').click(function () {
  $('body,html').animate({
      scrollTop: 0
  }, 600);
  $(".loadMore .central-meta, .postbox").slice(3,$(".loadMore .central-meta, .postbox").length).hide(1000);
  $(".btn-to-back").fadeOut(1000);
  $(".btn-load-more").show();
});
//chia sẻ
$('.share-pst').on('click', function () {
	$('.popup-wraper2').addClass('active');
	return false;
});
	$('.popup-closed, .cancel').on('click', function () {
	$('.popup-wraper2').removeClass('active');
});

//báo cáo bài đăng
$('.bad-report').on('click', function (e) {
    console.log(e.target.getAttribute("data-id"));
    $('#input_idpost').val(e.target.getAttribute("data-id"));
    $('.popup-wraper3').addClass('active');
    return false;
});
$('.popup-closed, .cancel').on('click', function () {
    $('.popup-wraper3').removeClass('active');
    return false;
});	

$(function(){
    $('.we-reply').on('click', function () {
        $(this).parents(".inline-itms").siblings(".sub-comet").toggle("normal");
    })
})
//chỉnh sửa bài đăng
$('.edit-post').on('click', function (e) {
    $('.popup-wraper4').addClass('active');
    console.log(e.target.getAttribute('data-id'));
    return false;
});
$('.popup-closed, .cancel').on('click', function () {
    $('.popup-wraper4').removeClass('active');
    return false;
});

$(function(){
    $(".popup-img-closed").on('click', function () {
        $(this).parents(".edit-pst ~ .col-6").remove();
    })
})
// $(window).scroll(function () {
//     if ($(this).scrollTop() > 50) {
//         $('.totop a').fadeIn();
//     } else {
//         $('.totop a').fadeOut();
//     }
// });
//modal
const content_mesage = document.querySelector('#content_mesage');
 const btn_acvited_model = document.querySelector('#btn_acvited_model');
 var list_hearts = $('.heart_post');
//
//updaload file
const imagePrivew = document.querySelector('.file_image-wrap');
const input_file = document.querySelector('input[name="fileImage"]');
var list_closeimage = $('.icon_close_img');
let userCurrent = $('#id_user').val()
input_file.addEventListener('change', function(){
    if(this.files){
        var html='';
        for (const file of this.files) {
           let  html_image = `<div id="previewImage" class="previewImage" >
            <img src="${URL.createObjectURL(file)}" alt="" width="100px" height="100px" >
         </div>`
           html =  html.concat(html_image)
          }
        $('.file_image-wrap').html(html)
    }
    document.querySelector('.icon_close_images').style.display = 'block';
})
let icon_close_images =  document.querySelector('.icon_close_images')
if(icon_close_images){
    icon_close_images.addEventListener('click',function(){
        input_file.value = '';
        $('.file_image-wrap').html('');
        this.style.display = 'none';
    })
}
//get userCurrent
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
      }
    }); 
// report  post
document.getElementById('form_repost_post').addEventListener('submit',function(e){
    e.preventDefault();
    const data = { 
        title: $("input[name='radio_report']:checked").val(),
        content: $('#content_report').val() 
    };
    let id_post = $('#input_idpost').val();
    fetch(`/posts/${id_post}/reports/new`, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            $('.popup-wraper3').removeClass('active');
            content_mesage.innerHTML = data.message;
            $('#staticBackdrop').modal('show')
            
        })
        .catch((error) => {
            $('.popup-wraper3').removeClass('active');
            content_mesage.innerHTML = 'Báo cáo bài viết thất bại ';
            btn_acvited_model.click();
        });
    e.target[0].value = '';
})
// delete post
 $('.remove_post').click(function(e){
    if(confirm('bạn có thực sự muốn xóa bài biết')){
        let id_post = e.target.getAttribute('data-id');
    fetch(`/posts/${id_post}/destroy`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(data => {
            content_mesage.innerHTML = data.message;
            $('#staticBackdrop').modal('show');
            $(`#post-${data.result}`).remove();
        })
        .catch((error) => {
            content_mesage.innerHTML = 'Báo cáo bài viết thất bại ';
            btn_acvited_model.click();
        });
    }
    
})
//heart post
const heartPost = function(list_hearts){
    list_hearts.click(function(e){
        let id_post = e.target.getAttribute('data-id');
        e.target.classList.toggle('active_heart');
        fetch(`/posts/${id_post}/heart/edit`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => response.json())
            .then(data => {
                $('.count_hearts').text(data.countHeart)
            })
            .catch((error) => {
                console.log(error)
            });
    })
} 
heartPost(list_hearts)

//delete comment
function deleteComment(commentId,postId,rule){
    fetch(`/posts/${postId}/comments/${commentId}/destroy`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rule)
        })
        .then(response => response.json())
        .then(data => {
            socket.emit('remove-comment',data);
            $(`#comment-${data.result}`).remove();
            $(`#hearts-${data.post._id}`).text(data.post.comment.length)
            
        })
        .catch((error) => {
            console.log(error)
        });
}
$('.icon_remove_comment').click(function(e){
    let data_id = e.target.getAttribute('data-id')
    let post_id = e.target.getAttribute('post-id')
    let rule = {
        rule: e.target.getAttribute('data-rule')
    }
    deleteComment(data_id,post_id,rule)
})


//post comment
var forms = document.querySelectorAll('.post_coment__new');
for(let i=0;i<forms.length;i++){
    forms[i].addEventListener('submit',async function(e){
        e.preventDefault();
        const data = { content: e.target[0].value };

        fetch(e.target.action, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
        socket.emit('new-comment',data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
        e.target[0].value = '';
})
}
socket.on('new-comment',function(data){
    let html = `<li id="comment-${data.comment._id}" style="display: inline-block;">
                    <div class="comet-avatar">
                        <img src="${data.user.image}" alt="">
                    </div>
                    <div class="we-comment">
                        ${(userCurrent.toString() == data.comment.author.toString()) ? `<i class="fas fa-times icon_remove_comment icon_remove_comment_new" data-rule='parent' data-id="${data.comment._id}" post-id="${data.post._id}"></i>` : ''}
                        <h5><a href="time-line.html" title="">${data.user.username}</a></h5>
                        <p>${ data.comment.content }</p>
                        <div class="inline-itms inline-itms-new">
                            <a id="reply-${data.comment._id}" class=" we-reply" href="#" title="Reply"><i class="fa fa-reply"></i><span id="count_subc-${data.comment._id}">${data.comment.subComment.length }</span</a>
                            <a href="#" title=""><i class="fa fa-heart"></i><span>${data.comment.hearts.length }</span></a>
                        </div>
                        <ul id="sub_comment-${data.comment._id}" class="we-comet sub-comet sub-comet-new">
                            <li class="post-comment sub-post" style="display: inline-block;">
                                <div class="comet-avatar">
                                    <img src="${ data.user.image }" alt="">
                                </div>
                                <div class="post-comt-box">
                                    <form class="post_subcoment_new post_subcoment_new-ajax" method="post" action="posts/${data.post._id}/subcomment/new" data-id="${data.comment._id}">
                                        <textarea name="content" placeholder="Viết bình luận..."></textarea>
                                        
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
    $(`#commentofPost-${data.post._id}`).prepend(html);
    $(`#hearts-${data.post._id}`).text(data.countPost)
    $('.icon_remove_comment_new').click(function(e){
        
        let data_id = e.target.getAttribute('data-id')
        let post_id = e.target.getAttribute('post-id')
        let rule = {
            rule: e.target.getAttribute('data-rule')
        }
        deleteComment(data_id,post_id,rule)
    })
    $(function(){
        $(`#reply-${data.comment._id}`).on('click', function () {
            $(this).parents(".inline-itms-new").siblings(".sub-comet-new").toggle("normal");
        })
    }) 
    let formsSub = document.querySelectorAll('.post_subcoment_new-ajax');
    for(let i=0;i<formsSub.length;i++){
        formsSub[i].addEventListener('submit',async function(e){
            e.preventDefault();
            const data = { 
                content: e.target[0].value,
                comment_id: e.target.getAttribute('data-id')
            };
            fetch(e.target.action, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
            })
            .then(response => response.json())
            .then(data => {
                socket.emit('new-subcomment',data)
            })
            .catch((error) => {
                console.log(error)
            });
            e.target[0].value = '';
    })
}
})

socket.on('remove-comment',function(data){
    $(`#comment-${data.result}`).remove();
    $(`#hearts-${data.post._id}`).text(data.post.comment.length )
})

//post subcomment
var formsSub = document.querySelectorAll('.post_subcoment_new');
for(let i=0;i<formsSub.length;i++){
    formsSub[i].addEventListener('submit',async function(e){
        e.preventDefault();
        const data = { 
            content: e.target[0].value,
            comment_id: e.target.getAttribute('data-id')
         };
        fetch(e.target.action, {
        method: 'POST', // or 'PUT'
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            socket.emit('new-subcomment',data)
        })
        .catch((error) => {
            console.log(error)
        });
        e.target[0].value = '';
})
}
socket.on('new-subcomment',function(data){
    let html = `<li style="display: inline-block;position: relative;" id="comment-${data.subcomment._id}">
    ${(userCurrent.toString() == data.user._id.toString()) ? `<i class="fas fa-times icon_remove_subcomment icon_remove_subcomment_new " data-sub="${data.subcomment._id}" post-id="${data.post._id}" data-id="${data.comment._id}"></i>` : ''}
                    <div class="comet-avatar">
                        <img src="${ data.user.image }" alt="">
                    </div>
                    <div class="we-comment">
                        <h5><a href="time-line.html" title="">${ data.user.username }</a></h5>
                        <p>${ data.subcomment.content }</p>
                        <div class="inline-itms">
                            <a href="#" title=""><i class="fa fa-heart"></i><span>${ data.subcomment.hearts.length }</span></a>
                        </div>
                    </div>
                </li>`       
    $(`#sub_comment-${data.comment._id}`).prepend(html);
    $(`#count_subc-${data.comment._id}`).text(data.countsubcomment)
    $('.icon_remove_subcomment_new').click(function(e){
        let data_id = e.target.getAttribute('data-id')
        let post_id = e.target.getAttribute('post-id')
        let rule = {
            rule: e.target.getAttribute('data-sub')
        }
        fetch(`/posts/${post_id}/comments/${data_id}/destroy`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(rule)
            })
            .then(response => response.json())
            .then(data => {
                socket.emit('remove-subcomment_fetch',data);
                
            })
            .catch((error) => {
                content_mesage.innerHTML = 'bài viết đã bị xóa hoặc không tồn tại ';
                btn_acvited_model.click();
            });
    })
})

// remove subcomment
$('.icon_remove_subcomment').click(function(e){
    let data_id = e.target.getAttribute('data-id')
    let post_id = e.target.getAttribute('post-id')
    let rule = {
        rule: e.target.getAttribute('data-sub')
    }
    fetch(`/posts/${post_id}/comments/${data_id}/destroy`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(rule)
        })
        .then(response => response.json())
        .then(data => {
            socket.emit('remove-subcomment',data);
            // $(`#hearts-${data.post._id}`).text(data.post.comment.length )
            
        })
        .catch((error) => {
            content_mesage.innerHTML = 'bài viết đã bị xóa hoặc không tồn tại ';
            btn_acvited_model.click();
        });
})
socket.on('remove-subcomment',function(data){
    $(`#comment-${data.result}`).remove();
    let count = (data.commentParent.subComment.length -1) > 0 ? data.commentParent.subComment.length -1 : 0
    $(`#count_subc-${data.commentParent._id}`).text(count)
})
socket.on('remove-subcomment_fetch',function(data){
    $(`#comment-${data.result}`).remove();
    let count = (data.commentParent.subComment.length -1) > 0 ? data.commentParent.subComment.length -1 : 0
    $(`#count_subc-${data.commentParent._id}`).text(count )
})
//heart comment
const heartSubcomment = function(list){
    
    list.click(function(e){
        e.preventDefault()
        let id_comment = e.target.getAttribute('data-id');
        e.target.classList.toggle('active_heart');
        fetch(`/comments/${id_comment}/heart/edit`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            })
            .then(response => response.json())
            .then(data => {
                $(`#heartComment-${data.commentId}`).text(data.countHeart)
                // e.target.textContent = data.countHeart
                
            })
            .catch((error) => {
                console.log(error)
            });
    })
} 
heartSubcomment($('.heart-comment'))
//update post
$('.edit-post').click(function(e){
    let id_post = e.target.getAttribute('data-id');
    $.ajax({
        method: "GET",
        url: `/posts/${id_post}`,
        async: false
    })
    .done(function(data) {
        if(data.status =='oke'){
            $('#input_post_edit').val(data.post.content);
            $('#form_submit_editPost').attr('action', `/posts/${data.post._id}/edit?_method=PATCH`);
            for(image of data.post.images){
                console.log(image)
                let html =`<div >
                            <img style="object-fit: cover;" src="/upload/${image}" alt="">
                        </div>`
                $('#wrap_image_edit').append(html)
            }
            let input_files_edit = document.querySelector('input[name="file_image_edit"]');
            input_files_edit.addEventListener('change', function(){
                if(this.files){
                    let html='';
                    for (const file of this.files) {
                       let  html_image = `<div >
                                            <img style="object-fit: cover;" src="${URL.createObjectURL(file)}" alt="">
                                        </div>`
                       html =  html.concat(html_image)
                      }
                    $('#wrap_image_edit').html(html)
                }
            })            
        }
    });
})

//search friends
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
                                <a href="/user/${user._id}"><strong class="username">${user.username}</strong></a>
                                <p class="status friend">20 bạn chung</p>
                            </div>
                        </li>`
            }).join('')           
            $('#list_friends_search').html(html)
        }); 
})

