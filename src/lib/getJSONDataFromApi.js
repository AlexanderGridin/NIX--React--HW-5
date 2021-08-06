const getJSONDataFromApi = async (url) => {
  return await fetch(url)
    .then((response) => response.json())
    .then((data) => data);
};

export default getJSONDataFromApi;
