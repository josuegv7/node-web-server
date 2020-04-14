const FileController = require("./Controllers/file_controller");
const ProjectController = require("./Controllers/project_controller");
const ToolController = require("./Controllers/tool_contorller");
const UserController = require("./Controllers/user_controller");
const { authenticate } = require('./Middlewear/authenticate');
const { singleUpload } = require('./Middlewear/multer');


module.exports = function (app) {
  // Project Routes
  app.get('/projects/myProjectList', authenticate, ProjectController.renderProjectList);
  app.post('/projects/myProjectList/add', authenticate, ProjectController.add);
  app.delete('/projects/myProjectList/delete/:id', authenticate, ProjectController.delete);
  app.patch('/projects/myProjectList/edit/:_id', authenticate, ProjectController.edit);

  // Tool Routes:
  app.get('/tools/myToolList', authenticate, ToolController.renderToolList);
  app.post('/tools/myToolList/add', authenticate, ToolController.add);
  app.delete('/tools/myToolList/delete/:id', authenticate, ToolController.delete);
  app.patch('/tools/myToolList/edit/:_id', authenticate, ToolController.edit);

  // User Routes:
  app.post('/user/create', UserController.addUser);
  app.get('/user/get', authenticate, UserController.getUser);
  app.post('/user/login', UserController.loginUser);
  app.delete('/user/logout', authenticate, UserController.logoutUser);


  // Upload Files:
  app.post('/files/upload', singleUpload, FileController.uploadFile);
  app.get('/files/getfile', FileController.getFiles);
  app.get('/files/open/:filename', FileController.getSingleFile);
  app.delete('/files/delete/:filename', FileController.deleteSingleFIle);

};
