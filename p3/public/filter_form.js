// This file contains the js code for the filter form

// window onload
// check if user is logged in and get user id by isLoggedInAPI()?
window.onload = async function () {
  // isLoggedInAPI();
  // const res = await fetch(`/filter/users`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(data),
  // });
  // let json = await res.json();
};

// update filter users settings
const updateFilter = document.querySelector("#filter-form");
updateFilter.addEventListener("submit", async (event) => {
  event.preventDefault(); // To prevent the form from submitting synchronously
  const body = {
    userId: isLoggedInAPI.users.id, // req.session.id?
    // content: how to get the value of the radio input and age range?
    // exampleRadios3 = select all genders
    content: [
      document.getElementById("exampleRadios1").value,
      document.getElementById("exampleRadios2").value,
      document.getElementById("exampleRadios3").value,
      minAge,
      maxAge,
    ],
  };
  const submitFilterForm = await fetch(`/filter/users`, {
    method: "POST",
    headers: {
      // Specify any HTTP Headers Here
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(body), // Specify the Request Body
  });

  const content = await submitFilterForm.json();
  if (content.result) {
    console.log(content.result);
    submitUserComment.reset();
    alert("submit filter form successfully");
  } else {
    alert("cannot submit filter form");
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

function display_age() {
  if (maxAge === 100) {
    document.querySelector(
      ".caption"
    ).innerText = `age ${minAge} to ${maxAge}+`;
  } else {
    document.querySelector(".caption").innerText = `age ${minAge} to ${maxAge}`;
  }
}

/* End of double input range slider */
