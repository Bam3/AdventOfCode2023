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
  let tempContainer = [];
  inputFileSplit.map((line) => {
    area.push(line.trim().split(""));
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
   
    for (let row = 0; row < area[col].length; row++) {
      let checkNum = {
        number: 0,
        startCoo: [0,0],
        endCoo: [0,0],
        valid: false,
      }
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
        tempContainer.push(checkNum)       
      }
    }
    
  }
  console.log(tempContainer)
}
  //console.log(searchNum.reduce((a, b) => a + b, 0));

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
