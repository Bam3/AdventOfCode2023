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
  let tempArr = []
  let almanac = {}
  let instructions = [];
  let seeds = [];
  let data = inputFile.trim().split("\r\n");
  console.log(data, "data");

  data.forEach((line) => {
    //if (line.split(": ")[0] === "seeds") {
    //  almanac[data[0].split(": ")[0]] = data[0].split(": ")[1].split(" ");
    //}
    if (line === "") {
      if (tempArr.length > 0)
          for (let i = 0; i < tempArr.length; i++) {
            if (tempArr[i].split(": ")[0] === "seeds") {
              almanac[tempArr[i].split(": ")[0]] = tempArr[i].split(": ")[1].split(" ");
            } else if(i===0) {
              almanac[tempArr[0].split(" ")[0]] = [];
            } else {
              almanac[tempArr[0].split(" ")[0]] += [tempArr[i].split(" ")];
              //Object.assign(almanac[tempArr[0].split(" ")[0]], {i: tempArr[i].split(" ")})   
            }
          }
          tempArr = []
    } else {
      tempArr.push(line)
    }
  });
  console.log(almanac);
  //console.log(range(98, 100, 1));
}
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
