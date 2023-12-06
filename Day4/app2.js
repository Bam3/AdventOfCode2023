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
  let listOfPlays = [];
  let card = { instances: 0 };
  let result = 0;
  // Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
  // Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
  // Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
  // Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
  // Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
  // Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
  // result = 13
  // 1111 -> 2^0 + 2^1 + 2^2 + 2^3 + 2^4
  //-------------------------PART1-------------------------
  inputFile
    .trim()
    .split("\n")
    .forEach((play) => {
      card.cardNumer = parseInt(
        cleanMyArray(play.split(": ")[0].split(" "))[1]
      );
      card.winningNumbers = cleanMyArray(
        play.trim().split(": ")[1].split(" | ")[0].split(" ")
      );
      card.myNumbers = cleanMyArray(
        play.trim().split(": ")[1].split(" | ")[1].split(" ")
      );
      card.nums = [];

      listOfPlays.push(card);

      card.winningNumbers.forEach((winNum) => {
        card.myNumbers.forEach((myNum) => {
          if (winNum === myNum) {
            card.nums.push(myNum);
            card.numberOfWinningCards = card.nums.length;
          }
        });
      });
      if (card.nums.length > 0) {
        result += Math.pow(2, card.nums.length - 1);
      }
      card = {
        cardNumer: 0,
        winningNumbers: [],
        myNumbers: [],
        nums: [],
        numberOfWinningCards: 0,
        instances: 0,
      };
    });
  //-------------------------PART1-------------------------

  //-------------------------PART2-------------------------
  for (let play = 0; play < listOfPlays.length; play++) {
    //add instances
    listOfPlays[play].instances++;

    if (listOfPlays[play].numberOfWinningCards !== 0) {
      let start = play + 1;
      let end = listOfPlays[play].numberOfWinningCards + play;

      for (let i = start; i < end + 1; i++) {
        listOfPlays[i].instances =
          listOfPlays[i].instances + listOfPlays[play].instances;
      }
    }
  }
  result = 0;
  listOfPlays.forEach((game) => {
    result += game.instances;
  });
  console.log(listOfPlays);
  console.log(result);
}

function isNumber(input) {
  if (!isNaN(input)) {
    return true;
  } else {
    return false;
  }
}

function cleanMyArray(array) {
  let midBuff = [];
  array.forEach((n) => {
    if (n !== "") {
      midBuff.push(n);
    }
  });
  array = [];
  array = midBuff;
  midBuff = [];
  return array;
}
