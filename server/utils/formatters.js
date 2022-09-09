exports.hideExtraSymbols = (str, firstPartLength = 4, secondPartLength = 5) => {
  return (
    str.slice(0, firstPartLength) + "..." + str.slice(~secondPartLength, -1)
  );
};
