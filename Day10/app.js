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
  let myInput = inputFile.split("\n").map((line) => line.split(""));
  console.log(myInput)

  let result = [];
  let done = false;
  let middArr = [];
  let cooS = [];
  let directions = {
    "|": [0,0],
    "-": [0,0],
    "L": [0,0],
    "J" : [0,0],
    "7" : [0,0],  
    "F" : [0,0],
    "." : [0,0],
  }
  myInput.forEach((col, indexCol) => {
  col.forEach((row, indexRow) => {
    if (row === "S") {
      cooS = [indexCol, indexRow]
    }
  })
  });

  console.log(cooS," aje?");
}
