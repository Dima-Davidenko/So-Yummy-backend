require('dotenv').config();
const express = require('express');
const logger = require('morgan');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const authRouter = require('./routes/api/auth');
const userRouter = require('./routes/api/user');
const recipesRouter = require('./routes/api/recipes');
const ownRecipesRouter = require('./routes/api/ownRecipes');

const swaggerDocument = YAML.load('./data/swagger.yaml');

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short';

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/users', authRouter);
app.use('/api/user-info', userRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/own-recipes', ownRecipesRouter);

app.use((_, res) => {
  res.status(404).json({ message: 'Not found (error 404)' });
});

app.use((err, _, res, next) => {
  res.status(err.status || 500).json({ message: err.message || 'Server Error' });
});

module.exports = app;
