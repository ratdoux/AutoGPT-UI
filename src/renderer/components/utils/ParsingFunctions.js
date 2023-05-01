


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


function parseAnsiColor(ansiCode, colorTable) {
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


function splitAtomicActionString(string, atomicActions) {
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

function removeAnsiAndGetColor(str, colorTable) {
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
    color: parseAnsiColor(ansiCodes, colorTable),
    message: str.replace(ansiRegex, '')
  };
  return message;
}

function checkStringAgainstInfoStringArray(string, infoStringList) {
  if (string)
    for (let i = 0; i < infoStringList.length; i++) {
      if (string.includes(infoStringList[i])) {
        return true;
      }
    }
  return false;
}

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

function createReturnListRegex(returnList) {
  const escapedReturnList = returnList.map(char => char.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));
  return new RegExp('(' + escapedReturnList.join('|') + ')', 'g');
}

function createReturnListNextLineRegex(returnListNextLine) {
  const escapedReturnList = returnListNextLine.map(char => char.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&'));
  return new RegExp('(' + escapedReturnList.join('|') + ')', 'g');
}


function addReturn(string, returnList, returnListNextLine) {
  if (string) {
    const regex = createReturnListRegex(returnList);
    const nextLineRegex = createReturnListNextLineRegex(returnListNextLine);

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
      if (returnListNextLine.includes(str)) {
        if (split[index + 1])
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








export {
  checkStringAgainstInfoStringArray,
  hasAnsi,
  removeAnsiAndGetColor,
  addReturn,
  splitAtomicActionString,
  removeFirstColon,
}
