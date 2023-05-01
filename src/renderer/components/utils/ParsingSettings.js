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

export { infoStringList, atomicActions, returnList, returnListNextLine, colorTable };