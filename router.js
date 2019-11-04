const ProjectController = require("./Controllers/project_controller");
const ToolController = require("./Controllers/tool_contorller");

const UserController = require("./Controllers/user_controller");
const { authenticate } = require('./middlewear/authenticate');


module.exports = function (app) {
  // Project Routes
  app.get('/projects/myProjectList', authenticate, ProjectController.renderProjectList);
  app.post('/projects/myProjectList/add', authenticate, ProjectController.add);
  app.delete('/projects/myProjectList/delete/:id', authenticate, ProjectController.delete);
  app.patch('/projects/myProjectList/edit/:id', authenticate, ProjectController.edit);

  // Tool Routes:
  app.get('/tools/myToolList', authenticate, ToolController.renderToolList);
  app.post('/tools/myToolList/add', authenticate, ToolController.add);
  app.delete('/tools/myToolList/delete/:id', authenticate, ToolController.delete);
  app.patch('/tools/myToolList/edit/:id', authenticate, ToolController.edit);

  // User Routes:
  app.post('/user/create', UserController.addUser);
  app.get('/user/get', authenticate, UserController.getUser);
  app.post('/user/login', authenticate, UserController.loginUser);
  app.delete('/user/logout', authenticate, UserController.logoutUser);
};
