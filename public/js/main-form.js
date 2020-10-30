const inputs = document.querySelectorAll(".form-control input");
const labels = document.querySelectorAll(".form-control label");
const formSearch = document.getElementsByName("searchForm")[0];

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, idx) =>
        `<span style="transition-delay: ${idx * 50}ms">${letter}</span>`
    )
    .join("");
});

// formSearch.addEventListener("submit", async (event) => {
//   event.preventDefault();

//   let text = event.target.searchText.value;
//   const action = event.target.action;
//   const method = event.target.method;
//   await fetch(action, {
//     method,
//     headers: {
//       "Content-type": "application/json",
//     },
//     body: JSON.stringify(text),
//   })
//     .then((res) => res.json())
//     .then((data) => {
//       console.log("Request succeeded with JSON response", data);
//     })
//     .catch((error) => {
//       console.log("Request failed", error);
//     });
// });
