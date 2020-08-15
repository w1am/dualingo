const numbers = /^[0-9,.]*$/;
const numbers2 = /^[0-9,]*$/;

export const isValid = (number) => {
  if (number.match(numbers)) {
    if ((number.split(',').length - 1) >= 2 || (number.split('.').length - 1) >= 2) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}

 const isPriceValid = (number) => {
  if (number.match(numbers2)) {
    if ((number.split(',').length - 1) >= 2 || (number.split('.').length - 1) >= 2) {
      return false
    } else {
      return true
    }
  } else {
    return false
  }
}

const reverseString = (str) => {
  if (str == '') {
    return "";
  } else {
    return reverseString(str.substring(1)) + str.charAt(0);
  }
}

export const revertNumberFormat = (formattedNumber) => {
  const pos = formattedNumber.split('.');
  const x = pos[0].split(',').join('');
  return parseInt(x);
}

export const isFormatted = (num) => {
  if (typeof num !== 'string') {
    return false } else {
    var x = num.split('.');
    if (isPriceValid(x[0])) {
      if (x[0].length <= 3 && (x[0].indexOf(',') < 0)) {
        return true;
      } else {
        if ((x.length !== 2) && (x[1] !== '00')) {
          return false
        } else {
          var reversed = reverseString(x[0]);
          var updated = reversed.split(',');
          if (updated[updated.length - 1].length <= 3) {
            updated.pop();
            let status = true;
            updated.forEach(pop => {
              if (pop.length !== 3) {
                status = false;
              }
            });
            return status;
          } else {
            return false;
          }
        }
      }
    } else {
      return false;
    }
  }
}
