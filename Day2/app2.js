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
  arrayCSV = inputFile.trim().split("\n");
  //initial obj

  let result = 0;
  let midResult = 0;
  num = 0;
  let games = [];
  let roundObj = {};
  let neededElfBag = {
    red: 0,
    blue: 0,
    green: 0,
  };

  arrayCSV.forEach((game) => {
    let gameObj = {
      id: 0,
      rounds: [],
      possible: true,
    };
    //id of current game
    let id = parseInt(game.split(" ")[1]);
    gameObj.id = id;
    //rounds of current game
    let rounds = game.split(":")[1].split(";");
    //[' 3 blue, 4 red', ' 1 red, 2 green, 6 blue', ' 2 green'
    rounds.forEach((round) => {
      let oneRound = round.split(",");
      //[" 3 blue", " 4 red"];
      oneRound.forEach((r) => {
        nameOf = r.split(" ")[2];
        value = parseInt(r.split(" ")[1]);
        roundObj[nameOf] = value;
      });
      gameObj.rounds.push(roundObj);
      roundObj = {};
    });
    games.push(gameObj);
  });
  games.forEach((game) => {
    neededElfBag = {
      red: 0,
      blue: 0,
      green: 0,
    };
    game.rounds.forEach((round) => {
      for (const keyInNeededElfBag in neededElfBag) {
        if (round[keyInNeededElfBag] > neededElfBag[keyInNeededElfBag]) {
          neededElfBag[keyInNeededElfBag] = round[keyInNeededElfBag];
        }
      }
    });
    midResult = 1;
    for (const keyInNeededElfBag in neededElfBag) {
      midResult *= neededElfBag[keyInNeededElfBag];
    }
    result += midResult;
  });
  console.log(result);
}
