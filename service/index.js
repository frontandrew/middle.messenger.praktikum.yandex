const express = require('express');

const {controller} = require('./controller');

const app = express();

app.get('/', controller.getRepositories);

app.listen(3000, function () {
  console.log('Мы запустили приложение и можем ходить в гитхаб');
});
