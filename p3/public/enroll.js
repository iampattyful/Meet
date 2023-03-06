// This file is used to handle the enroll front-end logic
// Function to calculate the minimum date for the date input to prevent user to register with age < 18
// not support on mobile safari
window.onload = function () {
  var date = new Date();
  var dd = date.getDate();
  var mm = date.getMonth() + 1;
  var yyyy = date.getFullYear();

  //Add a zero if one Digit (eg: 05,09)
  if (dd < 10) {
    dd = "0" + dd;
  }

  //Add a zero if one Digit (eg: 05,09)
  if (mm < 10) {
    mm = "0" + mm;
  }

  minYear = yyyy - 100; //Calculate Minimun Age (<80)
  maxYear = yyyy - 18; //Calculate Maximum Age (>18)

  var min = minYear + "-" + mm + "-" + dd;
  var max = maxYear + "-" + mm + "-" + dd;

  document.getElementById("start").setAttribute("min", min);
  document.getElementById("start").setAttribute("max", max);
};

// Example starter JavaScript for disabling form submissions if there are invalid fields
const invalidValidation = async function () {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false
    );
  });
};

invalidValidation();

// Submit the form data to the server
let enrollForm = document.querySelector("#enroll_form");
enrollForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = event.target;
  const formData = new FormData(form);
  const res = await fetch("/user/enroll", {
    method: "POST",
    body: formData,
  });
  const res_json = await res.json();
  console.log(res_json);

  if (
    res_json.errMess ===
    'insert into "users" ("date_of_birth", "email", "gender", "is_admin", "is_public", "password", "user_icon", "username") values ($1, $2, $3, $4, $5, $6, $7, $8) returning "id" - duplicate key value violates unique constraint "users_email_unique" - /enroll'
  ) {
    // Sweet alert for duplicate email
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "此電郵地址已被註冊",
      confirmButtonColor: "#ff69b4",
    });
  } else if (
    res_json.errMess ===
    "AI無法識別相片中是否存在面孔,請上載其他相片! - /enroll"
  ) {
    // Sweet alert for no face detected
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "AI無法識別相片中是否存在面孔,請上載其他相片!",
      confirmButtonColor: "#ff69b4",
    });
  } else if (
    res_json.errMess ===
    "你輸入的資料似乎有誤,請務必使用真實的出生日期。 - /enroll"
  ) {
    // console.log(res_json.data+ "null");
    // Sweet alert for null data
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "你輸入的資料似乎有誤,請務必使用真實的出生日期。",
      confirmButtonColor: "#ff69b4",
    });
  // } else if (
  //   res_json.errMess === "你輸入的資料似乎有誤,請填寫所有資料。 - /enroll"
  // ) {
  //   // console.log(res_json.data+ "null");
  //   // Sweet alert for null data
  //   Swal.fire({
  //     icon: "error",
  //     title: "Oops...",
  //     text: "你輸入的資料似乎有誤,請填寫所有資料。",
  //     confirmButtonColor: "#ff69b4",
  //   });
  } else if (!res_json.isErr) {
    // Sweet alert for enroll success
    let timerInterval;
    await Swal.fire({
      title: "成功註冊!",
      html: "恭喜您!您已通過人工智能照片驗證!",
      timer: 1000,
      timerProgressBar: true,
      confirmButtonColor: "#ff69b4",
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
      if (result.dismiss === Swal.DismissReason.timer) {
        console.log("I was closed by the timer");
      }
    });
    window.location.href = "/main.html";
  } else {
    // Sweet alert for other error
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: "發生錯誤,請重試!",
      confirmButtonColor: "#ff69b4",
    });
  }
});
