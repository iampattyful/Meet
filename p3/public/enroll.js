let enrollForm = document.querySelector(".enrollForm")
enrollForm.addEventListener("submit",async e=>{
    e.preventDefault()
    const formData = new FormData(enrollment_form)
    const res = await fetch("/enroll", {
        method: "POST",
        body: formData,
      });
    const res_json = await res.json()
    if (res_json.isLogin) {
        res.status(200).redirect("/main.html")
    }
})
