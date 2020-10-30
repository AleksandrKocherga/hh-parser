const form = document.getElementsByName("registrationForm")[0];

const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const rigist = document.querySelector(".rigist");


form.addEventListener("submit", async (event) => {
  event.preventDefault();

  let name = event.target.registrationName.value;
  let password = event.target.registrationPassword.value;
  let email = event.target.registrationEmail.value;
  let admin;
  if (event.target.admin.checked) {
    admin = true;
  } else {
    admin = false;
  }
  const action = event.target.action;
  const method = event.target.method;
  await fetch(action, {
    method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ name, password, email, admin }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Request succeeded with JSON response", data);
    })
    .catch((error) => {
      console.log("Request failed", error);
    });

  window.location.href = "/main";
});

// круг
sign_up_btn.addEventListener("click", () => {
  rigist.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener("click", () => {
  rigist.classList.remove("sign-up-mode");
});

// adminform
