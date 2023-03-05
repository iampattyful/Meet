// let login_form = document.querySelector(".login_form");
// let logout_form = document.querySelector(".logout_form");
// let filterBtn = document.querySelector(".btn");
// let userCard = document.querySelector(".slider");

// window.addEventListener("DOMContentLoaded", (event) => {
//   main();
// });

// async function main() {
//   await getCurrentUser();
//   reg_logout_click_event();
// }

// async function getCurrentUser() {
//   let res = await fetch("user/getCurrentUser");
//   let res_json = await res.json();
//   console.log(res_json);
//   if (res_json.isErr) {
//     console.log(res_json.errMess);
//     user = { isLogin: false };
//   } else {
//     user = res_json.data;
//   }
//   render_all_form();
// }

// function reg_logout_click_event() {
//   console.log(123);
//   logout_form.addEventListener("submit", async (e) => {
//     e.preventDefault();

//     let res = await fetch("user/logout", {
//       headers: {
//         "Content-type": "Application/json",
//       },
//       method: "POST",
//       body: "",
//     });

//     let res_json = await res.json();

//     user = res_json.data;

//     if (!res_json.isErr) {
//       render_all_form();
//       window.location.href = "/";
//     } else {
//       alert(res_json.errMess);
//     }
//   });
// }

// async function render_all_form() {
//   if (user.isLogin) {
//     login_form.classList.add("isHide");
//     logout_form.classList.remove("isHide");
//     filterBtn.classList.remove("isHide");
//   } else {
//     login_form.classList.remove("isHide");
//     logout_form.classList.add("isHide");
//     filterBtn.classList.add("isHide");
//   }
// }
