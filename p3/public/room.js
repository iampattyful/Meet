const urlParams = new URLSearchParams(window.location.search);
const groupId = urlParams.get("groupId");
let data = [];
let userId;
window.addEventListener("DOMContentLoaded", (event) => {
  main();
});
async function main() {
  await getCurrentUser();
}
async function getCurrentUser() {
  let res = await fetch("user/getCurrentUser");
  let res_json = await res.json();
  if (res_json.isErr) {
    window.location.href = "/";
  } else {
    userId = res_json.data.id;
    await frdUserIcon();
    await getRoomMess();
    await rej_sendMess_btn_event();
  }
}
async function frdUserIcon() {
  const res = await fetch(`/chat/getFrdUserData/${groupId}`);
  const res_json = await res.json();
  if (res_json.isErr) {
    // alert(res_json.errMess);
  } else {
    let obj = res_json.data;
    const userRow = document.querySelector(".userRow");
    userRow.innerHTML = `
                <div class="userIcon"><img src ="${obj.user_icon}"/></div>
                <div class="username">${obj.username}</div>
            `;
  }
}
async function getRoomMess() {
  const res = await fetch(`/chat/getRoomMess/${groupId}`);
  const res_json = await res.json();

  if (res_json.isErr) {
    // alert(res_json.errMess);
    window.location = "/group.html";
  } else {
    data = res_json.data;
    renderUpdateMessage();
    onBottom();
  }
}

async function rej_sendMess_btn_event() {
  let sendBtn = document.querySelector("#send");
  let message = document.querySelector(".send-message");
  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // let message = document.querySelector(".send-message");
    socket.emit("sendMessage", { groupId: groupId, message: message.value });
    // socket.emit(groupId, { groupId: groupId, message: message.value });

    document.querySelector(".send-message").value = "";
  });
  message.addEventListener("keypress", (e) => {
    if (e.keyCode === 13) {
      e.preventDefault();
      socket.emit("sendMessage", { groupId: groupId, message: message.value });
      // socket.emit(groupId, { groupId: groupId, message: message.value });
      document.querySelector(".send-message").value = "";
    }
  });

  let chatBar = document.querySelector(".chatBar");
  message.addEventListener("focus", (e) => {
    chatBar.classList.add("active");
  });
  message.addEventListener("blur", (e) => {
    chatBar.classList.remove("active");
  });
}

function renderUpdateMessage() {
  const messageContainer = document.querySelector(".messageContainer");
  messageContainer.innerHTML = data
    .map(
      (obj) => `
               <div class="messageBox ${
                 obj.user_id == userId ? "item-right" : "item-left"
               }">
                  <div class="message">${obj.message}</div>
              </div>
          `
    )
    .join("");
  onBottom();
}

// socket.on(`updateSendMessage-${groupId}`, (res_json) => {
//   data = res_json;
//   renderUpdateMessage();
// });

socket.on(`${groupId}`, (res_json) => {
  data = res_json;
  console.log(data);
  renderUpdateMessage();
});

// const urlParams = new URLSearchParams(window.location.search);

// socket.on("load message in room", (data) => {
//   // console.log(data);
//   const urlParams = new URLSearchParams(window.location.search);
//   const groupId = urlParams.get("groupId");
//   // console.log(groupId);
//   if (groupId === null) {
//     return;
//   }
//   let newData = data.rows.filter((obj) => obj.group_id == groupId);
//   let myId = data.myId;
//   console.log(myId);
//   const iconContainer = document.querySelector(".matchedUser");
//   let iconData = [...newData];

//   iconData = iconData.filter((obj) => obj.user_id != myId)[0];

//   console.log(iconData);
//   //   console.log(iconData);
//   iconContainer.innerHTML = [iconData]
//     .map(
//       (obj) => `
//               <div class="iconContainer">
//                   <div class="userIcon"><img src ="${obj.user_icon}"/></div>
//               </div>
//               <div class="userBox">
//                   <div class="username">${obj.username}</div>
//               </div>
//           `
//     )
//     .join("");

// });

function onBottom() {
  let messageContainer = document.querySelector(".messageContainer");
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
