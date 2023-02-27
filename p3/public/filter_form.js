// This file contains the js code for the filter form

window.onload = async function () {
  // isLoggedInAPI();
};

// update filter users settings

function formatData(formData) {
  var object = {};
  formData.forEach(function (value, key) {
    object[key] = value;
  });
  return JSON.stringify(object);
}

const updateFilter = document.querySelector("#filter-form");
updateFilter.addEventListener("submit", async (event) => {
  event.preventDefault(); // To prevent the form from submitting synchronously
  let formData = new FormData(updateFilter);
  formData.append("minAge", minAge);
  formData.append("maxAge", maxAge);
  let formatFormData = JSON.parse(formatData(formData));

  if (formatFormData.gender === "ALL") {
    formatFormData.gender = ["male", "female"];
  } else if (formatFormData.gender === "male") {
    formatFormData.gender = ["male"];
  } else if (formatFormData.gender === "female") {
    formatFormData.gender = ["female"];
  }
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
    console.log(json.data);
    // redirect meet profile page here
    document.querySelector("#slider_container").innerHTML = json.data
      .map((obj) => ``)
      .join("");
  } else {
    alert(json.errMess);
  }
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
function display_age() {
  if (maxAge === 100) {
    document.querySelector("#age-value").innerText = `${minAge} - ${maxAge}+`;
  } else {
    document.querySelector("#age-value").innerText = `${minAge} - ${maxAge}`;
  }
}

/* End of double input range slider */
