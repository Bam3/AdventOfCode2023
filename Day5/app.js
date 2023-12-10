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
  //                            {
  //seeds: 79 14 55 13            seeds: [79, 14, 55, 13]
  //                                    key     :    value
  //seed-to-soil map:             seed-to-soil: [
  //50 98 2                                      [50,98,2],
  //52 50 48                                     [52,50,48]
  //                                             ]
  //
  //

  //soil-to-fertilizer map:
  //0 15 37
  //37 52 2
  //39 0 15

  //fertilizer-to-water map:
  //49 53 8
  //0 11 42
  //42 0 7
  //57 7 4

  //water-to-light map:
  //88 18 7
  //18 25 70

  //light-to-temperature map:
  //45 77 23
  //81 45 19
  //68 64 13

  //temperature-to-humidity map:
  //0 69 1
  //1 0 69

  //humidity-to-location map:
  //60 56 37
  //56 93 4
  let tempArr = [];
  let almanac = {};
  let middle = [];
  let found = false;
  let data = inputFile.trim().split("\r\n");
  console.log(data, "data");

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
  //console.log(almanac);
  //seed-to-soil soil-to-fertiliser fertiliser-to-water water-to-light light-to-temp temp-to-humid humid-to-location
  let resultArr = [];
  let seed = 0;
  let soil = 0;
  let fertilizer = 0;
  let water = 0;
  let light = 0;
  let temp = 0;
  let humid = 0;
  let location = 0;
  let result = [];

  almanac.seeds.forEach((seed) => {
    resultArr.push(parseInt(seed));
    found = false;
    almanac.seed_to_soil.forEach((step) => {
      let destin = 0;
      let source = 0;
      let rng = 0;
      let indexOfSource = 0;
      destin = parseInt(step[0]);
      source = parseInt(step[1]);
      rng = parseInt(step[2]);
      indexOfSource = parseInt(
        range(source, source + rng - 1).indexOf(parseInt(seed))
      );
      if (indexOfSource >= 0) {
        resultArr.push(range(destin, destin + rng - 1)[indexOfSource]);
        found = true;
      }
    });
    if (!found) {
      resultArr.push(parseInt(seed));
      soil = parseInt(seed);
    } else {
      soil = resultArr.at(-1);
    }
    found = false;
    almanac.soil_to_fertilizer.forEach((step) => {
      let destin = 0;
      let source = 0;
      let rng = 0;
      let indexOfSource = 0;
      destin = parseInt(step[0]);
      source = parseInt(step[1]);
      rng = parseInt(step[2]);
      indexOfSource = parseInt(range(source, source + rng - 1).indexOf(soil));
      if (indexOfSource >= 0) {
        resultArr.push(range(destin, destin + rng - 1)[indexOfSource]);
        found = true;
      }
    });
    if (!found) {
      resultArr.push(parseInt(soil));
      fertilizer = parseInt(soil);
    } else {
      fertilizer = resultArr.at(-1);
    }
    found = false;
    almanac.fertilizer_to_water.forEach((step) => {
      let destin = 0;
      let source = 0;
      let rng = 0;
      let indexOfSource = 0;
      destin = parseInt(step[0]);
      source = parseInt(step[1]);
      rng = parseInt(step[2]);
      indexOfSource = parseInt(
        range(source, source + rng - 1).indexOf(fertilizer)
      );
      if (indexOfSource >= 0) {
        resultArr.push(range(destin, destin + rng - 1)[indexOfSource]);
        found = true;
      }
    });
    if (!found) {
      resultArr.push(parseInt(fertilizer));
      water = parseInt(fertilizer);
    } else {
      water = resultArr.at(-1);
    }
    found = false;
    almanac.water_to_light.forEach((step) => {
      let destin = 0;
      let source = 0;
      let rng = 0;
      let indexOfSource = 0;
      destin = parseInt(step[0]);
      source = parseInt(step[1]);
      rng = parseInt(step[2]);
      indexOfSource = parseInt(range(source, source + rng - 1).indexOf(water));
      if (indexOfSource >= 0) {
        resultArr.push(range(destin, destin + rng - 1)[indexOfSource]);
        found = true;
      }
    });
    if (!found) {
      resultArr.push(parseInt(water));
      light = parseInt(water);
    } else {
      light = resultArr.at(-1);
    }
    found = false;
    almanac.light_to_temperature.forEach((step) => {
      let destin = 0;
      let source = 0;
      let rng = 0;
      let indexOfSource = 0;
      destin = parseInt(step[0]);
      source = parseInt(step[1]);
      rng = parseInt(step[2]);
      indexOfSource = parseInt(range(source, source + rng - 1).indexOf(light));
      if (indexOfSource >= 0) {
        resultArr.push(range(destin, destin + rng - 1)[indexOfSource]);
        found = true;
      }
    });
    if (!found) {
      resultArr.push(parseInt(light));
      temp = parseInt(light);
    } else {
      temp = resultArr.at(-1);
    }
    found = false;
    almanac.temperature_to_humidity.forEach((step) => {
      let destin = 0;
      let source = 0;
      let rng = 0;
      let indexOfSource = 0;
      destin = parseInt(step[0]);
      source = parseInt(step[1]);
      rng = parseInt(step[2]);
      indexOfSource = parseInt(range(source, source + rng - 1).indexOf(temp));
      if (indexOfSource >= 0) {
        resultArr.push(range(destin, destin + rng - 1)[indexOfSource]);
        found = true;
      }
    });
    if (!found) {
      resultArr.push(parseInt(temp));
      humid = parseInt(temp);
    } else {
      humid = resultArr.at(-1);
    }
    found = false;
    almanac.humidity_to_location.forEach((step) => {
      let destin = 0;
      let source = 0;
      let rng = 0;
      let indexOfSource = 0;
      destin = parseInt(step[0]);
      source = parseInt(step[1]);
      rng = parseInt(step[2]);
      indexOfSource = parseInt(range(source, source + rng - 1).indexOf(humid));
      if (indexOfSource >= 0) {
        resultArr.push(range(destin, destin + rng - 1)[indexOfSource]);
        found = true;
      }
    });
    if (!found) {
      resultArr.push(parseInt(humid));
    }
    result.push(resultArr);
    resultArr = [];
  });
  console.log(result);
  let lowest = [];
  result.forEach((e) => {
    lowest.push(e.at(-1));
  });
  console.log(Math.min(...lowest));
  //console.log(range2(98, 99));
  //console.log(range(0, 2502359673, 1));
}
//const range = (start, stop, step) =>
//  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);

function range(start, end) {
  return new Array(end - start + 1).fill(undefined).map((_, i) => i + start);
}
