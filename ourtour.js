const DOM = {
  form: document.getElementById("tourForm"),
  toursContainer: document.getElementById("toursContainer"),
  tourTitle: document.getElementById("tourTitle"),
  tourSubtitle: document.getElementById("tourSubtitle"),
  tourDesc: document.getElementById("tourDesc"),
  tourImage: document.getElementById("tourImage"),
};

const tourManager = {
  tours: [],

  createTour(title, subtitle, image, desc) {
    return {
      id: crypto.randomUUID(),
      title,
      subtitle,
      image,
      desc,
    };
  },

  addTour(tour) {
    this.tours.push(tour);
  },

  renderTours() {
    DOM.toursContainer.innerHTML = "";
    this.tours.forEach((tour) => {
      const card = document.createElement("div");
      card.classList.add("tour-card");

      card.innerHTML = `
        <img src="${tour.image}" class="tour-img" />
        <div class="tour-info">
          <h3>${tour.title}</h3>
          <p>${tour.desc}</p>
          <button class="not-btn" data-id="${tour.id}">Not Interested</button>
        </div>
      `;

      DOM.toursContainer.appendChild(card);
    });
  },

  removeTour(id) {
    this.tours = this.tours.filter((t) => t.id !== id);
    this.renderTours();
  },
};

DOM.form.addEventListener("submit", function (e) {
  e.preventDefault();

  const tour = tourManager.createTour(
    DOM.tourTitle.value,
    DOM.tourSubtitle.value,
    DOM.tourImage.value,
    DOM.tourDesc.value
  );

  tourManager.addTour(tour);
  tourManager.renderTours();

  DOM.form.reset();
});

DOM.toursContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("not-btn")) {
    const id = e.target.dataset.id;
    tourManager.removeTour(id);
  }
});
