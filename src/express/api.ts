import axios, { AxiosRequestConfig, AxiosInstance } from 'axios';
import { Url } from '../service/api/constants';
import { DEFAULT_PORT } from '../constants';

const TIMEOUT = 1000;
const port = process.env.API_PORT || DEFAULT_PORT;
const defaultUrl = `http://localhost:${port}/api/`;

class Api {
  private http: AxiosInstance;

  constructor(baseURL: string, timeout: number) {
    this.http = axios.create({ baseURL, timeout });
  }

  private async load(url: string, options: AxiosRequestConfig<any> = {}) {
    const { data } = await this.http.request({ url, ...options });
    return data;
  }

  getCategories() {
    return this.load(Url.category);
  }

  search(query: string) {
    return this.load(Url.search, { params: { query } });
  }

  getArticles() {
    return this.load(Url.articles);
  }

  getArticle(id: number | string) {
    return this.load(`${Url.articles}/${id}`);
  }
}

export const defaultAPI = new Api(defaultUrl, TIMEOUT);

export default Api;
