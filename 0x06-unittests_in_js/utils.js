const Utils = {
  calculateNumber: (type, a, b) => {
    const num1 = Math.round(a);
    const num2 = Math.round(b);
    if (type === 'SUM') return num1 + num2;
    if (type === 'SUBTRACT') return num1 - num2;
    if (type === 'DIVIDE') return num2 === 0 ? 'Error' : num1 / num2;
  }
};
module.exports = Utils;

