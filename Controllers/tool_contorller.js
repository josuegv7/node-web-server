const { Tool } = require("../Models/Tool");
const { ObjectId } = require("mongodb");

module.exports = {
  // Get list of projets per user ID
  renderToolList(req, res) {
    Tool.find({
      _creator: req.user._id
    }).then(toolList => {
      res.send({ toolList });
    }),
      e => {
        res.status(400).send(e);
      };
  },
  // Find Tool
  find(req, res) {
    let id = req.params.id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).send();
    }
    Tool.findOne({
      _id: id,
      _creator: req.user._id
    })
      .then(Tool => {
        if (Tool) {
          console.log(`Found Food with ID: ${Tool}`);
          res.send({ Tool });
        } else {
          res.status(404).send();
          console.log("404: no Food Found");
        }
      })
      .catch(e => res.status(400).send());
  },
  // Add Tool:
  add(req, res) {
    var tool = new Tool({
      name: req.body.name,
      price: req.body.price,
      store: req.body.store,
      _creator: req.user._id
    });
    tool.save().then(
      doc => {
        res.send(doc);
      },
      e => {
        res.status(400).send(e);
      }
    );
  },
  // Edit Tool:
  edit(req, res) {
    let id = req.params._id;
    if (!ObjectId.isValid(id)) {
      return res.status(404).send();
    }
    Tool.findOneAndUpdate({
      _id: id,
      _creator: req.user._id,
      name: req.body.name,
      price: req.body.price
    })
      .then(tool => {
        if (!tool) {
          res.status(400).send();
        } else {
          console.log(`The Tool ${tool} was Updated`);
          res.send({ tool });
        }
      })
      .catch(e => {
        res.status(400).send(e);
      });
  },
  // Delete Tool:       
  delete(req, res) {
    let id = req.params.id;
    console.log("TOOL ID: ", id);
    if (!ObjectId.isValid(id)) {
      return res.status(404).send();
    }
    Tool.findOneAndRemove({
      _id: id,
      _creator: req.user._id
    })
      .then(tool => {
        if (tool) {
          console.log(`The tool ${tool} was deleted`);
          res.send({ tool });
        } else {
          res.status(404).send();
          console.log(`The tool ${tool} was NOT FOUND`);
        }
      })
      .catch(e => res.status(400).send());
  }
};
