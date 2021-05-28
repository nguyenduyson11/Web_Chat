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
$('.bad-report').on('click', function () {
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

//hiển thị thêm bạn bè
$(function () {
  $(".friend-block").slice(0, 16).show();
  $(".btn-lod-more").on('click', function (e) {
      $(".friend-block:hidden").slice(0, 8).show("normal");
      if($(".friend-block:hidden").length == 0){
          $(".btn-lod-more").hide("fast");
          $(".btn-to-back").fadeIn();
      }
  });
});
$('.lodmore .btn-to-back').click(function () {
  $('body,html').animate({
      scrollTop: 0
  }, 600);
  $(".friend-block").slice(16,$(".friend-block").length).hide(1000);
  $(".lodmore .btn-to-back").fadeOut(1000);
  $(".btn-lod-more").show();
});
//hien thi them hinh anh
$(function () {
  $(".item-box").slice(0, 12).show();
  $(".lodmore2 .btn-lod-more").on('click', function (e) {
      $(".item-box:hidden").slice(0, 4).show("normal");
      if($(".item-box:hidden").length == 0){
          $(".lodmore2 .btn-lod-more").hide("fast");
          $(".lodmore2 .btn-to-back").fadeIn();
      }
  });
});
$('.lodmore2 .btn-to-back').click(function () {
  $('body,html').animate({
      scrollTop: 0
  }, 600);
  $(".item-box").slice(12,$(".item-box").length).hide(1000);
  $(".lodmore2 .btn-to-back").fadeOut(1000);
  $(".lodmore2 .btn-lod-more").show();
});
//hiển thị thêm nhóm
$(function () {
  $(".group-box").slice(0, 11).show();
  $(".lodmore3 .btn-lod-more").on('click', function (e) {
      $(".group-box:hidden").slice(0, 6).show("normal");
      if($(".group-box:hidden").length == 0){
          $(".lodmore3 .btn-lod-more").hide("fast");
          $(".lodmore3 .btn-to-back").fadeIn();
      }
  });
});
$('.lodmore3 .btn-to-back').click(function () {
  $('body,html').animate({
      scrollTop: 0
  }, 600);
  $(".group-box").slice(11,$(".group-box").length).hide(1000);
  $(".lodmore3 .btn-to-back").fadeOut(1000);
  $(".lodmore3 .btn-lod-more").show();
});
//tạo nhóm
$('.addgroup').on('click', function () {
  $('.popup-wraper4').addClass('active');
  return false;
});
$('.popup-closed').on('click', function () {
  $('.popup-wraper4').removeClass('active');
  return false;
});


//upload image
const input = document.getElementById('file_avatar');
const input2 = document.getElementById('image_Photo_Image');
// This will upload the file after having read it
var header = {
  headers :{
    "content-type": "multipart/form-data"
  }
}
const upload = (file) => {
  axios.post('/user/uploadImage', file, header)
  .then(function (response) {
    console.log(response.data)
    $('#avatar_user').attr({
     "src": response.data.image
    })
  })
  .catch(function (error) {
    console.log(error);
  });
};

// Event handler executed when a file is selected
const onSelectFile = () => {
  var form = new FormData();
  console.log(input.files[0])
  form.append('avatar',input.files[0])
  upload(form);
};

// Add a listener on your input
// It will be triggered when a file will be selected
if(input){
  input.addEventListener('change', onSelectFile, false);
}
if(input2){
  input2.addEventListener('change',function(){
    let  form = new FormData();
    form.append('photoImage',input2.files[0])
    //send request  update photo image
    axios.post('/user/uploadPhotoImage', form, header)
    .then(function (response) {
      console.log(response.data)
      $('#photoImage_user').attr({
       "src": response.data.coverImage
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  })
}
let file_group = document.getElementById('file_group');
if(file_group){
  file_group.addEventListener('change',function(e){
    console.log(e.target.files[0])
    $('#image_choice').attr('src',URL.createObjectURL(e.target.files[0]))
  })
}
//create group 
$('#create_group').click(function(e){
  e.preventDefault()
  let name_group = document.getElementById('name_group');
  let form = new FormData();
  form.append('coverImage',file_group.files[0])
  form.append('name',name_group.value)
  axios.post('/groups/new', form, header)
  .then(function (response) {
    console.log(response)
    if(response.status == 200){
      window.location.href = `/profile/${response.data.user._id}/group`
    }
    else{
      alert('Tạo không thành công')
    }
  })
  .catch(function (error) {
    console.log(error);
  });
})
//


$('.btn_access_group').on('click',function(e){
  window.location.href = `/group/${e.target.getAttribute('data-id')}`
})

function getlistsortGroup(e){
  $(".preloader").fadeIn();
  $.ajax({
    method: "GET",
    url: `/groups/sort?key=${e.value}`,
  })
    .done(function(data) {
      let html =`<div class="col-lg-2 col-md-4 col-sm-4 col-xs-6">
                    <div class="addgroup">
                        <div class="item-upload">
                            <i class="fa fa-plus-circle"></i>
                            <div class="upload-meta">
                                <h5>Tạo nhóm</h5>
                                <span>việc này có thể mất vài giây!</span>
                            </div>
                        </div>
                    </div>
                </div>`;
      data.listGroups.forEach(function(group){
        html += `<div class="col-lg-2 col-md-4 col-sm-4 col-xs-6">
                    <div class="group-box">
                        <figure><img src="${ group.coverImage }" alt=""></figure>
                        <a href="#" title="">${ group.title }</a>
                        <span>${ group.members.length} thành viên</span>
                        <button class="btn_access_group" data-id="${ group._id }">Truy cập nhóm</button>
                    </div>
                </div>`
      })
      $(".preloader").fadeOut();
      $('.group_lists_items').html(html)
      $('.btn_access_group').on('click',function(e){
        window.location.href = `/group/${e.target.getAttribute('data-id')}`
      })
      $(function () {
        $(".group-box").slice(0, 11).show();
        $(".lodmore3 .btn-lod-more").on('click', function (e) {
            $(".group-box:hidden").slice(0, 6).show("normal");
            if($(".group-box:hidden").length == 0){
                $(".lodmore3 .btn-lod-more").hide("fast");
                $(".lodmore3 .btn-to-back").fadeIn();
            }
        });
      });
    }); 
}
