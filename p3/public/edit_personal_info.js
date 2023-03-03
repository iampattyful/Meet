let edit_form = document.querySelector("#editForm");
console.log(edit_form);
edit_form.addEventListener("submit", async function (event) {
  event.preventDefault();
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

//  const formData = new FormData(edit_form);

//   const res = await fetch("/editProfile/editProfile", {
//     method: "GET",
//   });
//   const result = await res.json();
