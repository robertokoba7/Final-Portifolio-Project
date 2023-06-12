const express = require('express')
const newsRouter = express.Router()
const axios = require('axios')

newsRouter.get('/', async(req, res) => {
    try {
        const newsAPI = await axios.get(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=ff2b3717e2e343918dbea75624ff5422`)
        // Extract the articles from the response data
        const articles = newsAPI.data.articles;
        // Pass the articles as a property to the template
        res.render('news', { articles : articles })
    } catch (err) {
            res.render('news', { articles : null })
            console.error('Error', err.message)
        }
    }
)

newsRouter.get('/article/:author', async (req, res) => {
  try {
    const author = req.params.author;
    const newsAPI = await axios.get(
      `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=ff2b3717e2e343918dbea75624ff5422`
    );
    const articles = newsAPI.data.articles;
    const article = articles.find((a) => a.author === decodeURIComponent(author));

    if (article) {
      res.render('newsSingle', { article: article });
    } else {
      res.render('newsSingle', { article: null });
    }
  } catch (err) {
    res.render('newsSingle', { article: null });
    console.error('Error:', err.message);
  }
});

newsRouter.post('/article/:author', async (req, res) => {
    try {
      const search = req.body.search;
      const newsAPI = await axios.get('https://api.twitter.com/2/tweets/search/stream')
      const articles = newsAPI.data.articles;
      const article = articles.find((a) => a.author === decodeURIComponent(author));
  
      if (article) {
        res.render('newsSearch', { articles: article });
      } else {
        res.render('newsSearch', { articles: null });
      }
    } catch (err) {
      res.render('newsSearch', { articles: null });
      console.error('Error:', err.message);
    }
  });

module.exports = newsRouter;