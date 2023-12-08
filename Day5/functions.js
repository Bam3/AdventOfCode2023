function getLocation(obj, seedAndResult) {
  let found = false;
  obj.forEach((step) => {
    let destin = 0;
    let source = 0;
    let rng = 0;
    seed = parseInt(seedAndResult[0]);
    destin = parseInt(step[0]);
    source = parseInt(step[1]);
    rng = parseInt(step[2]);

    if (source <= seedAndResult[0] <= source + rng - 1) {
      found = true;
      return [
        seedAndResult[1].push(destin - source + seedAndResult[0]),
        seedAndResult[1].at(-1),
      ];
    }
  });
  if (!found) {
    return [seedAndResult[1].push(seedAndResult[0]), seedAndResult[0]];
  }
}
