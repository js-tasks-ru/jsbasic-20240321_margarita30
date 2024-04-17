export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.render();
    this.elem.addEventListener("click", this.onButtonClick.bind(this));
  }

  render() {
    this.elem = document.createElement("div");
    this.elem.className = "card";

    this.elem.innerHTML = `
        <div class="card__top">
            <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
            <span class="card__price">€${this.product.price.toFixed(2)}</span>
        </div>
        <div class="card__body">
            <div class="card__title">${this.product.name}</div>
            <button type="button" class="card__button">
                <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
        </div>
    `;
  }

  onButtonClick() {
    this.elem.dispatchEvent(
      new CustomEvent("product-add", {
        detail: this.product.id,
        bubbles: true,
      })
    );
  }
}
