var socket = io();
$(function() {
    socket.emit('admin',"admin")
    socket.on('count',function(data) {
        $('#user_count').text(data);
    });

    socket.on('played',function(data) {
        $("#play").text("Stop");
        $('#msg').text(data);
    })

    socket.on('stopped',function(data) {
        $("#play").text("Play");
        $('#msg').text(data);
    });

    var btn = document.getElementById('play');
    btn.addEventListener('click',function() {
        if($("#play").text() === "Play") {
            socket.emit("play","play");
        } else {
            socket.emit("stop","stop");
        }
    })
})