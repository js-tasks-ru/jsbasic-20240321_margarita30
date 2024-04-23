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
      <div class="slider__thumb">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress"></div>
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
  }

  initEventListeners() {
    this.elem.addEventListener("click", this.onSliderClick.bind(this));
  }

  onSliderClick(event) {
    const left = event.clientX - this.elem.getBoundingClientRect().left;
    const leftRelative = left / this.elem.offsetWidth;
    const segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);
    const valuePercents = (value / segments) * 100;

    this.value = value;

    const thumb = this.elem.querySelector(".slider__thumb");
    thumb.style.left = `${valuePercents}%`;

    const progress = this.elem.querySelector(".slider__progress");
    progress.style.width = `${valuePercents}%`;

    const steps = this.elem.querySelectorAll(".slider__steps span");
    steps.forEach((step, index) => {
      if (index === value) {
        step.classList.add("slider__step-active");
      } else {
        step.classList.remove("slider__step-active");
      }
    });

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  }
}
