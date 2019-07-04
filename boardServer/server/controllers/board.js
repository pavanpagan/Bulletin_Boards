const BoardItem = require('../models').board;
const Comments = require('../models').comment;
module.exports = {

  //This Create function used for creating new boards
  async create(req, res) 
  {
    try
    {
      let response= await BoardItem
      .create({
        title: req.body.title,
        content: req.body.content,
        image: req.file.filename
      })
       return res.status(200).send(response);
    }
    catch(error)
    {
        console.log(error);
      return res.status(400).send("error")
    }
  },

//Used to list all boards and comments 
 async list(req, res) {
   try
   {
    let items= await BoardItem
    .findAll({
      include: [{
        model: Comments,
        required:false,
        as: 'comments',
      }]
    })
   return  res.status(200).send(items);
   }
   catch(error)
   {
    return res.status(400).send(error)
   }
    
  },

  //To add comment
  async createComment(req, res) {
    try
    {
      let data=req.body.data[0];
      let commentResp=await Comments
      .create({
        comment: data.comment,
        bid: data.bid
      });
   return res.status(201).send(commentResp);
    }
    catch(error)
    {
      return res.status(400).send(error);
    }
  },

  //To fetch data based on selected board
  async detailView(req, res) {
    try
    {
        let id=req.params.id;
        let items= await BoardItem
      .findAll({
        where: {id: id},
        include: [{
          model: Comments,
          required:false,
          as: 'comments',
        }]
      })
      return  res.status(200).send(items);
    }
    catch(error)
    {
     return res.status(400).send(error)
    }
     
   }
};


