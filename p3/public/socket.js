const socket = io.connect();

socket.on("office", (msg) => {
    let node = userList.querySelector(`[data-user_id="${msg.user.id}"]`);
    if (!node) {
      return;
    }
    node.remove();
  });

socket.on('connect',()=>{
    console.log('client connect to server : ', socket.id)    
})

socket.on("created matched users list",(data)=>{
    const matchedUserList = document.querySelector(".matchedUserList")
    matchedUserList.innerHTML = data.matchedUserList
        .map(
            (obj)=> `
            <div class="matchedUser handleClickUserId=${obj.group.id}">
                <div class="iconContainer">
                    <div class="userIcon"><img src ="${obj.user_icon}"/></div>
                </div>
                <div class="userBox">
                    <div class="username">${obj.username}</div>
                    <div class="lastMessage">${obj.message}</div>
                </div>
            </div>
            `
            )
            .join("")
})
        
let joinRoom = document.querySelector(`.handleClickUserId=${obj.users.id}`)
joinRoom.addEventListener("click",e=>{
    io.to(`room${obj.group.id}`).emit("join room")
})
        