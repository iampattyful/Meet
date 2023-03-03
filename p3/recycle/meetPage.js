const { doesNotMatch } = require("assert");

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
  console.log(post);
  const postWall = document.querySelector("#userMeetPage");
  postWall.innerHTML = `
    <button type="button" class="btn btn-outline-primary">filter</button>
    <div class="shapeOfImage card" id="shapeOfImage">
        <img class="userImage" id="userImage" src="${post.users.icon}"/>
        <div class="userName" id="userName">${post.users.username}</div>
        <div class="date_of_birth" id="date_of_birth">${post.users.date_of_birth}</div>
        <div class="buttonTable">
            <button type="button" class="btn btn-outline-danger">Dis Like</button>
            <button type="button" class="btn btn-outline-success">Like</button>
        </div>
    </div>
    `;
}

async function userInformationPost() {
  const res = await fetch(`/userInformation/${userId}`);
  const user = await res.json();
  console.log(user);
  const information = document.querySelector("#userImage");
  information.innerHTML = `
  <div class="card mb-3">
      <div id="carouselExampleIndicators" class="carousel slide">
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            class="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="${user.image.image}" class="d-block w-100" />
          </div>
          <div class="carousel-item">
            <img src="${user.image.image}" class="d-block w-100" />
          </div>
          <div class="carousel-item">
            <img src="${user.image.image}" class="d-block w-100" />
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="prev"
        >
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleIndicators"
          data-bs-slide="next"
        >
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
      </div>
      <div class="card-body">
        <h5 class="card-title">UserName</h5>
        <p class="card-text">user introduction</p>
        <p class="card-text">
          <small class="text-muted">age</small>
        </p>
      </div>
    </div>
  `;
}
