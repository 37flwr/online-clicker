const numberWithSpaces = (x) => {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
};

const hideExtraSymbols = (str) => {
  return str.slice(0, 4) + "..." + str.slice(-6, -1);
};

export { numberWithSpaces, hideExtraSymbols };
