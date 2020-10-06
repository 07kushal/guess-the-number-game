/* eslint-disable comma-dangle */
const Fonts = {
  regular: (s = 12) => {
    return {
      fontSize: s,
      fontFamily: 'OpenSans-Regular'
    };
  },
  bold: (s = 12) => {
    return {
      fontSize: s,
      fontFamily: 'OpenSans-Bold'
    };
  }
};

module.exports = {
  ...Fonts
};
