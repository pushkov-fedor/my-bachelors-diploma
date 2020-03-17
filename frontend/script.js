document.getElementById("excel-button").addEventListener("click", event => {
  fetch("http://localhost:3000")
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.log(error));
});
