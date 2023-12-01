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
  let result = 0;
  arrayCSV = inputFile.trim().split("\n");
  for (const iterator of arrayCSV) {
    let newArray = [];
    [...iterator].forEach((element) => {
      if (!isNaN(element)) {
        newArray.push(element);
      }
    });
    result = parseInt(newArray[0] + newArray[newArray.length - 1]) + result;
  }

  console.log(`Sum of number is: ${result}`);
}

function checkIfNumber(x) {
  if (isNaN(x)) {
    return "x";
  }
  return x;
}
