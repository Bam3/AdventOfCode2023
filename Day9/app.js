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
  console.log(
    inputFile.split("\n").map((line) => line.split(" ").map((e) => parseInt(e)))
  );
  let myInput = inputFile
    .split("\n")
    .map((line) => line.split(" ").map((e) => parseInt(e)));
  let result = [];
  let resultArr = [];
  let newArr = [];
  let done = false;
  let reducArr = [];
  let middArr = [];
  // 1 3 6 10 15 21
  //  2 3 4 5 6
  //   1 1 1 1

  // 10 13 16 21 30 45  68
  //   3  3  5  9  15   23
  //     0  2  4  6      8
  //      2  2  2
  //       0  0

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
  //console.log(result);
  console.log(result.reduce((a, b) => a + b));
}
const allEqual = (arr) => arr.every((v) => v === arr[0]);

function calculatedDistance(tLim, hold) {
  return tLim * hold - hold * hold;
}
function range(start, end) {
  const ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}

function reduceArray(arr) {
  let newArr = [];
  for (let index = 0; index < arr.length; index++) {
    if (index + 1 < arr.length) {
      newArr.push(arr[index + 1] - arr[index]);
    }
  }
  return newArr;
}
//      2  2  2
//     0  2  4  6      8
//   3  3  5  9  15   23
// 10 13 16 21 30 45  68

function getTheResult(arr) {
  let adder = 0;
  arr.reverse();
  adder = arr[0].at(-1);
  for (let index = 1; index < arr.length; index++) {
    arr[index][arr[index].length - 1] = arr[index].at(-1) + adder;
    adder = arr[index].at(-1);
  }
  return arr.at(-1).at(-1);
}

//        0   0   0
//      2   2   2   2
//   -2   0   2   4   6
//  5   3   3   5   9  15
//5  10  13  16  21  30  45

//    1 1 1 1 1
//   1 2 3 4 5 6
//  0 1 3 6 10 15 21

function getTheResult2(arr) {
  let sub = 0;
  arr.reverse();
  sub = arr[0][0];
  for (let index = 1; index < arr.length; index++) {
    arr[index][0] = arr[index][0] - sub;
    sub = arr[index][0];
  }
  return arr.at(-1)[0];
}
