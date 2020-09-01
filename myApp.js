
// var express = require('express');
// var app = express();

// --> 7)  Mount the Logger middleware here



// --> 11)  Mount the body-parser middleware  here

var bodyParser = require('body-parser')
var express = require('express');
var app = express();


/** 1) Meet the node console. */
console.log("Hello World")

/** 2) A first working Express Server */
app.get('/', function(req, res){
  res.send('Hello Express');
})

/** 3) Serve an HTML file */

app.get("/", function(req, res){
  res.sendFile(__dirname + "/views/index.html");
})


// /** 4) Serve static assets  */
app.use(express.static(__dirname + '/public'))


/** 5) serve JSON on a specific route */

app.get("/json", function(req, res){
  res.json({"message": "Hello json"})
})

// var message  = {"message": "Hello Json"}

// /** 6) Use the .env file to configure the app */

app.get('/json', (req, res)=> {
  if (process.env.MESSAGE_STYLE === 'uppercase') {
  res.json ({"message": "HELLO JSON"})
  } else {
    res.json (message)}
  })

// app.get('/json', (req, res)=> {
// if (process.env.MESSAGE_STYLE === "uppercase") {
// res.json ({"message": "HELLO JSON"})
// }
// res.json (message)
// })



var message = {"message":"Hello json"}
app.get("/json", (req, res) => {
if (process.env.MESSAGE_STYLE === "uppercase") {
res.json ({"message": "HELLO JSON"})
}
res.json (message)
})


/** 7) Root-level Middleware - A logger */
//  place it before all the routes !

app.use((req, res, next)=> {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip)
  next();
})


/** 8) Chaining middleware. A Time server */

app.get('/now', function(req, res, next) {
  req.time = {time: new Date().toString()}  // Hypothetical synchronous operation
  next();
}, function(req, res) {
  res.send(req.time);
})

/** 9)  Get input from client - Route parameters */

app.get("/:word/echo", function(req, res){
  
  var message = {echo: req.params.word}
  res.send(message)
})

/** 10) Get input from client - Query parameters */
// /name?first=<firstname>&last=<lastname>

app.get('/name', function(req, res){
  var {first: firstName, last: lastName} = req.query
  
  res.json({name: `${firstName} ${lastName}`})
})

  
/** 11) Get ready for POST Requests - the `body-parser` */
// place it before all the routes !


app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


/** 12) Get data form POST  */

app.post("/name", function(req, res) {
  // Handle the data in the request
  var string = req.body.first + " " + req.body.last;
  res.json({ name: string });
});



// This would be part of the basic setup of an Express app
// but to allow FCC to run tests, the server is already active
/** app.listen(process.env.PORT || 3000 ); */

//---------- DO NOT EDIT BELOW THIS LINE --------------------

 module.exports = app;
