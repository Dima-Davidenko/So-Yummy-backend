const getSortTypeByTitleOrPopularity = sSort => {
  let sort = 'popular';
  const sortOpts = {};
  if (sSort === 'title') {
    sort = 'title';
    sortOpts.title = 1;
  } else {
    sortOpts.popularity = -1;
  }
  return { sortOpts, sort };
};

module.exports = getSortTypeByTitleOrPopularity;
