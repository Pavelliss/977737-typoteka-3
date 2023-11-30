export type TComment = {
  id: string;
  text: string;
};

export type TNewArticle = Omit<TArticle, 'id' | 'comments'>;

export type TArticle = {
  id: string;
  type: 'offer' | 'sale';
  title: string;
  description: string;
  sum: number;
  picture: string;
  categories: string[];
  comments: TComment[];
};
