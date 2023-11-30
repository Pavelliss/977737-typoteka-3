import { TArticle, TComment, TNewArticle } from '../../types';
import { nanoid } from 'nanoid';
import { MAX_ID_LENGTH } from '../../constants';

class Article {
  private articles: TArticle[];

  constructor(articles: TArticle[]) {
    this.articles = articles;
  }

  findAll() {
    return this.articles;
  }

  findById(articleId: string) {
    return this.articles.find(({ id }) => id === articleId);
  }

  create(params: TNewArticle) {
    const newArticle: TArticle = Object.assign(
      {
        id: nanoid(MAX_ID_LENGTH),
        comments: [],
      },
      params,
    );
    this.articles.push(newArticle);
    return newArticle;
  }

  edit(articleId: string, article: TArticle) {
    const oldArticle = this.articles.find(({ id }) => id === articleId);
    return Object.assign(oldArticle!, article);
  }

  delete(articleId: string) {
    let oldArticle: TArticle | null = null;

    this.articles = this.articles.filter((article) => {
      if (article.id === articleId) {
        oldArticle = article;
        return true;
      }
      return false;
    });

    return oldArticle;
  }

  findAllComments(articleId: string) {
    const article = this.articles.find(({ id }) => id === articleId);

    return article!.comments;
  }

  findCommentById(articleId: string, commentId: string) {
    const article = this.articles.find(({ id }) => id === articleId);
    return article?.comments.find(({ id }) => id === commentId);
  }

  deleteComment(articleId: string, commentId: string) {
    const article = this.articles.find(({ id }) => id === articleId);
    let oldComment: TComment | null = null;
    article!.comments.filter((comment) => {
      if (comment.id === commentId) {
        oldComment = comment;
        return true;
      }
      return false;
    });

    return oldComment;
  }

  createComment(articleId: string, param: Omit<TComment, 'id'>) {
    const article = this.articles.find(({ id }) => id === articleId);
    const newComment = {
      id: nanoid(MAX_ID_LENGTH),
      text: param.text,
    };
    article!.comments.push(newComment);

    return newComment;
  }
}

export default Article;
