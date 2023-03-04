let user;

let login_form = document.querySelector(".login_form");

window.addEventListener("DOMContentLoaded", (event) => {
  main();
});

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

      // Sweet alert for login success
      let timerInterval;
      await Swal.fire({
        title: "成功登入!",
        html: "即將轉到您的主頁...",
        timer: 1000,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
          const b = Swal.getHtmlContainer().querySelector("b");
          timerInterval = setInterval(() => {
            b.textContent = Swal.getTimerLeft();
          }, 100);
        },
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
    window.location.href = "/main.html";
    // let res = await fetch('')
  } else {
    login_form.classList.remove("isHide");
  }
}
