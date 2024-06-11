export const autoLogout = (cb, milliseconds) => {
  setTimeout(() => {
    cb();
  }, milliseconds);
};
