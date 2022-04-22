export const getPageNumber = (count) => {
  let pages = [];
  for (let i = 1; i <= Math.ceil(count / 60); i++) {
    pages.push(i);
  }
  return pages;
};
