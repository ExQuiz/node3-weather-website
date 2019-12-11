const weatherForm = document.querySelector("form");
const inputField = document.querySelector("input");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const url = `http://localhost:3000/weather?address=${inputField.value}`;
  message1.textContent = "Loading ... ";
  message2.textContent = "";

  fetch(url).then(res => {
    res.json().then(data => {
      if (data.error) {
        message1.textContent = data.error;
        console.log(data.error);
      } else {
        console.log(data.location);
        console.log(data.forecast);
        message1.textContent = data.location;
        message2.textContent = data.forecast;
      }
    });
  });

  inputField.value = "";
});
