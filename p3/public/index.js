let user;

let login_form = document.querySelector(".login_form");

window.addEventListener("DOMContentLoaded", (event) => {
  main();
});

// async function main() {
//   reg_login_click_event();
// }

// async function reg_login_click_event() {
//   login_form.addEventListener("submit", async (e) => {
//     e.preventDefault();
//     let formData = new FormData(login_form);
//     let res = await fetch("user/login", {
//       method: "POST",
//       body: formData,
//     });

//     let res_json = await res.json();

//     if (!res_json.isErr) {
//       user = res_json.data;
//       console.log(user);
//       render_all_form();
//     } else {
//       alert(res_json.errMess);
//       user = { isLogin: false };
//     }
//   });
// }

async function render_all_form() {
  if (user.isLogin) {
    window.location.href = "/meet";
  } else {
    login_form.classList.remove("isHide");
  }
}
