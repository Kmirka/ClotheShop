// MARK: зміна фото hero
const images = document.querySelectorAll(".carousel-image");
let currentIndex = 0;

setInterval(() => {
  images[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add("active");
}, 3500); // змінює зображення кожні 3 секунди

// https://dribbble.com/shots/16271666-Vendre-Web-Design-for-Clothing-Store


// MARK: додаємо відгуки
let currentRating = 0;

function setRating(rating) {
  currentRating = rating;
  const stars = document.querySelectorAll("#starRating span");
  stars.forEach((star) => {
    star.textContent = star.dataset.value <= rating ? "★" : "☆";
  });
}

function loadReviews() {
  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  let reviewList = document.getElementById("reviewList");
  reviewList.innerHTML = "";
  reviews.forEach((r) => {
    let div = document.createElement("div");
    div.className = "review-card";
    div.innerHTML = `<h3>${r.name}</h3>
                             <p>${r.text}</p>
                             <p>Рейтинг: ${"★".repeat(r.rating)}${"☆".repeat(
      5 - r.rating
    )}</p>`;
    reviewList.appendChild(div);
  });
}

function addReview() {
  let name = document.getElementById("reviewName").value.trim();
  let text = document.getElementById("reviewText").value.trim();

  if (!name || !text || currentRating === 0) {
    alert("Заповніть усі поля та оберіть рейтинг!");
    return;
  }

  let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
  reviews.push({ name: name, text: text, rating: currentRating });
  localStorage.setItem("reviews", JSON.stringify(reviews));

  // Очищаємо форму
  document.getElementById("reviewName").value = "";
  document.getElementById("reviewText").value = "";
  setRating(0);

  loadReviews(); // оновлюємо список відгуків
}

document.addEventListener("DOMContentLoaded", loadReviews);
