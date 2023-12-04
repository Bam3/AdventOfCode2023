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
  let result = 0;
  let tempContainer = [];
  inputFileSplit.map((line) => {
    area.push(line.trim().split(""));
  });
  // 10 x 10
  let colAreaLimit = area.length - 1;
  let rowAreaLimitRow = area[0].length - 1;
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
    for (let row = 0; row < area[col].length; row++) {
      let checkNum = {
        number: 0,
        startCoo: [0,0],
        endCoo: [0,0],
        valid: false,
      }
      // get number and location
      if (isNumber(area[col][row])) {
        let midBufferNum = [];
        checkNum.startCoo = [col, row]
        midBufferNum.push(area[col][row])
        // searching for numbers until end of type numb
        for (let r = row + 1; r < area[col].length; r++) {
          if (isNumber(area[col][r])) {
            midBufferNum.push(area[col][r])
            row = r;
          } else break;
        }
        checkNum.number = parseInt(midBufferNum.join(""))
        checkNum.endCoo = [col, row]
        //check if the number is valid
        for (let inC = checkNum.startCoo[0] - 1; inC <= checkNum.startCoo[0] + 1; inC++) {
          for (let inR = checkNum.startCoo[1] - 1; inR <= checkNum.endCoo[1] + 1; inR++) {
            if (inC >= 0 && inR >= 0 && inC <= colAreaLimit && inR <= rowAreaLimitRow) {
              if (isSymbol(area[inC][inR])) {
                checkNum.valid = true;
                break;
              }
            }
          }
        }
        tempContainer.push(checkNum)       
      }
    }
  }
  console.log(tempContainer)
  tempContainer.forEach((number) => {
    number.valid ? result += number.number : result = result
  })
  console.log(result)
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
