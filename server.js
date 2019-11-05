var Express = require('express');
var bodyParser = require('body-parser');

const morgan = require('morgan');
const cors = require('cors');

const { mongoose } = require('./Database/mongoose');


const router = require('./router');

var fs = require('fs');
var port = process.env.PORT || 3000;

var app = Express();

// App SetUp Middleware:
app.use(morgan('combined'));

// Set the JWT to authToken with this the front end can access the token in the request.
const corsOptions = {
  exposedHeaders: ['authToken'],
};
app.use(cors(corsOptions));

app.use(bodyParser.json({ type: '*/*' }));

// ROUTER: Routes of actions:
router(app);

//============ MiddleWear =========================
// Log for request made to the server:
app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(`${now}: ${req.method} ${req.url}`);
  fs.appendFile("server.log", log + '\n', (err)=>{
    if (err){
      console.log('Unable to append to Server.log.')
    }
  })
  next();
});

// PORT for APP:
app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
