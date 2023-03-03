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
  if (!res_json.isErr) {
    window.location.href = "/main.html";
  } else {
    alert(res_json.errMess);
  }
});

// Function to calculate the minimum date for the date input to prevent user to register with age < 18
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

  minYear = yyyy - 80; //Calculate Minimun Age (<80)
  maxYear = yyyy - 18; //Calculate Maximum Age (>18)

  var min = minYear + "-" + mm + "-" + dd;
  var max = maxYear + "-" + mm + "-" + dd;

  document.getElementById("start").setAttribute("min", min);
  document.getElementById("start").setAttribute("max", max);
};

// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})()