export const formatNumber = (num) => {
  const n = parseFloat(num).toFixed(2).toString();
  const s1 = n.slice(0, n.indexOf('.'));
  const s2 = n.slice(n.indexOf('.') + 1);
  if (s1.length <= 3) {
    return parseFloat(num).toFixed(2).toString();
  } else {
    let inChars = s1.split('').reverse();
    let len = inChars.length;
    let count = 1
    for (let i=3; i<len + count; i+=4) {
      inChars.splice(i, 0, ',');
      count ++;
    };
    const numLen = s1.toString().length;
    if ((numLen >= 6) && (parseInt(numLen) % 3 == 0)) {
      return (inChars.reverse().join('') + '.' + s2).substring(1);
    } else {
      return inChars.reverse().join('') + '.' + s2;
    }
  }
}
