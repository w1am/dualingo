export const hasEmailErr = (em) => {
  console.log('email', em);
  let atFormat = em.split('@');
  let dotFormat = em.split('.');
  if (atFormat.length == 2 && ((dotFormat[0].indexOf('@') > 0) && (dotFormat[1] == 'com'))) {
    return false
  }
  return true
}

export const hasPhoneErr = (ph) => {
  var phoneno = /^\d{8}$/;
  if ((ph.match(phoneno)) && (ph.toString().substring(0, 1) == '5')) {
    return false
  } else {
    return true;
  }
}
