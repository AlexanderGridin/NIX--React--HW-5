const splitDataByNumberOfItemsPerPage = (data, itemsPerPage) => {
  if (!Array.isArray(data)) {
    return [(pageNumber) => null, null];
  }

  let result = [];
  let copyOfData = data.slice();
  const numberOfPages = Math.ceil(copyOfData.length / itemsPerPage);

  for (let i = 0; i < numberOfPages; i++) {
    result.push(copyOfData.splice(0, itemsPerPage));
  }

  return [(pageNumber) => result[pageNumber - 1], numberOfPages];
};

export default splitDataByNumberOfItemsPerPage;
