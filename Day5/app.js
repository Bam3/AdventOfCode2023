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
  let tempArr = [];
  let almanac = {};
  let middle = [];
  let data = inputFile.trim().split("\n");

  data.forEach((line) => {
    if (line === "") {
      if (tempArr.length > 0)
        for (let i = 0; i < tempArr.length; i++) {
          if (tempArr[i].split(": ")[0] === "seeds") {
            almanac[tempArr[i].split(": ")[0]] = tempArr[i]
              .split(": ")[1]
              .split(" ");
          } else if (i === 0) {
            almanac[tempArr[0].split(" ")[0].replaceAll("-", "_")] = [];
          } else {
            middle.push(tempArr[i].split(" "));
            almanac[tempArr[0].split(" ")[0].replaceAll("-", "_")] = middle;
            //Object.assign(almanac[tempArr[0].split(" ")[0]], {i: tempArr[i].split(" ")})
          }
        }
      middle = [];
      tempArr = [];
    } else {
      tempArr.push(line);
    }
  });

  let resultArr = [];
  let result = [];
  let nextSeed = 0;

  almanac.seeds.forEach((seed) => {
    getNextLocation(almanac.seed_to_soil, seed, result);
    getNextLocation(almanac.soil_to_fertilizer, result.at(-1), result);
    getNextLocation(almanac.fertilizer_to_water, result.at(-1), result);
    getNextLocation(almanac.water_to_light, result.at(-1), result);
    getNextLocation(almanac.light_to_temperature, result.at(-1), result);
    getNextLocation(almanac.temperature_to_humidity, result.at(-1), result);
    getNextLocation(almanac.humidity_to_location, result.at(-1), result);
    resultArr.push(result);
    result = [];
  });
  let lowest = [];
  resultArr.forEach((e) => {
    lowest.push(e.at(-1));
  });
  console.log(Math.min(...lowest));
}

function getNextLocation(obj, seed, result) {
  let found = false;
  let destin = 0;
  let source = 0;
  let rng = 0;
  let seedToProcess = parseInt(seed);
  for (let step = 0; step < obj.length; step++) {
    destin = 0;
    source = 0;
    rng = 0;
    destin = parseInt(obj[step][0]);
    source = parseInt(obj[step][1]);
    rng = parseInt(obj[step][2]);

    if (source <= seedToProcess && seedToProcess <= source + rng - 1) {
      found = true;
      break;
    }
  }
  if (!found) {
    return result.push(seedToProcess);
  } else {
    return result.push(destin - source + seedToProcess);
  }
}
