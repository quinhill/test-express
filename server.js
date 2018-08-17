const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json())
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Test Express';
app.locals.students = require('./students');

app.get('/', (request, response) => {
  response.send('We\'re going to test all the routes!');
});

app.get('/api/v1/students', (request, response) => {
  return response.status(200).json(app.locals.students)
})

app.post('/api/v1/students', (request, response) => {
  let result = ['lastname', 'program', 'enrolled'].every((prop) => {
    return request.body.hasOwnProperty(prop);
  });

  if (result) {
    app.locals.students.push(request.body);
    return response.status(201).json(app.locals.students[app.locals.students.length - 1]);
  } else {
    return response.status(422).send({
      error: 'You are missing data!'
    })
  }
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on localhost:${app.get('port')}.`);
});



module.exports = app;
