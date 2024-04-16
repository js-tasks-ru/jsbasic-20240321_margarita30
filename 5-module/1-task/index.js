function hideSelf() {
  let button = document.querySelector(".hide-self-button");
  let onClick = () => {
    button.hidden = true;
  };
  button.addEventListener("click", onClick);
}
