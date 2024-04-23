export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.render();
    this.initEventListeners();
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.classList.add("slider");
    this.elem.innerHTML = `
      <div class="slider__thumb" style="left: ${this.value * (100 / (this.steps - 1))}%;">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: ${this.value * (100 / (this.steps - 1))}%;"></div>
      <div class="slider__steps">
        ${Array.from({ length: this.steps })
          .map(
            (_, index) => `
          <span ${index === this.value ? 'class="slider__step-active"' : ""}></span>
        `
          )
          .join("")}
      </div>
    `;

    let thumb = this.elem.querySelector(".slider__thumb");
    thumb.ondragstart = () => false;
  }

  initEventListeners() {
    const thumb = this.elem.querySelector(".slider__thumb");
    thumb.addEventListener("pointerdown", this.onThumbPointerDown.bind(this));

    this.elem.addEventListener("click", this.onSliderClick.bind(this));

    document.addEventListener(
      "pointermove",
      this.onDocumentPointerMove.bind(this)
    );
    document.addEventListener("pointerup", this.onDocumentPointerUp.bind(this));
  }

  onThumbPointerDown(event) {
    event.preventDefault();

    this.elem.classList.add("slider_dragging");

    this.updateThumbPosition(event);
  }

  onDocumentPointerMove(event) {
    if (!this.elem.classList.contains("slider_dragging")) return;

    this.updateThumbPosition(event);
  }

  onDocumentPointerUp(event) {
    this.elem.classList.remove("slider_dragging");

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  }

  onSliderClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;

    this.value = Math.round(leftRelative * (this.steps - 1));

    this.updateThumbAndProgress();

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  }

  updateThumbPosition(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    let leftRelative = left / this.elem.offsetWidth;

    leftRelative = Math.max(0, Math.min(leftRelative, 1));

    const thumb = this.elem.querySelector(".slider__thumb");
    thumb.style.left = `${leftRelative * 100}%`;

    const progress = this.elem.querySelector(".slider__progress");
    progress.style.width = `${leftRelative * 100}%`;

    this.value = Math.round(leftRelative * (this.steps - 1));

    const valueDisplay = this.elem.querySelector(".slider__value");
    valueDisplay.textContent = this.value;

    const steps = this.elem.querySelectorAll(".slider__steps span");
    steps.forEach((step, index) => {
      if (index === this.value) {
        step.classList.add("slider__step-active");
      } else {
        step.classList.remove("slider__step-active");
      }
    });
  }

  updateThumbAndProgress() {
    const thumb = this.elem.querySelector(".slider__thumb");
    thumb.style.left = `${this.value * (100 / (this.steps - 1))}%`;

    const progress = this.elem.querySelector(".slider__progress");
    progress.style.width = `${this.value * (100 / (this.steps - 1))}%`;

    const valueDisplay = this.elem.querySelector(".slider__value");
    valueDisplay.textContent = this.value;

    const steps = this.elem.querySelectorAll(".slider__steps span");
    steps.forEach((step, index) => {
      if (index === this.value) {
        step.classList.add("slider__step-active");
      } else {
        step.classList.remove("slider__step-active");
      }
    });
  }
}
