function highlight(table) {
  for (let i = 0; i < table.rows.length; i++) {
    let statusCell = table.rows[i].cells[3];
    let isAvailable = statusCell.getAttribute("data-available");

    if (isAvailable === null) {
      table.rows[i].setAttribute("hidden", "hidden");
    } else {
      table.rows[i].classList.add(
        isAvailable === "true" ? "available" : "unavailable"
      );
    }

    let genderCell = table.rows[i].cells[2];
    let gender = genderCell.innerHTML;

    table.rows[i].classList.add(gender === "m" ? "male" : "female");

    let ageCell = table.rows[i].cells[1];
    if (parseInt(ageCell.innerHTML) < 18) {
      table.rows[i].style = "text-decoration: line-through";
    }
  }
}
