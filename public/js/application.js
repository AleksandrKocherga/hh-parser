const form = document.getElementsByName("registrationForm")[0];



form.addEventListener("submit", async (event) => {
  // let {action, method, registrationName, registrationEmail, registrationPassword} = event.target;

  // console.log(action, method, registrationName, registrationEmail, registrationPassword);

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


