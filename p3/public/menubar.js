window.addEventListener("DOMContentLoaded", (event) => {
  menu_main();
});

async function menu_main() {
  await renderMenuBar();
}
async function renderMenuBar() {
  let menubar = document.querySelector("#menubar");

  menubar.innerHTML = `
  <div class="menubarTable">
              
              <a href="group.html">
                <button type="button" class="btn btn-outline-secondary">
                  messageList
                </button>
              </a>
              
              <button type="button" id="editProfile" class="btn btn-outline-secondary">
                editProfile
              </button>
              
            </div>
  `;
  await reg_open_editProfile_click_event();
}

async function reg_open_editProfile_click_event() {
  let editProfileBtn = document.querySelector("#editProfile");
  editProfileBtn.addEventListener("click", async (e) => {
    let edit_form = document.querySelector(".editForm");
    let logout_form = document.querySelector(".logout_form");
    let filterBtn = document.querySelector(".btn");
    let content = document.querySelector(".content");
    logout_form.classList.remove("isHide");
    edit_form.classList.remove("isHide");
    filterBtn.classList.add("isHide");
    content.classList.add("isHide");
    await reg_exitEditForm_click_event();
  });
}
function reg_exitEditForm_click_event() {
  let exit_edit_form_btn = document.querySelector("#exitEditFormBtn");
  exit_edit_form_btn.addEventListener("click", (e) => {
    e.preventDefault();
    let edit_form = document.querySelector(".editForm");
    let logout_form = document.querySelector(".logout_form");
    let filterBtn = document.querySelector(".btn");
    let content = document.querySelector(".content");
    logout_form.classList.add("isHide");
    edit_form.classList.add("isHide");
    filterBtn.classList.remove("isHide");
    content.classList.remove("isHide");
  });
}
