import { TArticle } from '../../types';

class Search {
  private articles: TArticle[];

  constructor(articles: TArticle[]) {
    this.articles = articles;
  }

  findAll(text: string) {
    return this.articles.filter((article) => article.title.includes(text));
  }
}

export default Search;
