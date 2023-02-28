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
    console.log(data);
    const matchedUserList = document.querySelector(".matchedUserList")
    matchedUserList.innerHTML = data.matchedUserList
        .map(
            (obj)=> `
            <div class="matchedUser handleClickUserId=${obj.users.id}">
                <div class="usericon">${obj.users.user_icon}</div>
                <div class="userbox">
                    <div class="username">${obj.users.username}</div>
                    <div class="lastMessage">${obj.chatroom.message}</div>
                </div>
            </div>
            `
        )
        .join("")
})

