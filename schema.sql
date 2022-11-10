CREATE TABLE categories(
  id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name VARCHAR(250) NOT NULL
);

CREATE TABLE users(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  email VARCHAR(250) UNIQUE NOT NULL,
  password_hash VARCHAR(250) NOT NULL,
  first_name VARCHAR(250) NOT NULL,
  last_name VARCHAR(250) NOT NULL,
  avatar VARCHAR(50)
);

CREATE TABLE comments(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  user_id INTEGER NOT NULL,
  article_id INTEGER NOT NULL,
  text TEXT NOT NULL,
  create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id)
);

CREATE TABLE articles(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  category_id INTEGER,
  create_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  title VARCHAR(250) NOT NULL,
  announcement VARCHAR(250) NOT NULL,
  picture VARCHAR(250),
  text VARCHAR(1000) NOT NULL ,
  FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE users_comments(
  user_id INTEGER NOT NULL,
  comment_id INTEGER NOT NULL,
  PRIMARY KEY (user_id, comment_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (comment_id) REFERENCES comments(id)
);

CREATE TABLE articles_categories(
  article_id INTEGER NOT NULL,
  categories_id INTEGER NOT NULL,
  PRIMARY KEY (article_id, categories_id),
  FOREIGN KEY (article_id) REFERENCES articles(id),
  FOREIGN KEY (categories_id) REFERENCES categories(id)
);

CREATE INDEX ON articles(title);


