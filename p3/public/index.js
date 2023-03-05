let user;

let login_form = document.querySelector(".login_form");

window.addEventListener("DOMContentLoaded", (event) => {
  main();
  checkLogin();
});

const checkLogin = async () => {
  const res = await fetch("/user/getCurrentUser", {
    method: "GET",
  });
  const json = await res.json();
  console.log(json.data.isLogin);
  if (json.data.isLogin) {
    mainBtn.classList.remove("hide");
    btnsRow.classList.add("hide");
    // window.location.href = "/main.html";
    return json;
  }
};

async function main() {
  reg_login_click_event();
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
          mainBtn.classList.remove("hide");
          btnsRow.classList.add("hide");
      // document.getElementById("#login_modal").classList.add("hide");
      // document.querySelector("#logout").classList.remove("hide");
      // document.querySelector("#signupBtn").classList.add("hide");

      // Sweet alert for login success
      let timerInterval;
      await Swal.fire({
        title: "成功登入!",
        html: "即將轉到您的主頁...",
        timer: 1000,
        timerProgressBar: true,
        confirmButtonColor: "#ff69b4",
        // didOpen: () => {
        //   Swal.showLoading();
        //   const b = Swal.getHtmlContainer().querySelector("b");
        //   timerInterval = setInterval(() => {
        //     b.textContent = Swal.getTimerLeft();
        //   }, 100);
        // },
        willClose: () => {
          clearInterval(timerInterval);
        },
      }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });

      render_all_form();
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: res_json.errMess,
        confirmButtonColor: "#ff69b4",
        // "您提交的資料發生錯誤， 請重試。",
        // footer: '<a href="">Why do I have this issue?</a>',
      });
      // alert(res_json.errMess);
      user = { isLogin: false };
    }
  });
}

async function render_all_form() {
  if (user.isLogin) {
    // hide btn fail after refreshing page
    mainBtn.classList.remove("hide");
    btnsRow.classList.add("hide");
    window.location.href = "/main.html";
    // if turn on await fetch, buttons will show again after redirect
    // await fetch (window.location.href = "/main.html");
    // let res = await fetch('')
  } else {
    // isHide class is not in html
    // login_form.classList.remove("isHide");
    btnsRow.classList.remove("hide");
  }
}