let submit_edit_form_button = document.querySelector(
  ".submit_edit_form_button"
);
submit_edit_form_button.addEventListener("click", async function (event) {
  event.preventDefault();
  let edit_form = document.querySelector(".editForm");
  const formData = new FormData(edit_form);
  const res = await fetch("/editProfile/editProfile", {
    method: "PUT",
    body: formData,
  });

  const result = await res.json();
  console.log(result);
});

//hight
let hight = 160;
let newHight = document.querySelector("#numOfHight");
document.querySelector("#height").addEventListener("mouseup", () => {
  hight = parseInt(document.querySelector("#height").value);
  newHight.innerHTML = hight;
});

//weight
let weight = 50;
let newWeight = document.querySelector("#numOfWeight");
document.querySelector("#weight").addEventListener("mouseup", () => {
  weight = parseInt(document.querySelector("#weight").value);
  newWeight.innerHTML = weight;
});

//tag
// let tag = "";
// let newTag =document.querySelector("#tagName");
// document.querySelector("#")

// const formData = new FormData(edit_form);

// const res = await fetch("/editProfile/editProfile", {
// method: "GET",
// });
// const result = await res.json();

//Display icon
window.addEventListener("DOMContentLoaded", (event) => {
  button_add_event1();
  button_add_event2();
  button_add_event3();
  button_add_event4();
  button_add_event5();
});
let edit_form_image1 = document.querySelector("#editForm");
let edit_form_image2 = document.querySelector("#editForm");
let edit_form_image3 = document.querySelector("#editForm");
let edit_form_image4 = document.querySelector("#editForm");
let edit_form_image5 = document.querySelector("#editForm");

async function button_add_event1() {
  let file_add_input = document.querySelector("#icon_input1");
  file_add_input.addEventListener("change", (event) => {
    if (event.target.files[0]) {
      document.querySelector("#icon_add1").src = URL.createObjectURL(
        event.target.files[0]
      );
    }
  });
}
async function button_add_event2() {
  let file_add_input = document.querySelector("#icon_input2");
  file_add_input.addEventListener("change", (event) => {
    if (event.target.files[0]) {
      document.querySelector("#icon_add2").src = URL.createObjectURL(
        event.target.files[0]
      );
    }
  });
}
async function button_add_event3() {
  let file_add_input = document.querySelector("#icon_input3");
  file_add_input.addEventListener("change", (event) => {
    if (event.target.files[0]) {
      document.querySelector("#icon_add3").src = URL.createObjectURL(
        event.target.files[0]
      );
    }
  });
}
async function button_add_event4() {
  let file_add_input = document.querySelector("#icon_input4");
  file_add_input.addEventListener("change", (event) => {
    if (event.target.files[0]) {
      document.querySelector("#icon_add4").src = URL.createObjectURL(
        event.target.files[0]
      );
    }
  });
}
async function button_add_event5() {
  let file_add_input = document.querySelector("#icon_input5");
  file_add_input.addEventListener("change", (event) => {
    if (event.target.files[0]) {
      document.querySelector("#icon_add5").src = URL.createObjectURL(
        event.target.files[0]
      );
    }
  });
}
////////////////////////////////////////////////////////////////////////
