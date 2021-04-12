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
  $('.comment').on('click', function () {
      $(this).parents(".post-meta").siblings(".coment-area").toggle("normal");
  })
})
//post-comment
// jQuery(".post-comt-box textarea").on("keydown", function(event) {

// 	if (event.keyCode == 13) {
// 		var comment = jQuery(this).val();
// 		var parent = jQuery(".showmore").parent("li");
// 		var comment_HTML = '<li style="display: inline-block;"><div class="comet-avatar"><img alt="" src="img/avt-04.webp"></div><div class="we-comment"><h5><a title="" href="time-line.html">Nguyễn Lương Cảnh</a></h5><p>'+comment+'</p><div class="inline-itms"><a title="Reply" href="#" class="we-reply"><i class="fa fa-reply"></i><span>0</span></a><a title="" href="#"><i class="fa fa-heart"></i><span>0</span></a></div></div></li>';
// 		$(comment_HTML).insertBefore(parent);
// 		jQuery(this).val('');
// 	}
// }); 
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
$('.edit-post').on('click', function () {
    $('.popup-wraper4').addClass('active');
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
//
//updaload file
const imagePrivew = document.querySelector('.file_image-wrap');
const input_file = document.querySelector('input[name="fileImage"]');
var list_closeimage = $('.icon_close_img');
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
        console.log(input_file.files)
        input_file.value = '';
        console.log(input_file.files)
        $('.file_image-wrap').html('');
        this.style.display = 'none';
    })
}
///---------------------

//send post
document.querySelector('#post_new').addEventListener('submit',function(e){
    e.preventDefault();
    var content = document.querySelector('#content_post');
    var fileImage = document.querySelector('#fileImage').files;
    var formData = new FormData();
    formData.append('content',content.value);
    //upload file
    for(let i= 0; i<fileImage.length; i++){
        formData.append('fileImage',fileImage[i]);
    }
    var contenttype = {
        headers : {
            'content-type' : 'multipart/form-data'
        }
    }
    axios.post('/posts/new', formData)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
    //end upload file
    $('.file_image-wrap').html('');
    content.value = '';
    icon_close_images.style.display = 'none';
})
//send comment
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
        console.log('Success:', data);
        })
        .catch((error) => {
        console.error('Error:', error);
        });
        e.target[0].value = '';
    })
}
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
            $('#staticBackdrop').modal('show')
            
        })
        .catch((error) => {
            content_mesage.innerHTML = 'Báo cáo bài viết thất bại ';
            btn_acvited_model.click();
        });
})
//heart post
$('.heart_post').click(function(e){
    let id_post = e.target.getAttribute('data-id');
    console.log(id_post);
    e.target.classList.toggle('active_heart');
    fetch(`/posts/${id_post}/heart/edit`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
        })
        .catch((error) => {
            console.log(error)
        });
})

