var Express = require('express');
var bodyParser = require('body-parser');
const { ObjectID } = require('mongodb');

var fs = require('fs');
var port = process.env.PORT || 3000;


var {mongoose} = require('./Database/mongoose');
var {User} = require('./Models/User');
var {Project} = require('./Models/Project');
var {Tool} = require('./Models/Tool');

var app = Express();

//============ MiddleWear =========================
// Extract body portion of incoming request stream and exposes it on req.body
app.use(bodyParser.json());
// Log for request made to the server:
// app.use((req, res, next)=>{
//   var now = new Date().toString();
//   var log = `${now}: ${req.method} ${req.url}`
//   console.log(`${now}: ${req.method} ${req.url}`);
//   fs.appendFile("server.log", log + '\n', (err)=>{
//     if (err){
//       console.log('Unable to append to Server.log.')
//     }
//   })
//   next();
// });

app.get('/project',  (req, res)=>{
  Project.find().then((project)=>{
    res.send({
      projects:project
    })
  },(e)=>{
    res.status(400).send(e)
  })
})

app.post('/project', (req,res)=>{
  var project = new Project({
    name: req.body.name
  });
  project.save().then((doc)=>{
    res.send(doc);
  }, (e)=>{
    res.status(400).send(e);
  });
});

app.get('/project/:id', (req,res)=>{
  var id = req.params.id;
  if(!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Project.findById(id).then((doc)=>{
    if(!doc){
      return res.status(404).send();
    }
    res.send({project: doc});
  }).catch((e)=>{
    res.status(400).send()
  })
});


app.listen(port, () => {
  console.log(`Server is up on port ${port}`)
});
