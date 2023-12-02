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
  let games = [];
  let roundObj = {};
  //Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
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

  //The Elf would first like to know which games would have been possible if the bag contained
  //only 12 red cubes,
  //13 green cubes,
  //and 14 blue cubes?
  let elfBag = {};
  let result = 0;
  // possible :   Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
  // impossible : Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
  num = 0;
  games.forEach((game) => {
    console.log(game.rounds, "runde");
    game.rounds.forEach((round) => {
      elfBag = {
        red: 12,
        green: 13,
        blue: 14,
      };
      if (game.possible) {
        console.log(round, "ena");
        for (const keyInRound in round) {
          elfBag[keyInRound] = elfBag[keyInRound] - round[keyInRound];
          //console.log(round[keyInRound]);
          //console.log(elfBag[keyInRound]);

          //console.log(round[keyInElfsBag], "pred Ifom");
          //elfBag[keyInElfsBag] = elfBag[keyInElfsBag] - round[keyInElfsBag];
          //if (round[keyInElfsBag]) {
          //}
          //console.log(elfBag);
        }
        if (elfBag.red >= 0 && elfBag.green >= 0 && elfBag.blue >= 0) {
          game.possible = true;
        } else {
          game.possible = false;
        }
      }
    });
  });
  //console.log(elfBag);
  console.log(games);

  games.forEach((game) => {
    game.possible ? (result += game.id) : (result = result);
  });
  console.log(result);
}
