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
  console.log(inputFile.split("\n").map((line) => line.split(""))[41][91]);
  let myInput = inputFile.split("\n").map((line) => line.split(""));

  let result = [];
  let done = false;
  let middArr = [];

  myInput.forEach((element) => {
    done = true;
    middArr.push(element);
    middArr.push(reduceArray(element));
    do {
      if (allEqual(middArr.at(-1))) {
        if (middArr.length === 2) {
          result.push(middArr[0][0] + middArr[1][0] * -1);
          middArr = [];
          break;
        }
      } else {
        middArr.push(reduceArray(middArr.at(-1)));
        if (allEqual(middArr.at(-1))) {
          result.push(getTheResult2(middArr));
          middArr = [];
          done = false;
        }
      }
    } while (done);
  });

  console.log(result.reduce((a, b) => a + b));
}
