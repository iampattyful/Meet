// // window.addEventListener("DOMContentLoaded", (event) => {
// // });

// async function submitEditFormButton(){
//     let submit_edit_form_button = document.querySelector(".submit_edit_form_button");
//     submit_edit_form_button.addEventListener("click", async function (event) {
//       event.preventDefault();
//       let edit_form = document.querySelector(".editForm");
//       const formData = new FormData(edit_form);
//       const res = await fetch("/editProfile/editProfile", {
//         method: "PUT",
//         body: formData,
//       });
    
//       const result = await res.json();
//       console.log(result);
//       afterSubmit()
//     });
// }

// async function loadProfile(){
//     const res = await fetch ("/editProfile/loadProfile",{
//         method:"GET"
//     });
//     const result = await res.json()
//     const obj =result.data
//     console.log(result)
//     let editForm = document.querySelector(".editForm")
//     editForm.innerHTML = `
//     <div class="container">
//         <div class="row">
//             <div class="col">
//                 <button id="exitEditFormBtn">X</button>
//                 <div class="image">
//                   <div class="firstLineImage">
//                     <label class="icon">
//                         <img src="" class="img-thumbnail img-thumbnail" id="icon_add1"/>
//                         <input type="file" id="icon_input1" class="Icon" name="user_icon"/>
//                         <i class="fa-regular fa-square-plus"></i>
//                     </label>
//                     <label class="image1">
//                         <img src="" class="img-thumbnail img-thumbnail" id="icon_add2" />
//                         <input type="file" id="icon_input2" class="Icon" name="image1" />
//                         <i class="fa-regular fa-square-plus"></i>
//                     </label>
//                     <label class="image2">
//                         <img src="" class="img-thumbnail img-thumbnail" id="icon_add3" />
//                         <input type="file" id="icon_input3" class="Icon" name="image2" />
//                         <i class="fa-regular fa-square-plus"></i>
//                     </label>
//                 </div>
//                   <div class="secondLineImage">
//                     <label class="image3">
//                         <img src="" class="img-thumbnail img-thumbnail" id="icon_add4" />
//                         <input type="file" id="icon_input4" class="Icon" name="image3" />
//                         <i class="fa-regular fa-square-plus"></i>
//                     </label>
//                     <label class="image4">
//                         <img src="" class="img-thumbnail img-thumbnail" id="icon_add5" />
//                         <input type="file" id="icon_input5" class="Icon" name="image4" />
//                         <i class="fa-regular fa-square-plus"></i>
//                     </label>
//                     <label class="image5">
//                         <img src="" class="img-thumbnail img-thumbnail" id="icon_add6" />
//                          <input type="file" id="icon_input6" class="Icon" name="image5" />
//                         <i class="fa-regular fa-square-plus"></i>
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <div>名稱</div>
//                   <input type="text" class="writeBox" name="username" placeholder="Username" value="${obj.username}"/>
//                 </div>
//                 <div>
//                   <div>密碼</div>
//                   <input type="password" class="writeBox" name="password" placeholder="password" required/>
//                 </div>
//                 <div>
//                   <div>地區</div>
//                   <select name="location" id="location">
//                     <option value="${obj.location}">${obj.location}</option>
//                     <option value="Central and Western">中西區</option>
//                     <option value="Wan Chai">灣仔</option>
//                     <option value="Eastern">東區</option>
//                     <option value="Southern">南區</option>
//                     <option value="Yan Tsim Mong">油尖旺</option>
//                     <option value="Sham Shui Po">深水埗</option>
//                     <option value="Kowloon City">九龍城</option>
//                     <option value="Wong Tai Sin">黃大仙</option>
//                     <option value="Kwun Tong">觀塘</option>
//                     <option value="Kwai Tsing">葵青</option>
//                     <option value="Tsuen Wan">荃灣</option>
//                     <option value="Tuen Mun">屯門</option>
//                     <option value="Yuen Long">元朗</option>
//                     <option value="North">北區</option>
//                     <option value="Tai Po">大埔</option>
//                     <option value="Sha Tin">沙田</option>
//                     <option value="Sai Kung">西貢</option>
//                     <option value="Islands">離島</option>
//                   </select>
//                 </div>
//                 <div>
//                   <div>關於我</div>
//                   <textarea type="text"
//                     class="writeBoxAboutMe"
//                     name="about_me"
//                     rows="3"
//                     contenteditable="true"
//                     placeholder="關於我"
//                     value="${obj.about_me}"
//                   ></textarea>
//                 </div>
//                 <div>
//                   <div>學歷</div>
//                   <select name="education_level" id="education_level">
//                     <option value="${obj.education_level}">${obj.education_level}</option>
//                     <option value="high_school">中學</option>
//                     <option value="diploma">專上學院</option>
//                     <option value="bachelor">本科</option>
//                     <option value="master">碩士</option>
//                     <option value="phd">博士</option>
//                     <option value="others">其他</option>
//                   </select>
//                 </div>
//                 <div>
//                   <div>行業</div>
//                   <input type="text" class="writeBox" name="job" placeholder="industry" value="${obj.job}"/>
//                 </div>

//                 <div>
//                   <div>國籍</div>
//                   <input type="text" class="writeBox" name="nationality" placeholder="香港" value="${obj.nationality}"/>
//                 </div>

//                 <div>
//                   <div>身高</div>
//                   <div id="numOfHeight">${obj.height}</div>
//                   <div class="hightBar">
//                     <label for="customRange2" class="form-label"></label>
//                     <input name="height" type="range" class="form-range" min="90" max="230" id="height" value="${obj.height}"/>
//                   </div>
//                 </div>

