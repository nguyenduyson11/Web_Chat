document.addEventListener('DOMContentLoaded',function(){
  var nut = document.getElementsByClassName('nut');
  var den = document.getElementsByClassName('den');
  var ls = document.getElementsByClassName('left-sidebar-small');
  var l = document.getElementsByClassName('left-sidebar');
  var rnut = document.getElementsByClassName('right-nut');
  var rden = document.getElementsByClassName('right-den');
  var rs = document.getElementsByClassName('right-sidebar-small');
  var r = document.getElementsByClassName('right-sidebar');
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
function hienComment(evt) {
  var nutcmt = document.getElementsByClassName('nut-cmt');
  for (i = 0; i < nutcmt.length; i++) {
      nutcmt[i].className = nutcmt[i].className.replace(" da-click", "");
  }
  evt.currentTarget.className += " da-click";
  for (let i = 0; i < nutcmt.length; i++) {
      console.log(nutcmt[i].className);
      if(nutcmt[i].className == "post-icon nut-cmt da-click"){
          var x = i;
      }
  }
  var cmt = document.getElementsByClassName('comment-form');
  cmt[x].classList.toggle('hien-cmt');
}
function openPost(evt, cityName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}