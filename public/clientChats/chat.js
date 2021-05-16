$(document).ready(function(){
  const socket = io("http://localhost:3000");
  $('.image_icon').click(function(e){{
    $('#file_image_icon').val(e.target.getAttribute('src'))
      $('#input_message_chat').val(e.target.getAttribute('alt'))
  }})
  $('.item_user_chat').click(function(e){
    document.querySelector('.tab-pane').classList.add('show');
    $.ajax({
      method: "GET",
      url: `/friends/${e.target.getAttribute('data-id')}`,
    })
      .done(function(data) {
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
        document.querySelector('.conversations').innerHTML = html;
        document.querySelector('.conversations').scrollTop = document.querySelector('.conversations').scrollHeight;
        
      });
  })
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
    console.log(response.data)
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
  })
  .catch(function (error) {
    console.log(error);
  });
};
