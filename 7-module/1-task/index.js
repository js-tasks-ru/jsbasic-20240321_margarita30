import createElement from "../../assets/lib/create-element.js";

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.classList.add("ribbon");

    const leftButton = document.createElement("button");
    leftButton.classList.add(
      "ribbon__arrow",
      "ribbon__arrow_left",
      "ribbon__arrow_visible"
    );
    leftButton.innerHTML =
      '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';
    leftButton.addEventListener("click", () => this.scrollLeft());

    const rightButton = document.createElement("button");
    rightButton.classList.add("ribbon__arrow", "ribbon__arrow_right");
    rightButton.innerHTML =
      '<img src="/assets/images/icons/angle-icon.svg" alt="icon">';
    rightButton.addEventListener("click", () => this.scrollRight());

    const inner = document.createElement("nav");
    inner.classList.add("ribbon__inner");

    this.categories.forEach((category) => {
      const item = document.createElement("a");
      item.href = "#";
      item.classList.add("ribbon__item");
      item.dataset.id = category.id;
      item.textContent = category.name;
      item.addEventListener("click", (event) =>
        this.selectCategory(event, category.id)
      );
      inner.appendChild(item);
    });

    this.elem.appendChild(leftButton);
    this.elem.appendChild(inner);
    this.elem.appendChild(rightButton);

    document.body.appendChild(this.elem);
  }

  scrollLeft() {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    ribbonInner.scrollBy(-350, 0);
    this.toggleArrowsVisibility();
  }

  scrollRight() {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    ribbonInner.scrollBy(350, 0);
    this.toggleArrowsVisibility();
  }

  toggleArrowsVisibility() {
    const ribbonInner = this.elem.querySelector(".ribbon__inner");
    const scrollLeft = ribbonInner.scrollLeft;
    const scrollWidth = ribbonInner.scrollWidth;
    const clientWidth = ribbonInner.clientWidth;
    const scrollRight = scrollWidth - scrollLeft - clientWidth;

    const leftButton = this.elem.querySelector(".ribbon__arrow_left");
    const rightButton = this.elem.querySelector(".ribbon__arrow_right");

    leftButton.classList.toggle("ribbon__arrow_visible", scrollLeft > 0);
    rightButton.classList.toggle("ribbon__arrow_visible", scrollRight > 1);
  }

  selectCategory(event, categoryId) {
    event.preventDefault();

    const currentItem = this.elem.querySelector(".ribbon__item_active");
    if (currentItem) {
      currentItem.classList.remove("ribbon__item_active");
    }

    const selectedItem = event.target;
    selectedItem.classList.add("ribbon__item_active");

    const selectEvent = new CustomEvent("ribbon-select", {
      detail: categoryId,
      bubbles: true,
    });

    this.elem.dispatchEvent(selectEvent);
  }
}

let ribbonMenu = new RibbonMenu(categories);
