const numberWithSpaces = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const hideExtraSymbols = (str, firstPartLength = 4, secondPartLength = 5) => {
  return (
    str.slice(0, firstPartLength) +
    "..." +
    str.slice(secondPartLength * -1 - 1, -1)
  );
};

export { numberWithSpaces, hideExtraSymbols };
