

function getUsercall(){
  $.ajax({
    method: "GET",
    url: `/searchFriend?q=${value}`,
    async: false
  })
    .done(function(data) {
        
    }); 
}
function playStream(stream,element){
  const video = document.getElementById(element);
  video.srcObject = stream;
  video.onloadedmetadata = function(){
    video.play()
  }
}
function openCamera(){
  let config = {audio: true, video: true}
  return navigator.mediaDevices.getUserMedia(config)
}
const getQueryParams = (url) => {
  let qParams = {};
  // create a binding tag to use a property called search
  let anchor = document.createElement('a');
  // assign the href URL of the anchor tag
  anchor.href = url;
  // search property returns URL query string
  let qStrings = anchor.search.substring(1);
  let params = qStrings.split('&');
  for (let i = 0; i < params.length; i++) {
    let pair = params[i].split('=');
      qParams[pair[0]] = decodeURIComponent(pair[1]);
    }
    return qParams;
};
let options = getQueryParams(window.location.href);
console.log(options)
// openCamera()
const peer = new Peer(undefined,{
  host:'/',
  port: '3001'
});
peer.on('open', function(id) {
  socket.emit('connected-peer',{
    sender: window.currentUser.id,
    peerId: id
  })
});
//get peerID
socket.emit('send-peerID',userRemote);
//caller
socket.on('get-peerID',function(data){
    openCamera()
  .then(stream=> {
    playStream(stream,'localStream')
    const call = peer.call(data,stream);
    call.on('stream',remoteStream=>{
      playStream(remoteStream,'remoteStream')
    })
  })
  .catch(err=>console.log(err))
})
peer.on('call',call=>{
  openCamera()
  .then(stream=>{
    call.answer(stream);
    playStream(stream,'localStream')
    call.on('stream',remoteStream=>{
      playStream(remoteStream,'remoteStream')
    })
  })
  .catch(err=>console.log(err))
})

//
$('.decline-call').click(function(e){
  socket.emit('remove-call',userRemote);
  playStream(null,'remoteStream')
})

socket.on('removed-call',function(data){
  const video = document.getElementById('remoteStream');
  video.srcObject = null;
  const call = peer.call(data,null);
  alert('Bạn của bạn đã rời khỏi cuộc trò chuyện')
})