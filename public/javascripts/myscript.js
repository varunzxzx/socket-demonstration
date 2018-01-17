var socket = io();
$(function() {
    socket.emit('user',"user")
    socket.on('count',function(data) {
        $('#user_count').text(data);
    });
    socket.on('play',function(data) {
        var x = document.getElementById("myAudio");
        x.play();
    });
    socket.on('stop',function(data) {
        var x = document.getElementById("myAudio");
        x.pause();
    });
})