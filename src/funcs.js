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

  return grid;
}

// export function findAllSolutions(grid, dictionary) {
class TrieNode {
  /**
   * Stores Trie Nodes
   * @param {string} value - Single character stored in node
   */
  constructor(value) {
    this.value = value;
    this.isWord = false;
    this.word = null;
    this.children = new Map();
  }
}

/**
 * Trie data structure for storing words
 */
class Trie {
  /**
   * Creates default Trie
   */
  constructor() {
    this.root = new TrieNode("*");
  }

  /**
   * Inserts Words
   * @param {string} word - Word to insert
   */
  insertWord(word) {
    let node = this.root;
    for (let i = 0; i < word.length; ++i) {
      let c = word[i];
      if (c === "q" && i + 1 < word.length && word[i + 1] === "u") {
        c = "qu";
        i += 1;
      }
      if (c === "s" && i + 1 < word.length && word[i + 1] === "t") {
        c = "st";
        i += 1;
      }
      if (!node.children.has(c)) {
        node.children.set(c, new TrieNode(c));
      }
      node = node.children.get(c);
    }
    node.isWord = true;
    node.word = word;
  }
}

export function findAllSolutions(grid, dictionary) {
  const solutions = new Set();
  if (grid.length === 0 || dictionary.length === 0) {
    return [];
  }

  const trie = new Trie();
  for (const word of dictionary) {
    trie.insertWord(word.toLowerCase());
  }
  const moves = [-1, 0, 1];

  const inBounds = (row, col) =>
    row > -1 && row < grid.length && col > -1 && col < grid[0].length;
  const helper = (row, col, node, visited) => {
    if (!inBounds(row, col)) {
      return;
    }
    if (visited.has(`${row}|${col}`)) {
      return;
    }
    const letter = grid[row][col].toLowerCase();
    if (node.children.has(letter)) {
      node = node.children.get(letter);
      if (node.isWord && node.word.length > 2) {
        solutions.add(node.word);
      }
      for (const x of moves) {
        for (const y of moves) {
          if (!(x === 0 && y === 0)) {
            helper(
              row + x,
              col + y,
              node,
              new Set([...visited, `${row}|${col}`])
            );
          }
        }
      }
    }
  };

  for (let i = 0; i < grid.length; ++i) {
    for (let j = 0; j < grid[0].length; ++j) {
      const letter = grid[i][j].toLowerCase();
      if (trie.root.children.has(letter)) {
        let node = trie.root.children.get(letter);
        for (const x of moves) {
          for (const y of moves) {
            if (!(x === 0 && y === 0)) {
              helper(i + x, j + y, node, new Set([`${i}|${j}`]));
            }
          }
        }
      }
    }
  }
  return [...solutions];
}
