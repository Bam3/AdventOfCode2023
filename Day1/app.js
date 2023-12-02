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
  const values = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };
  arrayCSV = inputFile.trim().split("\n");
  for (let iterator of arrayCSV) {
    let newArray = [];
    //if first and last char is number, then write it in result
    if (
      Number.isInteger(parseInt(iterator[0])) &&
      Number.isInteger(parseInt(iterator[iterator.length - 1]))
    ) {
      console.log(iterator, "začetek in konec je cifra");
      result = parseInt(iterator[0] + iterator[iterator.length - 1]) + result;
    } else {
      // else replace words with numbers
      console.log(iterator, "iterator pred replace");
      for (const key in values) {
        iterator = iterator.replaceAll(key, values[key]);
      }
      console.log(iterator);
      [...iterator].forEach((element) => {
        if (!isNaN(element)) {
          newArray.push(element);
        }
      });
      result = parseInt(newArray[0] + newArray[newArray.length - 1]) + result;
    }
  }

  console.log(`Sum of number is: ${result}`);
}

function checkIfNumber(x) {
  if (isNaN(x)) {
    return "x";
  }
  return x;
}
