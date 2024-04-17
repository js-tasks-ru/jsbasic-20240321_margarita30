import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
    this.currentSlideIndex = 0;
    this.elem.addEventListener("click", this.onButtonClick.bind(this));
    this.elem.querySelector(".carousel__arrow_right").addEventListener("click", this.onNextButtonClick.bind(this));
    this.elem.querySelector(".carousel__arrow_left").addEventListener("click", this.onPrevButtonClick.bind(this));
  }

  render() {
    const elem = document.createElement("div");
    elem.className = "carousel";

    let slidesHTML = '';
    for (const slide of this.slides) {
      slidesHTML += `
        <div class="carousel__slide" data-id="${slide.id}">
          <img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${slide.price.toFixed(2)}</span>
            <div class="carousel__title">${slide.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
      `;
    }

    elem.innerHTML = `
      <div class="carousel__inner">
        ${slidesHTML}
      </div>
      <button class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <button class="carousel__arrow carousel__arrow_left" style="display: none;">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </button>
    `;

    this._elem = elem;
  }

  onButtonClick(event) {
    if (event.target.closest('.carousel__button')) {
      const slideId = event.target.closest('.carousel__slide').dataset.id;
      this.elem.dispatchEvent(
        new CustomEvent("product-add", {
          detail: slideId,
          bubbles: true,
        })
      );
    }
  }

  onNextButtonClick() {
    this.currentSlideIndex = Math.min(
      this.currentSlideIndex + 1,
      this.slides.length - 1
    );
    this.updateCarouselPosition();
  }

  onPrevButtonClick() {
    this.currentSlideIndex = Math.max(this.currentSlideIndex - 1, 0);
    this.updateCarouselPosition();
  }

  updateCarouselPosition() {
    const carouselInner = this.elem.querySelector('.carousel__inner');
    const slideWidth = carouselInner.offsetWidth;
    carouselInner.style.transform = `translateX(-${this.currentSlideIndex * slideWidth}px)`;
    this.updateNavigationButtons();
  }

  updateNavigationButtons() {
    const buttonLeft = this.elem.querySelector(".carousel__arrow_left");
    const buttonRight = this.elem.querySelector(".carousel__arrow_right");

    if (this.currentSlideIndex === 0) {
      buttonLeft.style.display = "none";
    } else {
      buttonLeft.style.display = "";
    }

    if (this.currentSlideIndex === this.slides.length - 1) {
      buttonRight.style.display = "none";
    } else {
      buttonRight.style.display = "";
    }
  }

  get elem() {
    return this._elem;
  }
}
