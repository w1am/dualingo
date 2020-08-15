export const objLen = (obj) => {
  var size = 0, key;
  for (key in obj) {
    if (obj.hasOwnProperty(key)) size++;
  }
  return size;
};

export const formatTextLen = (text, size) => {
  return text.split(" ").length > size
    ? text.split(" ").splice(0, size).join(" ") + '...'
    : text
}
