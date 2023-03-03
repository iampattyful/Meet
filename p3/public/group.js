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
    window.location.href = "/main.html";
  } else {
    await getChatRoomGroup();
  }
}
async function getChatRoomGroup() {
  const res = await fetch("/chat/getChatRoomGroup");
  const res_json = await res.json();
  if (res_json.isErr) {
    alert(res_json.errMess);
  } else {
    renderGroupList(res_json.data, res_json.userId);
  }
}

function renderGroupList(data, userId) {
  let html = [];

  data.forEach((obj) => {
    if (userId == obj.matched_user_id1) {
      html.push(`
        <div id="m-${obj.group_id}" class="matchedUser">
            <div id="o-${obj.group_id}" class="iconContainer">
                <div id="u-${obj.group_id}" class="userIcon">
                    <img src="${obj.user_icon2}" id="i-${obj.group_id}" data-id="${obj.group_id}" />
                </div>
            </div>
            <div id="u-${obj.group_id}" class="userBox">
                <div id="s-${obj.group_id}" class="username">${obj.username2}</div>
                <div id="m-${obj.group_id}" class="lastMessage">${obj.message}</div>
            </div>
        </div>
        `);
    }
    if (userId == obj.matched_user_id2) {
      html.push(`
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
        `);
    }
  });

  let groupList = document.querySelector(".groupList");
  groupList.innerHTML = html.join("");

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
}
socket.on("updateRoomGroup", async (res_json) => {
  if (res_json.isErr) {
    // alert(res_json.errMess);
    // to do something
  } else {
    await renderGroupList(res_json.data, res_json.userId);
  }
});
// socket.on("renderChatRoomGroup", (data) => {
//   // console.log(window.location.pathname);
//   // if (window.location.pathname !== "/socket.html") {
//   //   return;
//   // }
//   console.log(data);
//   let myId = data.myId;

//   let html = [];
//   data.matchedUsers.forEach((obj) => {
//     if (myId == obj.matched_user_id1) {
//       html.push(`
//         <div id="m-${obj.group_id}" class="matchedUser">
//             <div id="o-${obj.group_id}" class="iconContainer">
//                 <div id="u-${obj.group_id}" class="userIcon">
//                     <img src="${obj.user_icon2}" id="i-${obj.group_id}" data-id="${obj.group_id}" />
//                 </div>
//             </div>
//             <div id="u-${obj.group_id}" class="userBox">
//                 <div id="s-${obj.group_id}" class="username">${obj.username2}</div>
//                 <div id="m-${obj.group_id}" class="lastMessage">${obj.message}</div>
//             </div>
//         </div>
//         `);
//     }
//     if (myId == obj.matched_user_id2) {
//       html.push(`
//         <div id="m-${obj.group_id}" class="matchedUser">
//             <div id="o-${obj.group_id}" class="iconContainer">
//                 <div id="u-${obj.group_id}" class="userIcon">
//                     <img src="${obj.user_icon}" id="i-${obj.group_id}" data-id="${obj.group_id}" />
//                 </div>
//             </div>
//             <div id="u-${obj.group_id}" class="userBox">
//                 <div id="s-${obj.group_id}" class="username">${obj.username}</div>
//                 <div id="m-${obj.group_id}" class="lastMessage">${obj.message}</div>
//             </div>
//         </div>
//         `);
//     }
//   });
//   // console.log(html);
//   const matchedUserList = document.querySelector(".matchedUserBox");
//   matchedUserList.innerHTML = html.join("");

//   let joinRooms = document.querySelectorAll(".matchedUser");
//   for (let room of joinRooms) {
//     room.addEventListener("click", async (e) => {
//       e.preventDefault();

//       let groupId = e.target.id.split("-")[1];

//       // window.location.href = `/room.html?groupId=${groupId}`;
//       // socket.emit('update online status',groupId)
//       // socket.emit("join room",`room${id}`);
//     });
//   }
// });
