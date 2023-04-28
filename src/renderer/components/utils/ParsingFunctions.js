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

function removeAnsi(str) {
    const ansiRegex = new RegExp(
      [
        '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[a-zA-Z\\d]*)*)?\\u0007)',
        '(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PRZcf-ntqry=><~]))',
      ].join('|'),
      'g'
    );
  
    return str.replace(ansiRegex, '');
}

function checkStringAgainstInfoStringArray(string) {
    if(string)
        for (let i = 0; i < infoStringList.length; i++) {
            if (string.includes(infoStringList[i])) {
                return true;
            }
        }
    return false;
}

export { checkStringAgainstInfoStringArray, hasAnsi, removeAnsi}
