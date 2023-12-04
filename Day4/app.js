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
  let card = {};
  let result = 0;
  // Card 1: 41 '48' '83' '86' '17' | '83' '86'  6 31 '17'  9 '48' 53 --8
  // Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19 -- 2
  // Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1 -- 2
  // Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83 -- 1
  // Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
  // Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11
  // result = 13
  // 1111 -> 2^0 + 2^1 + 2^2 + 2^3 + 2^4
  inputFile
    .trim()
    .split("\n")
    .forEach((play) => {
      play.trim().split(": ")[0].split(" ")[1];
      card.cardNumer = play.split(": ")[0].split(" ")[1];
      card.winningNumbers = play
        .trim()
        .split(": ")[1]
        .split(" | ")[0]
        .split(" ");
      card.myNumbers = play.trim().split(": ")[1].split(" | ")[1].split(" ");
      card.nums = [];
      listOfPlays.push(card);
      card = {
        cardNumer: 0,
        winningNumbers: [],
        myNumbers: [],
        nums: [].length,
      };
    });
  console.log(cleanArrayOfSpaces(listOfPlays[0].myNumbers));
  console.log(listOfPlays);
  listOfPlays.forEach((play) => {
    play.winningNumbers.forEach((winNum) => {
      play.myNumbers.forEach((myNum) => {
        if (winNum === myNum) {
          play.nums.push(myNum);
        }
      });
    });
  });
  listOfPlays.forEach((play) => {
    if (play.nums.length > 0) {
      result = result + Math.pow(2, play.nums.length - 1);
      console.log(Math.pow(2, play.nums.length - 1));
      console.log(play.nums.length, "len");
    }
  });
  console.log(listOfPlays);
  console.log(result);
}

function cleanArrayOfSpaces(array) {
  array.forEach((e) => {
    if (e === "") {
      array.splice(array.indexOf(e), 1);
    }
    return array;
  });
}