//                 <div>
//                   <div>體....體重...</div>
//                   <div id="numOfWeight">${obj.weight}</div>
//                   <div class="weightBar">
//                     <label for="customRange2" class="form-label"></label>
//                     <input name="weight" type="range" class="form-range" min="30" max="120" id="weight" value="${obj.weight}"/>
//                   </div>
//                 </div>

//                 <div>
//                   <div>寵物</div>
//                   <div>
//                     <label class="switch">
//                       <input type="checkbox" checked name="pet" value="${obj.pet}"/>
//                       <span class="slider round"></span>
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <div>運動習慣</div>
//                   <div>
//                     <label class="switch">
//                       <input type="checkbox" checked name="fitness value="${obj.fitness}" />
//                       <span class="slider round"></span>
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <div>吸煙習慣</div>
//                   <div>
//                     <label class="switch">
//                       <input type="checkbox" checked name="smoke" value="${obj.smoke}"/>
//                       <span class="slider round"></span>
//                     </label>
//                   </div>
//                 </div>

//                 <div>
//                   <div>酗酒習慣</div>
//                   <div>
//                     <label class="switch">
//                       <input type="checkbox" checked name="drink" value="${obj.drink}"/>
//                       <span class="slider round"></span>
//                     </label>
//                   </div>
//                 </div>

//                 <button class="submit_edit_form_button">提交</button>
//             </div>
//         </div>
//     </div>
//     `
//     height()
//     weight()
//     //icon
//     button_add_event1();
//     button_add_event2();
//     button_add_event3();
//     button_add_event4();
//     button_add_event5();
//     button_add_event6();

//     submitEditFormButton()
// }



// //hight
// function height(){
//     let height = 160;
//     let newHeight = document.querySelector("#numOfHeight");
//     document.querySelector("#height").addEventListener("mouseup", () => {
//       height = parseInt(document.querySelector("#height").value);
//       newHeight.innerHTML = height;
//     });
// }

// //weight
// function weight(){
//     let weight = 50;
//     let newWeight = document.querySelector("#numOfWeight");
//     document.querySelector("#weight").addEventListener("mouseup", () => {
//       weight = parseInt(document.querySelector("#weight").value);
//       newWeight.innerHTML = weight;
//     });
// }

// //tag
// // let tag = "";
// // let newTag =document.querySelector("#tagName");
// // document.querySelector("#")

// // const formData = new FormData(edit_form);

// // const res = await fetch("/editProfile/editProfile", {
// // method: "GET",
// // });
// // const result = await res.json();

// //Display icon

// let edit_form_image1 = document.querySelector("#editForm");
// let edit_form_image2 = document.querySelector("#editForm");
// let edit_form_image3 = document.querySelector("#editForm");
// let edit_form_image4 = document.querySelector("#editForm");
// let edit_form_image5 = document.querySelector("#editForm");
// let edit_form_image6 = document.querySelector("#editForm");

// //icon
// async function button_add_event1() {
//     let file_add_input = document.querySelector("#icon_input1");
//     file_add_input.addEventListener("change", (event) => {
//         if (event.target.files[0]) {
//         console.log(2);
//       document.querySelector("#icon_add1").src = URL.createObjectURL(
//         event.target.files[0]
//       );
//     }
//   });
// }
// async function button_add_event2() {
//   let file_add_input = document.querySelector("#icon_input2");
//   file_add_input.addEventListener("change", (event) => {
//     if (event.target.files[0]) {
//       document.querySelector("#icon_add2").src = URL.createObjectURL(
//         event.target.files[0]
//       );
//     }
//   });
// }
// async function button_add_event3() {
//   let file_add_input = document.querySelector("#icon_input3");
//   file_add_input.addEventListener("change", (event) => {
//     if (event.target.files[0]) {
//       document.querySelector("#icon_add3").src = URL.createObjectURL(
//         event.target.files[0]
//       );
//     }
//   });
// }
// async function button_add_event4() {
//   let file_add_input = document.querySelector("#icon_input4");
//   file_add_input.addEventListener("change", (event) => {
//     if (event.target.files[0]) {
//       document.querySelector("#icon_add4").src = URL.createObjectURL(
//         event.target.files[0]
//       );
//     }
//   });
// }
// async function button_add_event5() {
//   let file_add_input = document.querySelector("#icon_input5");
//   file_add_input.addEventListener("change", (event) => {
//     if (event.target.files[0]) {
//       document.querySelector("#icon_add5").src = URL.createObjectURL(
//         event.target.files[0]
//       );
//     }
//   });
// }
// async function button_add_event6() {
//   let file_add_input = document.querySelector("#icon_input6");
//   file_add_input.addEventListener("change", (event) => {
//     if (event.target.files[0]) {
//       document.querySelector("#icon_add6").src = URL.createObjectURL(
//         event.target.files[0]
//       );
//     }
//   });
// }
// ////////////////////////////////////////////////////////////////////////

// function afterSubmit() {
//     let submit_edit_form_button = document.querySelector(".submit_edit_form_button");
//     submit_edit_form_button.addEventListener("click", (e) => {
//       e.preventDefault();
//       let edit_form = document.querySelector(".editForm");
//       let logout_form = document.querySelector(".logout_form");
//       let filterBtn = document.querySelector(".btn");
//       let content = document.querySelector(".content");
//       logout_form.classList.add("isHide");
//       edit_form.classList.add("isHide");
//       filterBtn.classList.remove("isHide");
//       content.classList.remove("isHide");
//     });
//   }
