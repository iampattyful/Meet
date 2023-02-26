const { json } = require("stream/consumers");
const shapeOfImage = document.querySelector("shapeOfImage");

let params = new URL(document.location).searchParams;
let userId = params.get("id");

window.onload = async () => {
  userImagePost();
};
document.querySelector("#userImage").addEventListener("click", async (e) => {
  userInformationPost();
});

async function userImagePost() {
  const res = await fetch(`/users/${userId}`);
  const post = await res.json();
  console.log(json());
  const postWall = document.querySelector("#userMeetPage");
  postWall.innerHTML = `
    <button type="button" class="btn btn-outline-primary">filter</button>
    <div class="shapeOfImage card" id="shapeOfImage">
        <img class="userImage" id="userImage" src="${json.user.icon}"/>
        <div class="userName" id="userName">${json.user.username}</div>
        <div class="date_of_birth" id="date_of_birth">${json.user.date_of_birth}</div>
        <div class="buttonTable">
            <button type="button" class="btn btn-outline-danger">Dis Like</button>
            <button type="button" class="btn btn-outline-success">Like</button>
        </div>
    </div>
    `;
}

async function userInformationPost() {
  const res = await fetch(`/userInformation/${userId}`);
}
