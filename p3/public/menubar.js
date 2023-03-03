let menubar = document.querySelector("#menubar");
menubar.innerHTML = `
<div class="menubarTable">
            <button type="button" class="btn btn-outline-secondary">
              meetPage
            </button>
            <a href="socket.html">
              <button type="button" class="btn btn-outline-secondary">
                messageList
              </button>
            </a>
            <a href="edit_personal_info.html">
              <button type="button" class="btn btn-outline-secondary">
                editProfile
              </button>
            </a>
          </div>
`;
