import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.modalElement = document.createElement("div");
    this.modalElement.classList.add("modal");
    this.modalElement.innerHTML = `
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header">
            <button type="button" class="modal__close">
              <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
            </button>
            <h3 class="modal__title"></h3>
          </div>
          <div class="modal__body"></div>
        </div>`;

    this.closeButton = this.modalElement.querySelector(".modal__close");
    this.overlay = this.modalElement.querySelector(".modal__overlay");

    this.closeButton.addEventListener("click", this.close.bind(this));
    this.overlay.addEventListener("click", this.close.bind(this));
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }

  open() {
    document.body.appendChild(this.modalElement);
    document.body.classList.add("is-modal-open");
  }

  setTitle(title) {
    const titleElement = this.modalElement.querySelector(".modal__title");
    titleElement.textContent = title;
  }

  setBody(node) {
    const bodyElement = this.modalElement.querySelector(".modal__body");
    bodyElement.innerHTML = "";
    bodyElement.appendChild(node);
  }

  close() {
    this.modalElement.remove();
    document.body.classList.remove("is-modal-open");
    document.removeEventListener("keydown", this.handleKeyDown);
  }

  handleKeyDown(event) {
    if (event.code === "Escape") {
      this.close();
    }
  }
}
