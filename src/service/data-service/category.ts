import { TArticle } from '../../types';

class Category {
  private articles: TArticle[];

  constructor(articles: TArticle[]) {
    this.articles = articles;
  }

  findAll() {
    const categories = this.articles.reduce((acc, article) => {
      article.categories.forEach((category) => acc.add(category));

      return acc;
    }, new Set());

    console.log(categories);

    return [...categories];
  }
}

export default Category;
