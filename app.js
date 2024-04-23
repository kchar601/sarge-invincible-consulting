const express = require('express');
const path = require('path');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express()
const port = 80

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

app.get('/Home', (req, res) => {
  res.render('index');
});

app.get('/Portfolio', (req, res) => {
  const resumeData = require('./resume.json');
  res.render('portfolio', {resumeData: resumeData});
});

app.get('/Services', (req, res) => {
  res.render('services');
});

app.get('/About', (req, res) => {
  res.render('about');
});

app.get('/Contact', (req, res) => {
  res.render('contact');
});

app.get('/sitemap.xml', function(req, res) {
  res.sendFile('sitemap.xml' , { root : __dirname});
});

app.post('/api/sendMsg', async (req, res) => {
  try {
    res.setHeader('Content-Type', 'application/json');
    const email = req.body.email;
    const name = req.body.name;
    const message = req.body.msg;
    const html = `<p><b>Name:</b> ${name}</p><p><b>Return email:</b> ${email}</p><p><b>Message:</b> ${message}</p>`;

    const mailOptions = {
      from: 'user@kavcak.com',
      to: 'sarge@kavcak.com',
      subject: 'Website Contact Form',
      html: html
    };
    
    await transporter.sendMail(mailOptions);
    console.log('Message sent');
    res.json({status: "success"});
  } catch (error) {
    console.error(error);
    res.status(500).json({status: "error", message: "Failed to send message"});
  }
});  
