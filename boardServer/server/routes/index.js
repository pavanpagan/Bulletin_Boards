const boardController = require('../controllers').board;
var multer = require('multer');

var storage = multer.diskStorage({
    destination: function (req, file, cb) 
    {
      cb(null, './uploads')
    },
    filename: function (req, file, cb) 
    {
      cb(null, file.originalname)
    }
  })
   
  var upload = multer({ storage: storage });

module.exports = (app) => {
      app.get('/simpleBoard', (req, res) => res.status(200).send({
        message: 'Welcome to the Todos API!',
      }));
      //Creating new Board
      app.post('/simpleBoard/saveBoard',upload.single("imagefile"), boardController.create);
      //fetching all boards and comments
      app.get('/simpleBoard/getContents', boardController.list);
      //For posting comment
      app.post('/simpleBoard/createComment', boardController.createComment);
      //To fetch details of selected board
      app.get('/simpleBoard/getDetailsView/:id', boardController.detailView);
};
