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
            <div class="matchedUser handleClickUserId=${obj.id}">
                <div class="usericon">${obj.icon}</div>
                <div class="userbox">
                    <div class="username">${obj.username}</div>
                    <div class="lastMessage">${obj.message}</div>
                </div>
            </div>
            `
        )
        .join("")
})

