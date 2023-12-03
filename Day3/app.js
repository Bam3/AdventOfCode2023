function readFile(files) {
  const fileToRead = files[0];
  const reader = new window.FileReader();
  reader.readAsText(fileToRead);
  reader.onload = loadHandler;
}
document.querySelector("#fileInput").addEventListener("change", function () {
  readFile(this.files);
});
// funkcija load File
function loadHandler(event) {
  const content = event.target.result;
  start(content);
}

function start(inputFile) {
  let inputFileSplit = inputFile.trim().split("\n");
  let area = [];
  let searchNum = [];

  inputFileSplit.map((line) => {
    area.push(line.split(""));
  });
  // 10 x 10
  let colAreaLimit = area.length - 1;
  let rowAreaLimitRow = area[0].length - 1;
  console.log(area.length, colAreaLimit);
  console.log(area[0].length, rowAreaLimitRow);

  //row ->
  //| col
  //v
  //  '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
  // ['4', '6', '7', '.', '.', '1', '1', '4', '.', '.']
  // ['.', '.', '*', '.', '.', '.', '.', '.', '.', '.']
  // ['.', '.', '3', '5', '.', '.', '6', '3', '3', '.']
  // ['.', '.', '.', '.', '.', '.', '#', '.', '.', '.']
  // ['6', '1', '7', '*', '.', '.', '.', '.', '.', '.']
  // ['.', '.', '.', '.', '.', '.', '.', '5', '8', '.']
  // ['.', '*', '5', '9', '2', '.', '.', '.', '.', '.']
  // ['.', '.', '.', '.', '.', '.', '7', '5', '5', '.']
  // ['.', '.', '.', '$', '.', '*', '.', '.', '.', '.']
  // ['.', '6', '6', '4', '.', '5', '9', '8', '.', '.']
  for (let col = 0; col < area.length; col++) {
    let tempContainer = [];
    for (let row = 0; row < area[col].length; row++) {
      //console.log(col, row);
      //if number go in
      if (isNumber(area[col][row])) {
        if (
          col + 1 <= colAreaLimit &&
          row + 1 <= rowAreaLimitRow &&
          isSymbol(area[col + 1][row + 1])
        ) {
          tempContainer.push(area[col][row], "Sym");
        }
        //if down is symbol then valid
        else if (col + 1 <= colAreaLimit && isSymbol(area[col + 1][row])) {
          tempContainer.push(area[col][row], "Sym");
        }
        //if down left diagonal is symbol then valid
        else if (
          col + 1 <= colAreaLimit &&
          row - 1 >= 0 &&
          isSymbol(area[col + 1][row - 1])
        ) {
          tempContainer.push(area[col][row], "Sym");
        }
        //if up left diagonal is symbol then valid
        else if (
          col - 1 >= 0 &&
          row - 1 >= 0 &&
          isSymbol(area[col - 1][row - 1])
        ) {
          tempContainer.push(area[col][row], "Sym");
        }
        //if up is symbol then valid
        else if (col - 1 >= 0 && isSymbol(area[col - 1][row])) {
          tempContainer.push(area[col][row], "Sym");
        }
        //if up right diagonal is symbol then valid
        else if (
          col - 1 >= 0 &&
          row + 1 <= rowAreaLimitRow &&
          isSymbol(area[col - 1][row + 1])
        ) {
          tempContainer.push(area[col][row], "Sym");
        }
        //if next is symbol then valid
        else if (row + 1 <= rowAreaLimitRow && isSymbol(area[col][row + 1])) {
          tempContainer.push(area[col][row], "Sym");
        } else if (row + 1 <= rowAreaLimitRow && isNumber(area[col][row + 1])) {
          tempContainer.push(area[col][row]);
        }

        //if previus is symbol or number then valid
        else if (row - 1 >= 0 && isSymbol(area[col][row - 1])) {
          tempContainer.push(area[col][row], "Sym");
        } else if (row - 1 >= 0 && isNumber(area[col][row - 1])) {
          tempContainer.push(area[col][row]);
        }
      } else if (area[col][row] === ".") {
        //console.log(tempContainer);
        // check if symb in array
        //!!!!!!!!!!!infront of is not working!!!!!!!!!!1
        tempContainer.forEach((e) => {
          if (tempContainer.indexOf("Sym") > -1) {
            do {
              tempContainer.splice(tempContainer.indexOf("Sym"), 1);
            } while (tempContainer.indexOf("Sym") > -1);
            searchNum.push(parseInt(tempContainer.join("")));
            tempContainer = [];
          } else {
            tempContainer = [];
          }
        });
      }
      console.log(searchNum);
      //if down right diagonal is symbol then valid
    }
  }
  console.log(searchNum.reduce((a, b) => a + b, 0));
}

function isNumber(input) {
  if (!isNaN(input)) {
    return true;
  } else {
    return false;
  }
}

function isSymbol(input) {
  if (isNumber(input) || input === ".") {
    return false;
  } else {
    return true;
  }
}
