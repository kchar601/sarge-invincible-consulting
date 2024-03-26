const express = require('express');
const session = require('express-session');
const path = require('path');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
var cookie = require('cookie');
const nodemailer = require('nodemailer');
const app = express()
const port = 80

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));

const transporter = nodemailer.createTransport({
  host: 'mail.smtp2go.com',
  port: 2525,
  secure: false,
  auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS
  }
});

app.get('/', (req, res) => {
  res.render('index');
});

app.listen(port, () => {

  console.log(`Example app listening at http://localhost:${port}`)

})

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

