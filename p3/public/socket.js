const socket = io.connect();

socket.on('connect',()=>{
    console.log('client connect to server : ', socket.id)
        
})

socket.on('onlineUser',data=>{
    let user_online_ul = document.querySelector('#user_online')
    console.log(data)
    user_online_ul.innerHTML = data.onlineUserList.map(obj=>`<li>${obj.username}</li>`)
})

socket.on('new_memo',data=>{
    console.log(data,'15')
})

let join_room_btn = document.querySelector('#join_room')

join_room_btn.addEventListener('click',e=>{
    let obj = {room:"a"}
    socket.emit('join_room',obj)
})