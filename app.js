// imports
const { render } = require('ejs');
const express = require('express');
const { title } = require('process');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

// express app
const app = express();

// connect to mongoDB
const dbURI = 'mongodb+srv://saransh:test1234@mycluster.301civi.mongodb.net/learning?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser : true, useUnifiedTopology : true })
.then((result) => app.listen(3000)) // listen for request after the connection to database is  established
.catch((err) => console.log(err));

// register view engine

app.set('view engine', 'ejs')
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));

app.get((req,res,next) => {
    console.log('on to the next request');
    next();
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req,res) => {
    res.render('about', {title : 'About'});
});

app.get('/blogs/create', (req,res) => {
    res.render('create', {title : 'Create-Blog'});
});

app.get('/blogs', (req, res) => {
    Blog.find().sort({createdAt : -1})
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });

  app.post('/blogs', (req, res) => {
    // console.log(req.body);
    const blog = new Blog(req.body);
  
    blog.save()
      .then(result => {
        res.redirect('/blogs');
      })
      .catch(err => {
        console.log(err);
      });
  });
  

  app.get('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findById(id)
      .then(result => {
        res.render('details', { blog: result, title: 'Blog Details' });
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    
    Blog.findByIdAndDelete(id)
      .then(result => {
        res.json({ redirect: '/blogs' });
      })
      .catch(err => {
        console.log(err);
      });
  });
// 404
app.use((req,res) => {
    res.render('404', {title : '404'});
});