const express = require('express')
const app = express()
const port = 3000
var sassMiddleware = require('node-sass-middleware');
var path = require('path');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('view engine', 'pug');


app.use(sassMiddleware({
    /* Options */
    src: path.join(__dirname, 'sass'),
    dest: path.join(__dirname, 'public', 'css'),
    debug: true,
    outputStyle: 'compressed',
    indentedSyntax: true,
    prefix:  '/css'  // Where prefix is at <link rel="stylesheet" href="prefix/style.css"/>
}));

// icons
const availableIcons = [
  'beer',
  'alien',
  'bug'
]

app.get('/icons/:icon.svg', function (req, res) {
  const color = req.query.color? req.query.color: '000'
  if (
    !req.params.icon ||
    !availableIcons.includes(req.params.icon)
  ) {
    return res.status(404).send('Err 404 Not Found')
  }
  res.setHeader('Content-Type', 'image/svg+xml');
  res.render('icons', { color: color, icon: req.params.icon })
})

app.use(express.static('public'));

app.get('/', function (req, res) {
  res.render('index', { title: 'Hey', message: 'Hello there!!!!'});
});
app.post('/thanx', function (req, res) {
  console.log(req.body);
  var errors = []
  var requiredFields = [
    'name',
    'phone',
    'email',
    'aware'
  ]
  var data = req.body
  Object.keys(data).forEach(function(key) {
    if (data[key].length > 0) {
      const index = requiredFields.indexOf(key);
      if (index > -1) {
        requiredFields.splice(index, 1);
      }
    }
  })
  if (requiredFields.length > 0) {
    return res.render('index', { title: 'Hey', message: 'Hello there!!!!', errors: requiredFields, data: data });
  }
  var date = '06-26-2021'
  const date1 = new Date();
  const date2 = new Date(date);
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  console.log(diffTime + " milliseconds");
  console.log(diffDays + " days");
  res.render('thanx', { title: 'thanx', message: 'thanx you!!!!', data: req.body, diffDays});
});
app.get('/test', function (req, res) {
  res.render('page-a', { title: 'thanx', message: 'thanx you!!!!'});
});




// MVC concept
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
