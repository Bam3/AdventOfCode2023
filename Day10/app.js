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
  let area = inputFile.split("\n").map((line) => line.split(""));
  console.log(area);

  let stepCnt = 0;
  let done = false;
  let middArr = [];
  let cooS = [];
  let nextCoo = {
    right: [0, 1],
    left: [0, -1],
    up: [-1, 0],
    down: [1, 0],
  };
  let directions = ["right", "left", "up", "down"];
  let nextDirection = "";

  area.forEach((col, indexCol) => {
    col.forEach((row, indexRow) => {
      if (row === "S") {
        cooS = [indexCol, indexRow];
      }
    });
  });

  console.log(cooS, " aje?");

  //-L|F7
  //7S-7|
  //L|7||
  //-L-J|
  //L|-JF
  let end = true;
  do {
    let indexDo = 0;
    let possible = "";
    do {
      ({ possible, nextDirection } = isPossible(
        step(area, cooS, directions[indexDo]),
        directions[indexDo]
      ));
      console.log(possible, nextDirection);
      if (!possible) {
        indexDo++;
      } else {
        cooS = Arrays_sum(cooS, nextCoo[directions[indexDo]]);
      }
    } while (!possible);
    stepCnt++;
  } while (end);
}
function isPossible(nextSymbol, direction) {
  if (nextSymbol === "S") {
    return true;
  }
  switch (direction) {
    case "right":
      if (nextSymbol === "-") {
        return { possible: true, nextDirection: direction };
      } else if (nextSymbol === "7") {
        return { possible: true, nextDirection: "down" };
      } else if (nextSymbol === "J") {
        return { possible: true, nextDirection: "up" };
      } else {
        return { possible: false };
      }
    case "left":
      if (nextSymbol === "-") {
        return { possible: true, nextDirection: direction };
      } else if (nextSymbol === "L") {
        return { possible: true, nextDirection: "up" };
      } else if (nextSymbol === "F") {
        return { possible: true, nextDirection: "down" };
      } else {
        return { possible: false };
      }
    case "up":
      if (nextSymbol === "|") {
        return { possible: true, nextDirection: direction };
      } else if (nextSymbol === "F") {
        return { possible: true, nextDirection: "right" };
      } else if (nextSymbol === "7") {
        return { possible: true, nextDirection: "left" };
      } else {
        return { possible: false };
      }
    case "down":
      if (nextSymbol === "|") {
        return { possible: true, nextDirection: direction };
      } else if (nextSymbol === "J") {
        return { possible: true, nextDirection: "left" };
      } else if (nextSymbol === "L") {
        return { possible: true, nextDirection: "right" };
      } else {
        return { possible: false };
      }
    default:
      break;
  }
}

function step(area, currentLocation, direction) {
  if (direction === "right") {
    return area[currentLocation[0]][currentLocation[1] + 1];
  } else if (direction === "left") {
    return area[currentLocation[0]][currentLocation[1] - 1];
  } else if (direction === "up") {
    return area[currentLocation[0] - 1][currentLocation[1]];
  } else if (direction === "down") {
    return area[currentLocation[0] + 1][currentLocation[1]];
  }
}
function Arrays_sum(array1, array2) {
  var result = [];
  var ctr = 0;
  var x = 0;

  if (array1.length === 0) return "array1 is empty";
  if (array2.length === 0) return "array2 is empty";

  while (ctr < array1.length && ctr < array2.length) {
    result.push(array1[ctr] + array2[ctr]);
    ctr++;
  }

  if (ctr === array1.length) {
    for (x = ctr; x < array2.length; x++) {
      result.push(array2[x]);
    }
  } else {
    for (x = ctr; x < array1.length; x++) {
      result.push(array1[x]);
    }
  }
  return result;
}
