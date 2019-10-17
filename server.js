const Express = require('express');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = Express();


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

app.use((req, res, next)=>{
  res.render('maintenance.html',)
})



app.get('/', (req, res)=>{
  res.send("HELLO")
});



app.listen(port, ()=>{
  console.log(`Server is up on port ${port}`)
});
