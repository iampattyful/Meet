//hight
let hight = 160;
let newHight = document.querySelector("#numOfHight");
document.querySelector("#hight").addEventListener("mouseup", () => {
  hight = parseInt(document.querySelector("#hight").value);
  newHight.innerHTML = hight;
});

//weight
let weight = 50;
let newWeight = document.querySelector("#numOfWeight");
document.querySelector("#weight").addEventListener("mouseup", () => {
  weight = parseInt(document.querySelector("#weight").value);
  newWeight.innerHTML = weight;
});
