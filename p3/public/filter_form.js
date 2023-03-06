let userCard = document.querySelector(".slider");

window.addEventListener("DOMContentLoaded", (event) => {
  filter_form_main();
  main();
});

async function filter_form_main() {
  await getCurrentUser();
  let formatFormData = {
    gender: ["male", "female", "unisex"],
    maxAge: "100",
    minAge: "18",
  };
  await handleFilterFormHttpRequest(formatFormData);
}

//////////////////////////////////////////////////log out
let login_form = document.querySelector(".login_form");
let logout_form = document.querySelector(".logout_form");
let filterBtn = document.querySelector(".btn");

async function main() {
  await getCurrentUser();
  reg_logout_click_event();
}
function reg_logout_click_event() {
  logout_form.addEventListener("submit", async (e) => {
    e.preventDefault();

    let res = await fetch("user/logout", {
      headers: {
        "Content-type": "Application/json",
      },
      method: "POST",
      body: "",
    });

    let res_json = await res.json();

    user = res_json.data;

    if (!res_json.isErr) {
      render_all_form1();
      window.location.href = "/";
    } else {
      alert(res_json.errMess);
      window.location.href = "/";
    }
  });
}

async function render_all_form1() {
  if (user.isLogin) {
    login_form.classList.add("isHide");
    logout_form.classList.remove("isHide");
    filterBtn.classList.remove("isHide");
  } else {
    login_form.classList.remove("isHide");
    logout_form.classList.add("isHide");
    filterBtn.classList.add("isHide");
  }
}
/////////////////////////////////////////////////////
async function getCurrentUser() {
  let res = await fetch("user/getCurrentUser");
  let res_json = await res.json();
  console.log(res_json);
  if (res_json.isErr) {
    console.log(res_json.errMess);
    user = { isLogin: false };
  } else {
    user = res_json.data;
  }
  render_all_form2();
}

async function render_all_form2() {
  let filterBtn = document.querySelector(".btn");
  if (user.isLogin) {
    filterBtn.classList.remove("isHide");
  } else {
    filterBtn.classList.add("isHide");
  }
}
// const init = async function () {
//   // isLoggedInAPI();
//   // localStorage.getItem(key, value);
//   let formatFormData = {
//     gender: ["male", "female", "unisex"],
//     maxAge: "100",
//     minAge: "18",
//   };
//   await handleFilterFormHttpRequest(formatFormData);
// };
// init();

function formatData(formData) {
  var object = {};
  formData.forEach(function (value, key) {
    object[key] = value;
  });
  return JSON.stringify(object);
}

