const socket = io.connect();
socket.on("connect", () => {
  console.log("client connect to server : ", socket.id);
});

socket.on("office", (msg) => {
  let node = userList.querySelector(`[data-user_id="${msg.user.id}"]`);
  if (!node) {
    return;
  }
  node.remove();
});

socket.on("created matched users list", (data) => {
  console.log(data);
  const matchedUserList = document.querySelector(".matchedUserList");
  matchedUserList.innerHTML = data
    .map(
      (obj) => `
            <div id="m-${obj.group_id}" class="matchedUser">
                <div id="o-${obj.group_id}" class="iconContainer">
                    <div id="u-${obj.group_id}" class="userIcon">
                        <img src="${obj.user_icon}" id="i-${obj.group_id}" data-id="${obj.group_id}" />
                    </div>
                </div>
                <div id="u-${obj.group_id}" class="userBox">
                    <div id="s-${obj.group_id}" class="username">${obj.username}</div>
                    <div id="m-${obj.group_id}" class="lastMessage">${obj.message}</div>
                </div>
            </div>
            `
    )
    .join("");

  let joinRooms = document.querySelectorAll(".matchedUser");
  for (let room of joinRooms) {
    room.addEventListener("click", async (e) => {
      e.preventDefault();

      let groupId = e.target.id.split("-")[1];

      window.location.href = `/room.html?groupId=${groupId}`;
      // socket.emit('update online status',groupId)
      // socket.emit("join room",`room${id}`);
    });
  }
});
socket.on("created message in room", (data) => {
    console.log(data);
    const urlParams = new URLSearchParams(window.location.search);
    const groupId = urlParams.get("groupId");
    let newData = data.filter((obj) => obj.group_id == groupId);
    console.log(newData);

    const iconContainer = document.querySelector(".matchedUser")
    if (newData.user_id == myId){
        iconContainer.innerHTML = newData
        .map(
            (obj)=>`
                <div class="iconContainer">
                    <div class="userIcon"><img src ="${obj.user_icon}"/></div>
                </div>
                <div class="userBox">
                    <div class="username">${obj.username}</div>
                </div>
            `
        )
        .join("")
    }

    const sentMessage = document.querySelector(".messageContainer")
    if (newData.user_id == myId){
        sentMessage.innerHTML = newData
        .map(
            (obj)=>`
                 <div class="messageBox item-right">
                    <span class="messageFrom">me</span>
                    <div class="message">${obj.message}</div>
                </div>
            `
        ).join("")
    }else{
        sentMessage.innerHTML = newData
        .map(
            (obj)=>`
                 <div class="messageBox item-right">
                    <span class="messageFrom">${obj.username}</span>
                    <div class="message">${obj.message}</div>
                </div>
            `
        ).join("")
    }
});
