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

    console.log(inputFile.split("\r\n").map((line) => line.split(" ").map((e) => parseInt(e))))
    let myInput = inputFile.split("\r\n").map((line) => line.split(" ").map((e) => parseInt(e)))
    let result = 1
    let resultArr = []
    let newArr = []

    for (let index = 0; index < myInput[0].length; index++) {
      if (index+1 < myInput[0].length) {
        newArr.push(myInput[0][index+1]-myInput[0][index])
      }            
    }
    if (allEqual(newArr)) {
      result.push(myInput[0].at(-1)+newArr.at(-1))
    }
    console.log(myInput)

  }
const allEqual = arr => arr.every(v => v === arr[0]);





function calculatedDistance(tLim, hold) {
    return (tLim * hold - (hold * hold))
}
function range(start, end) {
    const ans = [ ];
    for (let i = start; i <= end; i++) {
    ans.push(i);
    }
    return ans;
    }
    