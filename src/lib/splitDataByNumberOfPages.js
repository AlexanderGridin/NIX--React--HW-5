const splitDataByNumberOfPages = (data, numberOfPages) => {
  let result = [];
  let copyOfData = data.slice();
  const dataPerPage = Math.ceil(copyOfData.length / numberOfPages);

  for (let i = 0; i < numberOfPages; i++) {
    result.push(copyOfData.splice(0, dataPerPage));
  }

  return (pageNumber) => result[pageNumber - 1];
};

export default splitDataByNumberOfPages;