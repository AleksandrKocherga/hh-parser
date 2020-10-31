const inputs = document.querySelectorAll(".form-control input");
const labels = document.querySelectorAll(".form-control label");
const formSearch = document.getElementsByName("searchForm")[0];
const formAdmin = document.getElementsByName("formAdmin")[0];

const adminText = document.getElementsByName("adminText");
const adminBtn = document.getElementsByName("adminBtn");

labels.forEach((label) => {
  label.innerHTML = label.innerText
    .split("")
    .map(
      (letter, idx) =>
        `<span style="transition-delay: ${idx * 50}ms">${letter}</span>`
    )
    .join("");
});

formSearch.addEventListener("submit", async (event) => {
  event.preventDefault();

  let text = event.target.searchText.value;
  const action = event.target.action;
  const method = event.target.method;
  console.log(text);
  await fetch(action, {
    method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ text }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Request succeeded with JSON response", data);

      let average = document.querySelector(".average-salary-inner");
      average.innerHTML = data.sumSal;
      // data.uniqueSkills.forEach((item) => (document.body.innerHTML += item));

      let stack = document.querySelector(".average-stack-inner");
      data.uniqueSkills.forEach(async (item) => {
        let block = document.createElement("span");
        block.innerHTML = item;
        await block.classList.add("item");
        stack.appendChild(block);
      });
    })
    .catch((error) => {
      console.log("Request failed", error);
    });
});

formAdmin.addEventListener("submit", async (event) => {
  event.preventDefault();
  let loader = document.querySelector("#loader");
  loader.classList.toggle("active");
  let text = event.target.adminText.value;
  const action = event.target.action;
  const method = event.target.method;
  await fetch(action, {
    method,
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({ text }),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Request succeeded with JSON response", data);
      loader.classList.toggle("active");
    })
    .catch((error) => {
      console.log("Request failed", error);
      loader.classList.toggle("active");
    });
});