let numOfSlider = 0;
async function handleFilterFormHttpRequest(formatFormData) {
  console.log(formatFormData);
  const res = await fetch(`/filter/users`, {
    method: "POST",
    headers: {
      // Specify any HTTP Headers Here
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formatFormData), // Specify the Request Body
  });
  // localStorage.setItem(key, value);
  const json = await res.json();

  if (!json.isErr) {
    // const age = await moment()
    //   .subtract(obj.date_of_birth, "years")
    //   .format("YYYY-MM-DD");
    // create filtered users result here

    document.querySelector("#slider_container").innerHTML = json.data
      .map((obj, index) => {
        img_arr.push({
          numOfImg: 6,
        });
        return json.data.length - 1 == index
          ? `
          <div class="slider">
          <div class="buttonTable">
                <button class="btn btn-outline-danger dislikeBtn">
                  <i class="bi bi-x-circle-fill"></i>
                </button>
                <button class="btn btn-outline-success likeBtn" data-id=${obj.id}>
                  <i class="bi bi-arrow-through-heart-fill"></i>
                </button>
              </div>     
          <section class="image_content">
          <button class="btn  leftButton"><i class="bi bi-chevron-left"></i></button>
          <button class="btn  rightButton"><i class="bi bi-chevron-right"></i></button>
            <div id="image_container_${index}" class="image_container">
              <img class="userImage" id="userImage" src="${obj.user_icon}"/>
              <img class="userImage" id="userImage" src="${obj.image1}" />
          
              <img class="userImage" id="userImage" src="${obj.image2}" />
              <img class="userImage" id="userImage" src="${obj.image3}" />
            
              <img class="userImage" id="userImage" src="${obj.image4}" />
              <img class="userImage" id="userImage" src="${obj.image5}" />
            </div>
          </section>  
          <section class="information"> 
          
              
              <div class="userName" id="userName"><h1>${obj.username}</h1></div>
              <div class="date_of_birth" id="date_of_birth"><i class="fa-solid fa-cake-candles"></i>${obj.date_of_birth.substring(
                0,
                10
              )}</div>
              <div >基本資料</div>
              <div >身高${obj.height}</div>
              <div >${obj.weight}噸~你信唔信?</div>
              <div ><i class="bi bi-gender-ambiguous"></i>${obj.gender}  <i class="bi bi-mortarboard-fill"></i>${obj.education_level}</div>
              <div class="about_me"><i class="bi bi-info-circle"></i>${obj.about_me}</div>
            
                  
                

              
          </section>
          
      
      </div>
        `
          : `
        <div class="slider">
          <div class="buttonTable">
                <button class="btn btn-outline-danger dislikeBtn">
                  <i class="bi bi-x-circle-fill"></i>
                </button>
                <button class="btn btn-outline-success likeBtn" data-id=${obj.id}>
                  <i class="bi bi-arrow-through-heart-fill"></i>
                </button>
              </div>     
          <section class="image_content">
          <button class="btn  leftButton"><i class="bi bi-chevron-left"></i></button>
          <button class="btn  rightButton"><i class="bi bi-chevron-right"></i></button>
            <div id="image_container_${index}" class="image_container">
              <img class="userImage" id="userImage" src="${obj.user_icon}"/>
              <img class="userImage" id="userImage" src="${obj.image1}" />
          
              <img class="userImage" id="userImage" src="${obj.image2}" />
              <img class="userImage" id="userImage" src="${obj.image3}" />
            
              <img class="userImage" id="userImage" src="${obj.image4}" />
              <img class="userImage" id="userImage" src="${obj.image5}" />
            </div>
          </section>  
          <section class="information"> 
          
              
              <div class="userName" id="userName"><h1> ${obj.username}</h1></div>
              <div class="date_of_birth" id="date_of_birth"><i class="fa-solid fa-cake-candles"></i>${obj.date_of_birth.substring(
                0,
                10
              )}</div>
              <div  class="userCard" ><i class="bi bi-ui-checks"></i>基本資料</div>
              <div ><i class="fa-solid fa-ruler"></i>${obj.height}cm</div>
              <div ><i class="fa-solid fa-weight-hanging"></i>${obj.weight}kg</div>
              <div ><i class="bi bi-gender-ambiguous"></i>${obj.gender}</div>
              <div ><i class="bi bi-mortarboard-fill"></i>${obj.education_level}</div>
              <div class="about_me"><i class="bi bi-info-circle"></i>${obj.about_me}</div>
            
                  
                

              
          </section>
          
      
      </div>
      `;
      })
      .join("");
    /////////////////////////////////////

    otherImage_left_btn_event();
    otherImage_right_btn_event();
    ///////////////////////////////////////////

    numOfSlider = document.querySelectorAll(".slider").length;

    reg_like_btn_event();
    reg_dislike_btn_event();
  } else {
    alert(json.errMess);
  }
}
let img_arr = [];
let img_pos = 0;
function otherImage_left_btn_event() {
  // numOfImg = document.querySelectorAll("#image_container_0").length;
  let leftBtn = document.querySelectorAll(".leftButton");
  for (let btn of leftBtn) {
    btn.addEventListener("click", (e) => {
      if (img_pos <= 0) {
        return;
      }

      img_pos--;
      prev_img_slider();
    });
  }
}

