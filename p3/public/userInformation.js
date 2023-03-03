let params = new URL(document.location).searchParams;
let theUserId = params.get("id");

async function userInformation() {
  const res = await fetch(`/meet/userInformation/${theUserId}`);
  const json = await res.json();
  const userInformation = document.querySelector("#theUserInformation");

  userInformation.innerHTML = `
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
      <img src="${json.image}" class="d-block w-100" />
    </div>
    <div class="carousel-item">
      <img src="assets/hehe.jpg" class="d-block w-100" />
    </div>
    <div class="carousel-item">
      <img src="assets/wall.jpeg" class="d-block w-100" />
    </div>
  </div>
  <button
    class="carousel-control-prev"
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide="prev"
  >
    <span
      class="carousel-control-prev-icon"
      aria-hidden="true"
    ></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button
    class="carousel-control-next"
    type="button"
    data-bs-target="#carouselExampleIndicators"
    data-bs-slide="next"
  >
    <span
      class="carousel-control-next-icon"
      aria-hidden="true"
    ></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
<div class="card-body">
  <div>
    <button class="btn btn-outline-success likeBtn">
      Like
    </button>
    <button class="btn btn-outline-danger checkExtBtn">
      Dis Like
    </button>
  </div>
  <h5 class="card-title">UserName${json.users.username}</h5>
  <p class="card-text">user introduction</p>
  <p class="card-text">
    <small class="text-muted">age</small>
  </p>
  <div class="date_of_birth">${json.users.date_of_birth}</div>
  <div class="location">Hong Kong${json.users.location}</div>
  <div class="about_me">關於我${json.users.about_me}</div>
  <div class="education_level">hight school${json.personal_information.education_level}</div>
  <div class="job">Programmer${json.personal_information.job}</div>
  <div class="nationality">火星${json.personal_information.nationality}</div>
  <div class="hight">150${json.personal_information.height}</div>
  <div class="weight">kg${json.personal_information.weight}</div>
  <div class="pet">pet?${json.personal_information.pet}</div>
  <div class="fitnes">運動?${json.personal_information.fitness}</div>
  <div class="smoke">食煙?${json.personal_information.smoke}</div>
  <div class="drink">飲酒?${json.personal_information.drink}</div>
  <div class="card">
    <div class="card-body tag">TAG?${json.tag.tag_name}</div>
  </div>
</div>
</div>
`;
}
