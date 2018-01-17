var socket = io();
var sound = new Howl({
    src: ['/resonance.mp3'],
    loop: true
  });
$(function() {
    socket.emit('user',"user")
    socket.on('count',function(data) {
        $('#user_count').text(data);
    });
    socket.on('play',function(data) {
        // var x = document.getElementById("myAudio");
        // x.play();
        sound.play();
        $(".bar").css("display","block");
    });
    socket.on('stop',function(data) {
        // var x = document.getElementById("myAudio");
        // x.pause();
        $(".bar").css("display","none");
        sound.stop();
    });
})