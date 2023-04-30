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

const returnList = [
  "?",
  "!",
  ". ",
  "...",
];

const returnListNextLine = [
  "Role",
  "Goals",
  "##",
  "Continue (y/n)",
  "- Thinking...",
  "ARGUMENTS ",
  "'y -N'",
  "'n'",
];

//should be put in its own file but for now here is fine
const colorTable = {
  0: "#b1e2e0",
  30: "black",
  31: "red",
  32: "#b1e2e0", //usual text
  33: "#ffd43c", //thoghts, reason, plan
  34: "white",
  35: "#e34f37", //enter y
  36: "#8ba9ff", //next action
  94: "#ff663c", //next action
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
  const additionalChars = /[\r\n\u0007]/g;

  return ansiRegex.test(str) || additionalChars.test(str);
}

function hasAnsiInternal(str) {
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
    const parameters = rawParameters ? rawParameters.split(';').map(Number) : [];
    parsedColor = colorTable[parameters[0]];
  }
  return parsedColor;
}


function splitAtomicActionString(string) {
  const matchingAtomicAction = atomicActions.find(action => string.includes(action));

  if (matchingAtomicAction) {
    const index = string.indexOf(matchingAtomicAction);
    const restOfString = string.slice(index + matchingAtomicAction.length).trim();
    const obj = { atomic: matchingAtomicAction, rest: restOfString };
    return obj;
  }
  const obj = { atomic: null, rest: string };
  return obj;
}

function removeAnsiAndGetColor(str) {
  const ansiRegex = new RegExp(
    [
      '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
      '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))',
    ].join('|'),
    'g'
  );
  let ansiCodes = [];
  if (hasAnsiInternal(str))
    ansiCodes = str.match(ansiRegex)[0] || [];
  else
    ansiCodes = [];
  if (ansiCodes.length === 0) return { color: "#b1e2e0", message: str };
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



// function addReturn(string) {
//   if (string) {
//     const regex = createReturnListRegex();
//     const splitArray = string.split(regex);
//     const returnListJoined = returnList.map(item => item.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join("|");

//     let result = [];
//     for (let i = 0; i < splitArray.length; i++) {
//       if (returnList.includes(splitArray[i])) {
//         if (i > 0 && result.length > 0) {
//           result[result.length - 1] += (splitArray[i]);
//         }
//       } else {
//         const splitResult = splitAtomicActionString(splitArray[i]);
//         result.push(JSON.stringify(splitResult));
//       }
//     }
//     return result;
//   }
//   return [];
// }

//function remove ":" from string
function removeFirstColon(string) {
  if (string) {
    const colonIndex = string.indexOf(":");
    if (colonIndex > -1) {
      return string.slice(colonIndex + 1).trim();
    }
    return string;
  }
  return string;
}

function createReturnListRegex() {
  const escapedReturnList = returnList.map(char => char.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));
  return new RegExp('(' + escapedReturnList.join('|') + ')', 'g');
}

function createReturnListNextLineRegex() {
  const escapedReturnList = returnListNextLine.map(char => char.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));
  return new RegExp('(' + escapedReturnList.join('|') + ')', 'g');
}


function addReturn(string) {
  if (string) {
    const regex = createReturnListRegex();
    const nextLineRegex = createReturnListNextLineRegex();

    const splitArray = string.split(regex).filter(str => str.length > 0);

    const split = splitArray.reduce((acc, curr, index) => {
      if (returnList.includes(curr)) {
        acc[acc.length - 1] += (curr);
      } else {
        acc.push((curr));
      }
      return acc;
    }, []);


    split.forEach((str, index) => {
      const splitArray = str.split(nextLineRegex).filter(str => str.length > 0);
      if (splitArray.length > 1) {
        split.splice(index, 1, ...splitArray);
      }
    });

    split.forEach((str, index) => {
      if(returnListNextLine.includes(str)){
        if(split[index + 1])
          split[index] = str + split[index + 1];
        else 
          split[index] = str;

        split.splice(index + 1, 1);

      }
    });

    return split;


  }
  return [];
}








export { checkStringAgainstInfoStringArray, hasAnsi, removeAnsiAndGetColor, addReturn, splitAtomicActionString, removeFirstColon }
