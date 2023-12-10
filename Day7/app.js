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
    //let tLim = inputFile.split("\r\n")[0].split(":")[1].trim().split(" ")
    //let hOrig = inputFile.split("\r\n")[1].split(":")[1].trim().split(" ")
    //let tLim = [59,79,65,75]
    //let hOrig =[597,1234,1032,1328]
    
    let tLim = [59796575]
    let hOrig =[597123410321328]
    
    
    let betterDistances = [];
    let result = 1
    let resultArr = []
    //console.log(tLim, hOrig)
    //console.log([...tLim[0]])
    //console.log(range(1,tLim[0]-1))
    
    tLim.forEach((timeLimit, index) => {
        range(1,timeLimit-1).forEach((hold) => {
            //console.log(calculatedDistance(timeLimit,hold))
            if (calculatedDistance(timeLimit,hold)>hOrig[index]) {
                betterDistances.push(calculatedDistance(timeLimit,hold))
            }
        });
        resultArr.push(parseInt(betterDistances.length))
        betterDistances = []
        result = result * betterDistances.length
    });
    console.log(resultArr, resultArr.reduce((a, b)=> a*b, 1))
  }
function calculatedDistance(tLim, hold) {
    return (tLim * hold - (hold * hold))
}
function range(start, end) {
    const ans = [ ];
    for (let i = start; i <= end; i++) {
    ans.push(i);
    }
    return ans;
    }
    