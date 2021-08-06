import getJSONDataFromApi from "./getJSONDataFromApi";

export default class OMDbApi {
  _PRIMARY_URL = "http://www.omdbapi.com/?apikey=9fa67c26&plot=full";

  async fetchMovieById(id) {
    const requestUrl = `${this._PRIMARY_URL}&i=${id}`;

    return await getJSONDataFromApi(requestUrl).then((data) => data);
  }

  async fetchMoviesByIds(ids) {
    let queries = ids.map((id) => this.fetchMovieById(id));
    return await Promise.all(queries);
  }
}
