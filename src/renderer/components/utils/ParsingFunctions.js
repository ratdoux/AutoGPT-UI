const infoStringList = [
  "Missing",
  "spacy",
  "Installing",
  "Looking",
  "Downloading",
  "Collecting",
  "--------------",
  "Requirement",
  "Thinking...",
];

const atomicActions = [
  "THOUGHTS",
  "REASONING",
  "PLAN",
  "CRITICISM",
  "NEXT ACTION",
  "Using memory",
  "Using Browser",
];

//should be put in its own file but for now here is fine
const colorTable = {
  30: "black",
  31: "red",
  32: "#b1e2e0", //usual text
  33: "#ffd43c", //thoghts, reason, plan
  34: "blue",
  35: "#e34f37", //enter y
  36: "#6f95ff", //next action
  37: "white",
  90: "grey",
};

function hasAnsi(str) {
  const ansiRegex = new RegExp(
    [
      '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
      '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))',
    ].join('|'),
    'g'
  );

  return ansiRegex.test(str);
}

function parseAnsiColor(ansiCode) {
  const ansiRegex = /\u001b\[(\d+(?:;\d+)*)?([a-zA-Z])/;
  const match = ansiCode.match(ansiRegex);
  let parsedColor = "white";
  if (match) {
    const rawParameters = match[1];
    const command = match[2];
    const parameters = rawParameters ? rawParameters.split(';').map(Number) : [];
    parsedColor = colorTable[parameters[0]];

  }
  return parsedColor;
}


function removeAnsiAndGetColor(str) {
  const ansiRegex = new RegExp(
    [
      '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
      '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))',
    ].join('|'),
    'g'
  );
  const ansiCodes = str.match(ansiRegex)[0] || [];
  const message =
  {
    color: parseAnsiColor(ansiCodes),
    message: str.replace(ansiRegex, '')
  };
  return message;
}

function checkStringAgainstInfoStringArray(string) {
  if (string)
    for (let i = 0; i < infoStringList.length; i++) {
      if (string.includes(infoStringList[i])) {
        return true;
      }
    }
  return false;
}

export { checkStringAgainstInfoStringArray, hasAnsi, removeAnsiAndGetColor }
