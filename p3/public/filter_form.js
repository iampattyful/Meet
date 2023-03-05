let userCard = document.querySelector(".slider");

window.addEventListener("DOMContentLoaded", (event) => {
  filter_form_main();
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
  render_all_form();
}

async function render_all_form() {
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
    console.log(json.data[0].date_of_birth);


    // const age = await moment()
    //   .subtract(obj.date_of_birth, "years")
    //   .format("YYYY-MM-DD");
    // create filtered users result here
    document.querySelector("#slider_container").innerHTML = json.data
      .map(
        (obj) => `
        <div class="slider ">
        
       
            <div class="ImageTable">
              <div class="image_group">
                <img class="userImage" id="userImage" src="${obj.user_icon}" />
                <img class="userImage" id="userImage" src="assets/bugCat5.gif" />
              </div>
              <div class="image_group">
                <img class="userImage" id="userImage" src="assets/bugCat5.gif" />
                <img class="userImage" id="userImage" src="assets/bugCat5.gif" />
              </div>
              <div class="image_group">
                <img class="userImage" id="userImage" src="assets/bugCat5.gif" />
                <img class="userImage" id="userImage" src="assets/bugCat5.gif" />
              </div>
            </div>
          
            <div class="userName" id="userName">${obj.username}</div>
            <div class="date_of_birth" id="date_of_birth">${obj.date_of_birth}</div>
            <div class="buttonTable">
              <button class="btn btn-outline-danger dislikeBtn">
                <i class="bi bi-x-circle-fill"></i>
              </button>
              <button class="btn btn-outline-success likeBtn" data-id=${obj.id}>
                <i class="bi bi-arrow-through-heart-fill"></i>
              </button>
            </div>
          
      
      </div>
      `
      )
      .join("");
    // otherImage_left_btn_event();
    // otherImage_right_btn_event();
    reg_like_btn_event();
    reg_dislike_btn_event();
  } else {
    alert(json.errMess);
  }
}
/////////////////////////////////////////////////////////////////////
//when user every image slider

/*   <button class="btn btn-outline-danger leftButton">left</button>
     <button class="btn btn-outline-danger rightButton">right</button>*/

let userEveryImage = 0;
function nextUserSlider(id) {
  const slider_userImage = document.querySelector("#slider_userImage");
  userEveryImage = parseInt(userEveryImage);
  let slider_width =
    document.querySelectorAll(".slider")[`${userEveryImage}`].clientWidth;
  slider_userImage.style.transition = "transform 0.5s ease-in-out 0s";
  slider_userImage.style.transform = `translate(-${
    slider_width * userEveryImage
  }px, 0px)`;
}

function otherImage_left_btn_event() {
  let leftBtn = document.querySelectorAll(".leftButton");
  for (let btn of leftBtn) {
    btn.addEventListener("click", (e) => {
      userEveryImage++;
      if (numOfSlider <= userEveryImage) {
        return;
      }
      nextUserSlider();
    });
  }
}

function otherImage_right_btn_event() {
  let rightBtn = document.querySelectorAll(".rightButton");
  for (let btn of rightBtn) {
    btn.addEventListener("click", (e) => {
      userEveryImage--;
      if (numOfSlider <= userEveryImage) {
        return;
      }
      nextUserSlider();
    });
  }
}

//////////////////////////////////////////////////////////////////////////

// when click filter submit button, redirect to slider page
let pos = 0;
function nextSlider(id) {
  const slider_container = document.querySelector("#slider_container");
  pos = parseInt(pos);
  let slider_width = document.querySelectorAll(".slider")[`${pos}`].clientWidth;
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
  //window.location = "/main.html";
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
