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
    one: "1",
    two: "2",
    three: "3",
    four: "4",
    five: "5",
    six: "6",
    seven: "7",
    eight: "8",
    nine: "9",
  };
  const reverseValues = {
    eno: "1",
    owt: "2",
    eerht: "3",
    ruof: "4",
    evif: "5",
    xis: "6",
    neves: "7",
    thgie: "8",
    enin: "9",
  };
  let num = 1;
  arrayCSV = inputFile.trim().split("\n");
  //xtwone3four - iterator
  for (let iterator of arrayCSV) {
    let firstNumberArr = [];
    let lastNumberArr = [];
    let firstNumber = [];
    let lastNumber = [];

    [...iterator].forEach((elementInIterator) => {
      // otherwise put it in check array
      firstNumber.push(elementInIterator);
      let checkString = firstNumber.join("");
      //find is there is number written as word
      for (const key in values) {
        checkString = checkString.replace(key, values[key]);
        firstNumber = checkString.split("");
      }
      //if chare is number put it in a numbers array
      firstNumber.forEach((element) => {
        if (!isNaN(element)) {
          firstNumberArr.push(element);
        }
      });
    });

    [...iterator].reverse().forEach((elementInIterator) => {
      // otherwise put it in check array
      lastNumber.push(elementInIterator);
      let checkString = lastNumber.join("");
      //find is there is number written as word
      for (const key in reverseValues) {
        checkString = checkString.replace(key, reverseValues[key]);
        lastNumber = checkString.split("");
        //console.log(lastNumber, "kaj");
      }
      //if chare is number put it in a numbers array
      lastNumber.forEach((element) => {
        if (!isNaN(element)) {
          lastNumberArr.push(element);
        }
      });
    });
    console.log(firstNumberArr[0], "prva");
    console.log(lastNumberArr[0], "druga");
    let newInteger = parseInt(firstNumberArr[0] + lastNumberArr[0]);
    //console.log(newInteger, `vrstica: ${num++}`);
    result += newInteger;
  }

  console.log(`Sum of number is: ${result}`);
}
