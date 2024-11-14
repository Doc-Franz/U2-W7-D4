const apiKey = "aysEAKeJz4RjK7b00tg26Tssth8LOHH5SCpBisycOubKTu3Mj5nsxxR4";
const cardImage = document.querySelectorAll(".card > img");
const edit = document.querySelectorAll(".edit");
const small = document.querySelectorAll("small");
const form = document.querySelector("form");

const handleLoadImages = (url) => (e) => {
  e.preventDefault();

  fetch(url, {
    method: "GET",
    headers: { Authorization: apiKey }
  })
    .then((response) => {
      console.log(response);
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("errore nella chiamta");
      }
    })
    .then((image) => {
      const urlImage = image["photos"][0]["src"]["original"];
      const idCard = image["photos"][0]["id"];

      cardImage.forEach((element) => {
        element.src = urlImage;
        small.forEach((element) => {
          element.innerText = idCard;
        });
      });
      edit.forEach((element) => {
        element.innerText = "Hide";
        element.onclick = () => {
          const cardToRemove = element.closest(".card.mb-4.shadow-sm");
          cardToRemove.remove();
        };
      });
    })
    .catch((error) => {
      console.log("error", error);
    });
};

window.addEventListener("DOMContentLoaded", () => {
  const loadImagesBtn = document.querySelector(".btn-primary");
  loadImagesBtn.onclick = handleLoadImages("https://api.pexels.com/v1/search?query=nature&per_page=1");

  const loadSecondaryImagesBtn = document.querySelector(".btn-secondary");
  loadSecondaryImagesBtn.onclick = handleLoadImages("https://api.pexels.com/v1/search/?page=2&per_page=1&query=nature");

  form.onsubmit = handleLoadImages("https://api.pexels.com/v1/search?query=people&per_page=1");
});