function otherImage_right_btn_event() {
  let rightBtn = document.querySelectorAll(".rightButton");
  for (let btn of rightBtn) {
    btn.addEventListener("click", (e) => {
      if (6 <= img_pos + 1) {
        return;
      }

      img_pos++;
      next_img_slider();
    });
  }
}
function prev_img_slider() {
  img_pos = parseInt(img_pos);

  const img_container = document.querySelector(`#image_container_${pos}`);
  let img_width = img_container.children[img_pos].clientWidth;

  img_container.style.transition = "transform 0.5s ease-in-out 0s";
  img_container.style.transform = `translate(-${img_width * img_pos}px, 0px)`;
}
function next_img_slider() {
  img_pos = parseInt(img_pos);

  const img_container = document.querySelector(`#image_container_${pos}`);
  let img_width = img_container.children[img_pos - 1].clientWidth;

  img_container.style.transition = "transform 0.5s ease-in-out 0s";
  img_container.style.transform = `translate(-${img_width * img_pos}px, 0px)`;
}
//////////////////////////////////////////////////////////////////////////

// when click filter submit button, redirect to slider page
let pos = 0;

function nextSlider() {
  const slider_container = document.querySelector("#slider_container");

  pos = parseInt(pos);

  let slider_width;
  if (pos <= 0) {
    slider_width = document.querySelectorAll(".slider")[`${pos}`].clientWidth;
  } else {
    slider_width =
      document.querySelectorAll(".slider")[`${pos - 1}`].clientWidth;
  }

  slider_container.style.transition = "transform 0.5s ease-in-out 0s";
  slider_container.style.transform = `translate(-${slider_width * pos}px, 0px)`;
}

let likeUser = document.querySelector("#like");

function reg_like_btn_event() {
  let allLikeBtn = document.querySelectorAll(".likeBtn");
  for (let btn of allLikeBtn) {
    btn.addEventListener("click", async (e) => {
      pos++;
      if (numOfSlider <= pos) {
        return;
      }
      nextSlider();
      img_pos = 0;
      ///////////////////////////////////////
      const likeUser = e.currentTarget;
      const id = likeUser.dataset.id;
      console.log(id);
      //////////////////////////////////////////

      const res = await fetch(`/meet/likeUser/${id}`, {
        method: "PUT",
      });

      const result = await res.json();
      console.log(result);
    });
  }
}

function reg_dislike_btn_event() {
  let allDisLikeBtn = document.querySelectorAll(".dislikeBtn");
  for (let btn of allDisLikeBtn) {
    btn.addEventListener("click", (e) => {
      pos++;
      if (numOfSlider <= pos) {
        return;
      }
      nextSlider();
      img_pos = 0;
    });
  }
}

const updateFilter = document.querySelector("#filter-form");
updateFilter.addEventListener("submit", async (event) => {
  
  event.preventDefault(); // To prevent the form from submitting synchronously
  let formData = new FormData(updateFilter);
  formData.append("minAge", minAge);
  formData.append("maxAge", maxAge);
  let formatFormData = JSON.parse(formatData(formData));

  // covert gender value to array
  if (formatFormData.gender === "ALL") {
    formatFormData.gender = ["male", "female", "unisex"];
  } else if (formatFormData.gender === "male") {
    formatFormData.gender = ["male"];
  } else if (formatFormData.gender === "female") {
    formatFormData.gender = ["female"];
  }
  console.log(formatFormData);
  await handleFilterFormHttpRequest(formatFormData);
  window.location = "/main.html";
});

/* Start of double input range slider */

let thumbL = document.querySelector(".thumb.left");
let thumbR = document.querySelector(".thumb.right");
let thumbLIsClick = false;
let thumbRIsClick = false;
let left_starting_pos = 0;
let right_starting_pos = 0;
let mouse_pos = 0;

let slider = document.querySelector(".double_slider");
let track = document.querySelector(".track");
let wrapper = document.querySelector("body");

thumbL.addEventListener("mousedown", (e) => {
  thumbLIsClick = true;
  thumbL.style.opacity = 0.6;
});

thumbR.addEventListener("mousedown", (e) => {
  thumbRIsClick = true;
  thumbR.style.opacity = 0.6;
});
wrapper.addEventListener("mouseup", (e) => {
  thumbLIsClick = false;
  thumbRIsClick = false;
  thumbL.style.opacity = 1;
  thumbR.style.opacity = 1;
});

