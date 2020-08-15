import cookie from 'react-cookies';

export const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + (exdays*24*60*60*1000));
  var expires = "expires="+ d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export const getCookie = (cname) => {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(';');
  for(var i = 0; i <ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

var d = new Date();
d.setTime(d.getTime() + (99999999999*24*60*60*1000));
var token = d;

export const addToWishList = (id) => {
  try {
    const verify = cookie.load('wish');
    if (verify !== undefined) {
      const prev = Object.assign({}, cookie.load('wish'));
      if (prev && prev[id]) {
        prev[id] = false;
      } else {
        prev[id] = true;
      }
      cookie.save('wish', prev, { path: '/', expires: token });
      return true;
    } else {
      let x = {
        [id]: true
      }
      cookie.save('wish', x, { path: '/', expires: token });
      return true;
    }
  } catch(e) {
    if (e) {
      return false
    }
  }
}

export const verifyWishList = (id) => {
  let verify = cookie.load('wish');
  if (verify !== undefined) {
    let wishs = cookie.load('wish');
    if (wishs && wishs[id]) {
      return true
    } else {
      return false
    }
  } else {
    return false
  }
}

export const generateKeyword = (keyword) => {
  let keys = cookie.load('keys');
  if (keys !== undefined) {
    cookie.save('keys', keys, { path: '/', expires: token });
  } else {
    cookie.save('keys', keyword, { path: '/', expires: token });
    return true;
  }
}
