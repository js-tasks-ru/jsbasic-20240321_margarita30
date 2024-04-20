function initCarousel() {

  let carouselInner = document.querySelector(".carousel__inner");
  let buttonRight = document.querySelector(".carousel__arrow_right");
  let buttonLeft = document.querySelector(".carousel__arrow_left");
  let slideWidth = carouselInner.children[0].offsetWidth;

  let currentSlideIndex = 0;

  function updateNavigationButtons() {
    if (currentSlideIndex === 0) {
      buttonLeft.style.display = "none";
    } else {
      buttonLeft.style.display = "";
    }

    if (currentSlideIndex === carouselInner.children.length - 1) {
      buttonRight.style.display = "none";
    } else {
      buttonRight.style.display = "";
    }
  }

  updateNavigationButtons();

  buttonRight.addEventListener("click", () => {
    currentSlideIndex = Math.min(
      currentSlideIndex + 1,
      carouselInner.children.length - 1
    );
    carouselInner.style.transform =
      "translateX(-" + currentSlideIndex * slideWidth + "px)";
    updateNavigationButtons();
  });

  buttonLeft.addEventListener("click", () => {
    currentSlideIndex = Math.max(currentSlideIndex - 1, 0);
    carouselInner.style.transform =
      "translateX(-" + currentSlideIndex * slideWidth + "px)";
    updateNavigationButtons();
  });
}
