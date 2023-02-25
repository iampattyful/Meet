const { json } = require("stream/consumers");
const shapeOfImage = document.querySelector("shapeOfImage");

let params = new URL(document.location).searchParams;
let userId = params.get("id");

window.onload = async () => {
  userImagePost();
};

async function userImagePost() {
  const res = await fetch(`userInformation/${userId}`);
  const post = await res.json();
  const postWall = document.querySelector("#shapeOfImage");
  postWall.innerHTML = `
        <img class="userImage" src="${json.user.icon}" />
    `;
}