thumbL.addEventListener("touchstart", (e) => {
  thumbLIsClick = true;
  thumbL.style.opacity = 0.6;
});

thumbR.addEventListener("touchstart", (e) => {
  thumbRIsClick = true;
  thumbR.style.opacity = 0.6;
});
wrapper.addEventListener("touchend", (e) => {
  thumbLIsClick = false;
  thumbRIsClick = false;
  thumbL.style.opacity = 1;
  thumbR.style.opacity = 1;
});

let minAge = 18;
let maxAge = 100;
slider.addEventListener("mousemove", (e) => {
  mouse_pos = e.clientX;

  let trackWidth = track.getBoundingClientRect().width;
  let thumbRight = thumbR.getBoundingClientRect().left;
  let thumbLeft = thumbL.getBoundingClientRect().left;

  if (thumbLIsClick) {
    left_starting_pos = track.getBoundingClientRect().left;
    let right_offset_x = thumbRight - left_starting_pos;
    let x = Math.min(
      Math.max(mouse_pos - left_starting_pos, 0),
      right_offset_x - 15
    );
    let percent = Math.round((x / trackWidth) * 100);

    thumbL.style.left = `${percent}%`;

    minAge = Math.round((82 * percent) / 100 + 18);
    display_age();
  }
  if (thumbRIsClick) {
    left_starting_pos = track.getBoundingClientRect().left;
    let right_ending_pos = track.getBoundingClientRect().right;
    let left_offset_x = thumbLeft - left_starting_pos;
    let x = Math.min(
      Math.max(right_ending_pos - mouse_pos, 0),
      trackWidth - left_offset_x - 45
    );

    let percent = Math.round((x / trackWidth) * 100);

    thumbR.style.right = `${percent}%`;
    thumbR.style.opacity = 0.6;
    maxAge = Math.round(((82 * percent) / 100 - 100) * -1);

    display_age();
  }
});
slider.addEventListener("touchmove", (e) => {
  mouse_pos = e.touches[0].clientX;

  let trackWidth = track.getBoundingClientRect().width;
  let thumbRight = thumbR.getBoundingClientRect().left;
  let thumbLeft = thumbL.getBoundingClientRect().left;

  if (thumbLIsClick) {
    left_starting_pos = track.getBoundingClientRect().left;
    let right_offset_x = thumbRight - left_starting_pos;
    let x = Math.min(
      Math.max(mouse_pos - left_starting_pos, 0),
      right_offset_x - 15
    );
    let percent = Math.round((x / trackWidth) * 100);

    thumbL.style.left = `${percent}%`;

    minAge = Math.round((82 * percent) / 100 + 18);
    display_age();
  }
  if (thumbRIsClick) {
    left_starting_pos = track.getBoundingClientRect().left;
    let right_ending_pos = track.getBoundingClientRect().right;
    let left_offset_x = thumbLeft - left_starting_pos;
    let x = Math.min(
      Math.max(right_ending_pos - mouse_pos, 0),
      trackWidth - left_offset_x - 45
    );

    let percent = Math.round((x / trackWidth) * 100);

    thumbR.style.right = `${percent}%`;
    thumbR.style.opacity = 0.6;
    maxAge = Math.round(((82 * percent) / 100 - 100) * -1);

    display_age();
  }
});
function display_age() {
  if (maxAge === 100) {
    document.querySelector("#age-value").innerText = `${minAge} - ${maxAge}+`;
  } else {
    document.querySelector("#age-value").innerText = `${minAge} - ${maxAge}`;
  }
}

/* End of double input range slider */

// window.onload = function (){
//   nextImage()

// }
// let imageIdx = 0
// function nextImage(){
//   let ImageMenu = document.querySelectorAll("div.ImageTable > img");
//   for(let x = 0; x < ImageMenu.length ; x++){
//     ImageMenu[x].addEventListener("click",function(event){
//       ImageMenu[i].classList.add("isHide");
//       ImageMenu[imageIdx].classList.remove("isGide");
//       imageIdx = x ;
//     })
//   }
// }
