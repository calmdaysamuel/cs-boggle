export function RandomGrid(SIZE) {
  // prettier-ignore
  const dice = [
    "AAAFRS",
    "AAEEEE",
    "AAFIRS",
    "ADENNN",
    "AEEEEM",
    "AEEGMU",
    "AEGMNN",
    "AFIRSY",
    "BJKQXZ",
    "CCNSTW",
    "CEIILT",
    "CEILPT",
    "CEIPST",
    "DHHNOT",
    "DHHLOR",
    "DHLNOR",
    "DDLNOR",
    "EIIITT",
    "EMOTTT",
    "ENSSSU",
    "FIPRSY",
    "GORRVW",
    "HIPRRY",
    "NOOTUW",
    "OOOTTU",
    "AAAFRS",
    "AAEEEE",
    "AAFIRS",
    "ADENNN",
    "AEEEEM",
    "AEEGMU",
    "AEGMNN",
    "AFIRSY",
    "BJKQXZ",
    "CCNSTW",
    "CEIILT",
    "CEILPT",
    "CEIPST",
    "DHHNOT",
    "DHHLOR",
    "DHLNOR",
    "DDLNOR",
    "EIIITT",
    "EMOTTT",
    "ENSSSU",
    "FIPRSY",
    "GORRVW",
    "HIPRRY",
    "NOOTUW",
    "OOOTTU",
    "AAAFRS",
    "AAEEEE",
    "AAFIRS",
    "ADENNN",
    "AEEEEM",
    "AEEGMU",
    "AEGMNN",
    "AFIRSY",
    "BJKQXZ",
    "CCNSTW",
    "CEIILT",
    "CEILPT",
    "CEIPST",
    "DHHNOT",
    "DHHLOR",
    "DHLNOR",
    "DDLNOR",
    "EIIITT",
    "EMOTTT",
    "ENSSSU",
    "FIPRSY",
    "GORRVW",
    "HIPRRY",
    "NOOTUW",
    "OOOTTU",
    "AAAFRS",
    "AAEEEE",
    "AAFIRS",
    "ADENNN",
    "AEEEEM",
    "AEEGMU",
    "AEGMNN",
    "AFIRSY",
    "BJKQXZ",
    "CCNSTW",
    "CEIILT",
    "CEILPT",
    "CEIPST",
    "DHHNOT",
    "DHHLOR",
    "DHLNOR",
    "DDLNOR",
    "EIIITT",
    "EMOTTT",
    "ENSSSU",
    "FIPRSY",
    "GORRVW",
    "HIPRRY",
    "NOOTUW",
    "OOOTTU",
  ];
  let chars = dice.map((cube) => cube[Math.floor(Math.random() * cube.length)]);
  chars.sort(() => Math.random() - 0.5); // Shuffle the letters.

  let grid = [];
  for (let row = 0; row < SIZE; row++) {
    grid[row] = [];
    for (let col = 0; col < SIZE; ++col) {
      grid[row][col] = chars[SIZE * row + col];
      if (grid[row][col] === "Q") grid[row][col] = "Qu";
      if (grid[row][col] === "S") grid[row][col] = "St";
    }
  }
  console.log(grid);
  return grid;
}

export function findAllSolutions(grid, dictionary) {
  if (grid.length === 0 || dictionary.length === 0) {
    return [];
  }

  let solutions = [];
  lowerGrid(grid);

  for (let word of dictionary) {
    let r = word;
    if (r.length < 3) {
      continue;
    }
    word = word.toLowerCase();
    word = word.replace("qu", ".");
    word = word.replace("st", ",");
    let starts = findLetters(grid, word[0]);
    for (let pos of starts) {
      if (findNextLetter(grid, word, 1, pos, [`${pos.row}-${pos.col}`])) {
        solutions.push(r.toLowerCase());
        break;
      }
    }
  }
  higherGrid(grid);
  return solutions;
}

function findNextLetter(grid, word, toFind, position, exclude) {
  if (toFind >= word.length) {
    return true;
  }
  let nextPos = findNeighboringIndices(grid, position, word[toFind], exclude);

  for (let pos of nextPos) {
    exclude.push(`${pos.row}-${pos.col}`);
    if (findNextLetter(grid, word, toFind + 1, pos, exclude)) {
      return true;
    }

    exclude.pop();
  }

  return false;
}
function findNeighboringIndices(grid, position, letter, exclude) {
  let directions = [
    { row: 0, col: 1 },
    { row: 0, col: -1 },
    { row: 1, col: 0 },
    { row: -1, col: 0 },
    { row: -1, col: -1 },
    { row: 1, col: 1 },
    { row: -1, col: 1 },
    { row: 1, col: -1 },
  ];
  let positions = [];
  for (let i of directions) {
    let newPos = { row: position.row + i.row, col: position.col + i.col };

    if (
      grid[newPos.row] &&
      grid[newPos.row][newPos.col] &&
      grid[newPos.row][newPos.col] == letter &&
      !exclude.includes(`${newPos.row}-${newPos.col}`)
    ) {
      positions.push(newPos);
    }
  }

  return positions;
}

function findLetters(grid, letter) {
  let positions = [];
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] == letter) {
        positions.push({ row: i, col: j });
      }
    }
  }

  return positions;
}

function lowerGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
      grid[i][j] = grid[i][j].replace("qu", ".");
      grid[i][j] = grid[i][j].replace("st", ",");
    }
  }
}
function higherGrid(grid) {
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = grid[i][j].toLowerCase();
      grid[i][j] = grid[i][j].replace(".", "qu");
      grid[i][j] = grid[i][j].replace(",", "st");
    }
  }
}
