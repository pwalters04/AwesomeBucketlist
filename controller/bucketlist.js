/** Bucklist Controller */
const express=require('express');
const router = express.Router();
const bucketlist = require('../model/list');

//CRUD

//GET Method
/*router.get('/',(req,res)=>{
    res.send("GET Method");
});

//POST Method
router.post('/',(req,res)=>{
    res.send("Post Method");
});

//DELETE Method
router.delete('/:id',(res,req,next)=>{
    res.send("DELETE");
});*/

// GET Method to /bucketlist
router.get('/',(req,res) => {
    bucketlist.getAllLists((err, lists)=> {
        if(err) {
            res.json({success:false, message: `Failed to load all lists. Error: ${err}`});
        }
        else {
            res.write(JSON.stringify({success: true, lists:lists},null,2));
            res.end();
        }
    });
});

//POST HTTP method to /bucketlist

router.post('/', (req,res,next) => {
        console.log(req.body);

    let newList = new bucketlist({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category
    });
    bucketlist.addList(newList,(err, list) => {
        if(err) {
            res.json({success: false, message: `Failed to create a new list. Error: ${err}`});

        }
        else
            res.json({success:true, message: "Added successfully."});

    });
});

//DELETE HTTP method to /bucketlist. Here, we pass in a param which is the object id.

router.delete('/:id', (req,res,next)=> {
  //access the parameter which is the id of the item to be deleted
    let id = req.params.id;
        console.log(id);
  //Call the model method deleteListById
    bucketlist.deleteListById(id,(err,list) => {
        if(err) {
            res.json({success:false, message: `Failed to delete the list. Error: ${err}`});
        }
        else if(list) {
            res.json({success:true, message: "Deleted successfully"});
        }
        else
            res.json({success:false});
    });
});

module.exports=router;

