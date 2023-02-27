var user;

let login_form = document.querySelector(".login_form");
let logout_form = document.querySelector(".logout_form");

window.addEventListener("DOMContentLoaded", (event) => {
  main();
});

async function main() {
  await getCurrentUser();

  reg_login_click_event();
  reg_logout_click_event();
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
async function reg_login_click_event() {
  login_form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let formData = new FormData(login_form);
    let res = await fetch("user/login", {
      method: "POST",
      body: formData,
    });

    let res_json = await res.json();

    if (!res_json.isErr) {
      user = res_json.data;
      console.log(user);
      render_all_form();
    } else {
      alert(res_json.errMess);
      user = { isLogin: false };
    }
  });
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
      render_all_form();
    } else {
      alert(res_json.errMess);
    }
  });
}

async function render_all_form() {
  if (user.isLogin) {
    login_form.classList.add("isHide");
    logout_form.classList.remove("isHide");
  } else {
    login_form.classList.remove("isHide");
    logout_form.classList.add("isHide");
  }
}
