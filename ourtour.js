const DOM = {
  form: document.getElementById("tourForm"),
  toursContainer: document.getElementById("toursContainer"),
  tourTitle: document.getElementById("tourTitle"),
  tourDesc: document.getElementById("tourDesc"),
  tourImage: document.getElementById("tourImage"),
};

//izmestiti createTour van tourManager, u slucaju da se na taj deo dodaje jos opcija. Predlog.
const createTour = (title, image, desc) => ({
  id: crypto.randomUUID(),
  title,
  image,
  desc,
  getId() {
    return this.id;
  },
  getTitle() {
    return this.title;
  },
  getImage() {
    return this.image;
  },
  getDesc() {
    return this.desc;
  },
});

const tourManager = {
  tours: [],

  addTour(tour) {
    this.tours.push(tour);
  },

  removeTour(id) {
    this.tours = this.tours.filter((tourItem) => tourItem.getId() !== id);
    this.updateTours();
  },

  updateTours() {
    DOM.toursContainer.innerHTML = "";

    this.tours.forEach((tour) => {
      const card = document.createElement("div");
      card.classList.add("tour-card");

      card.innerHTML = `
        <img src="${tour.getImage()}" class="tour-img" />
        <div class="tour-info">
          <h3>${tour.getTitle()}</h3>
          <p>${tour.getDesc()}</p>
          <button class="not-btn" data-id="${tour.getId()}">Not Interested</button>
        </div>
      `;

      DOM.toursContainer.appendChild(card);
    });
  },

  removeTour(id) {
    this.tours = this.tours.filter((tourItem) => tourItem.getId() !== id);
    this.updateTours();
  },
};

DOM.form.addEventListener("submit", function (e) {
  e.preventDefault();

  const imageFile = DOM.tourImage.files[0];
  const imageURL = URL.createObjectURL(imageFile);

  const tour = tourManager.createTour(
    DOM.tourTitle.value,
    imageURL,
    DOM.tourDesc.value
  );

  tourManager.addTour(tour);
  tourManager.updateTours();

  DOM.form.reset();
});

DOM.toursContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("not-btn")) {
    const id = e.target.dataset.id;
    tourManager.removeTour(id);
  }
});
