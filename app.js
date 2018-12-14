var express = require('express'),
    bodyParser = require('body-parser'),
    path = require('path'),
    jade = require('jade'),
    nodemailer = require('nodemailer');
    app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
      res.render('index', {title: 'Computer Not Working'}); 
})

app.get('/about', (req, res)=>{
      res.render('about'); 
})

app.get('/contact', (req, res)=>{
      res.render('contact'); 
})


app.post('/contact/send', (req, res)=>{
      var transporter = nodemailer.createTransport({
            service: 'Gmail',
            auth: {
                  user: 'chekwubeudeogu@gmail.com',
                  pass: 'CHRISTOk@1',
            },
            tls:{
                  rejectUnauthorized: false
              }
      }) 
      var mailOption = {
            from: 'Chekwube Udeogu <chekwubeudeogu@gmail.com>',
            to: 'Afritest32019@gmail.com',
            subject: 'Website Submission',
            text: 'You have a submission with the following details... Name: '+req.body.name+ ' Email: '+ req.body.email+ ' Message: '+ req.body.message,
            html: '<p>You have a submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
      }
      transporter.sendMail(mailOption, (error, info)=>{
            if(error){
                  console.log(error);
                  res.redirect('/');
            } else{
                  console.log('Mail Sent: ' + info.response);
                  res.redirect('/'); 
            }
      })
})


app.listen(3000, () =>{
      console.log('Express is listen on port 3000')
})