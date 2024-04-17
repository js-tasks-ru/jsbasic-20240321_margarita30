/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.rows = rows;
    this.elem = this.generateTable();
  }

  generateTable() {
    let table = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");

    let headers = ["Имя", "Возраст", "Зарплата", "Город", ""];
    let headerRow = document.createElement("tr");
    let headerCells = headers.map((headerText) => {
      let th = document.createElement("th");
      th.textContent = headerText;
      return th;
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    this.rows
      .map((rowData) => {
        let row = document.createElement("tr");
        let cells = Object.values(rowData).map((value) => {
          let cell = document.createElement("td");
          cell.textContent = value;
          return cell;
        });
        return { row, cells };
      })
      .forEach(({ row, cells }) => {
        cells.forEach((cell) => row.appendChild(cell));

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "X";
        deleteButton.addEventListener("click", () => this.deleteRow(row));
        let deleteCell = document.createElement("td");
        deleteCell.appendChild(deleteButton);
        row.appendChild(deleteCell);

        tbody.appendChild(row);
      });

    table.appendChild(tbody);
    return table;
  }

  deleteRow(row) {
    row.remove();
  }
}
