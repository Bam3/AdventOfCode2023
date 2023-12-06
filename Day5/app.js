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
  //seeds: 79 14 55 13

  //seed-to-soil map:
  //50 98 2
  //52 50 48

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
  let instructions = [];
  let seeds = [];
  let data = inputFile.trim().split("\n\n");
  console.log(data, "data");
  data.forEach((line) => {
    if (line.split(": ")[0] === "seeds") {
      seeds = line.split(": ")[1].split(" ");
    }
  });
  console.log(seeds);
  console.log(range(98, 100, 1));
}
const range = (start, stop, step) =>
  Array.from({ length: (stop - start) / step + 1 }, (_, i) => start + i * step);
