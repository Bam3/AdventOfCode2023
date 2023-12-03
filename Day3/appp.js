if (isNumber(area[col][row])) {
  //if next is number or symbol then valid
  if (isNumber(area[col][row + 1]) || isSymbol(area[col][row + 1])) {
    tempContainer.push(area[col][row]);
    //if down is symbol then valid
  } else if (col + 1 <= colAreaLimit && isSymbol(area[col + 1][row])) {
    tempContainer.push(area[col][row], "Sym");
    //if down right diagonal is symbol then valid
  } else if (
    col + 1 <= colAreaLimit &&
    row + 1 <= rowAreaLimitRow &&
    isSymbol(area[col + 1][row + 1])
  ) {
    tempContainer.push(area[col][row], "Sym");
    //if down left diagonal is symbol then valid
  } else if (
    col + 1 <= colAreaLimit &&
    row - 1 >= 0 &&
    isSymbol(area[col + 1][row - 1])
  ) {
    tempContainer.push(area[col][row], "Sym");
    //if up right diagonal is symbol then valid
  } else if (
    col - 1 >= 0 &&
    row + 1 <= rowAreaLimitRow &&
    isSymbol(area[col - 1][row + 1], "Sym")
  ) {
    tempContainer.push(area[col][row]);
    //if up is symbol then valid
  } else if (col - 1 >= 0 && isSymbol(area[col - 1][row])) {
    tempContainer.push(area[col][row], "Sym");
    //if up left diagonal is symbol then valid
  } else if (col - 1 >= 0 && row - 1 >= 0 && isSymbol(area[col - 1][row - 1])) {
    tempContainer.push(area[col][row], "Sym");
    //if previus is symbol or number then valid
  } else if (
    (row - 1 >= 0 && isSymbol(area[col][row - 1])) ||
    isNumber(area[col][row - 1])
  ) {
    tempContainer.push(area[col][row]);
  }
}
