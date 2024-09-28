const createHead = () => {
  let thead = document.createElement("thead");
  let tr = document.createElement("tr");
  let blank = document.createElement("th");

  tr.appendChild(blank);
  for (i = 1; i <= 30; i++) {
    let th = document.createElement("th");
    th.textContent = `hoge${i}`;
    th.id = `h${i}`;
    tr.appendChild(th);
  }
  thead.appendChild(tr);
  return thead;
};

const createBody = () => {
  let tbody = document.createElement("tbody");
  for (j = 1; j <= 100; j++) {
    let tr = document.createElement("tr");
    let blank = document.createElement("td");
    blank.textContent = j;
    blank.id = `r${j}`;
    tr.appendChild(blank);
    tr.classList.add("dataRow");
    for (i = 1; i <= 30; i++) {
      let td = document.createElement("td");
      td.textContent = `hoge${i}の${j}`;
      td.classList.add("cell");
      td.id = `cell-${j}-${i}`;
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }
  return tbody;
};

$editTable.appendChild(createHead());
$editTable.appendChild(createBody());

let currentCol;
let currentRow;
let currentCell;

Array.from(document.getElementsByClassName("cell")).forEach((td) => {
  td.addEventListener("click", () => {
    if (currentCell != undefined) {
      currentCell.classList.remove("selectCell");
      currentCol.classList.remove("selectIndex");
      currentRow.classList.remove("selectIndex");
      if (currentCell.id == td.id) {
        currentCell = undefined;
        return;
      }
    }

    td.classList.add("selectCell");

    let id = td.id.split("-");
    currentCol = document.getElementById(`h${id[2]}`);
    currentRow = document.getElementById(`r${id[1]}`);

    currentCol.classList.add("selectIndex");
    currentRow.classList.add("selectIndex");
    currentCell = td;
  });
});

$searchText.addEventListener("keyup", () => {
  let kws = $searchText.value.toLowerCase().split(",");
  for (let r of $editTable.getElementsByClassName("dataRow")) {
    let textContent = r.textContent.toLowerCase();
    r.style.display = "";
    if (kws.find((e) => textContent.indexOf(e) == -1) !== undefined) {
      r.style.display = "none";
    }
  }
});
