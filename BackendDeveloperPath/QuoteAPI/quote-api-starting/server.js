const express = require('express');
const morgan = require('morgan');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

// Get all expressions
app.get('/api/quotes/random', (req, res, next) => {
  let randomQuote = getRandomElement(quotes);
  let quote = {quote: { randomQuote }};
  res.send(quote);
});

app.get('/api/quotes', (req, res, next) => {
 let author = req.query;

 if(author == {}){
  console.log(quotes)
  res.send(quotes);
 }else{

 let authorQuote = quotes.filter(x=> x.person == author.person);
console.log('test: ' + authorQuote)
 if(authorQuote != ''){
  console.log(authorQuote[0].quote)
  res.send(authorQuote[0].quote);
 }else{
   res.send();
 }
 }
  console.log(req.query)
});

app.post('/api/quotes', (req, res, next) => {
let newQuote = req.query;
if(newQuote.quote == '' || newQuote.person == ''){
  res.status(400);
}else{
quotes.push(newQuote);
console.log(newQuote);
  res.send(newQuote);
}
});

app.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
});