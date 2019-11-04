const Project = require("../Models/Project");

module.exports = {
  // Get list of projets per user ID
  renderProjectList(req,res){
     Project.find({
      _creator:req.user._id
    }).then((projectList)=>{
      res.send({ projectList })
    }), (e)=>{
      res.status(400).send(e)
    }
  },
  // Add Project:
  add(req, res){
    var project = new Project({
      name: req.body.name,
      tools: req.body.tools,
      materials: req.body.materials,
      status: req.body.status,
      completed: req.body.completed,
      completedOn: req.body.completedOn
    });
    project.save().then(
      (doc)=>{
        res.send(doc);
      },
      (e)=>{
        res.status(400).send(e);
      }
    );
  },
  // Edit Project:
  edit(req,res){
    let id = req.params.id;
    if(!ObjectID.isValid(id)){
      return res.status(404).send();
    }
    Project.findOneAndUpdate(
      {
        _id: id,
        _creator: req.user._id,
        name: req.body.name,
        tools: req.body.tools,
        materials: req.body.materials,
        status: req.body.status,
        completed: req.body.completed,
        completedOn: req.body.completedOn
      }
    )
    .then((project)=>{
      if(!project){
        res.status(400).send();
      }else{
        console.log(`The Project ${project} was Updated`)
        res.send({project})
      }
    })
    .catch((e)=>{
      res.status(400).send(e)
    });


  },
  // Find Project
  find(req, res){
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).send();
    }
    Project.findOne({
      _id: id,
      _creator: req.user._id
    })
    .then(Project => {
      if (Project) {
        console.log(`Found Food with ID: ${Project}`);
        res.send({ Project });
      } else {
        res.status(404).send();
        console.log("404: no Food Found");
      }
    })
    .catch(e => res.status(400).send());
  },
  delete(req, res){
    var id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).send();
    }
    Project.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    })
    .then(project => {
      if (project) {
        console.log(`The project ${project} was deleted`);
        res.send({ project });
      } else {
        res.status(404).send();
        console.log(`The project ${project} was NOT FOUND`);
      }
    })
      .catch(e => res.status(400).send());
  }
}
