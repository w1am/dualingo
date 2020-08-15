import decode from 'jwt-decode';

export const isAuthenticated = () => {
  try {
    const user = decode(localStorage.getItem('token', { header: true }) || sessionStorage.getItem('token', { header: true }));
    if (user.email) {
      return {
        ok: true,
        id: user.id,
        email: user.email,
        name: user.name,
        valid: user.valid,
        stores: user.stores
      }
    }
  } catch(err) {
    return {
      ok: false
    }
  }
}

export const storeInfo = (name) => {
  const stores = isAuthenticated().stores;
  var newList = stores.filter(store => store.username == name);
  return newList[0];
}
