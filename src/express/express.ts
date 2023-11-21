import express from 'express';
import userRouter from './routes/user';
import articleRouter from './routes/articles';
import mainRoutes from './routes/main';
import * as path from 'path';

const DEFAULT_PORT = 8080;
const PUBLIC_DIR = 'public';
const TEMPLATES_DIR = 'templates';

const app = express();

app.use('/', mainRoutes);
app.use('/user', userRouter);
app.use('/articles', articleRouter);

app.use(express.static(path.resolve(__dirname, PUBLIC_DIR)));

app.set('views', path.resolve(__dirname, TEMPLATES_DIR));
app.set('view engine', 'pug');

app.listen(DEFAULT_PORT);

/*
post-detail.pug — страница публикации (post-user.html);
articles-by-category.pug — публикации в определённой категории (publications-by-category.html);
comments.pug — список комментариев к публикациям (admin-comments.html);
my.pug — мои публикации (admin-publications.html);
post.pug — страница создания и редактирование публикации (admin-add-new-post-empty.html);
all-categories.pug — страница со списком всех категорий (admin-categories.html)
500.pug — страница для отображения ошибок 5** (500.html);
404.pug — страница для отображения ошибки 404 (404.html). Внутри директории templates вы можете выстраивать произвольную иерархию директорий. Например, шаблоны для страниц с ошибками могут размещаться в директории ./express/templates/errors и так далее. Для отдельных повторяющихся блоков вы также можете завести отдельную директорию внутри templates.
* */
