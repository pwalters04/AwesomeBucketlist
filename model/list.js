//connect mongoose package
const mongoose=require('mongoose');



//Define Bucketlist Schema
const BucketlistSchema=mongoose.Schema({

        title:{
            type:String,
            require:true
        },
        description:String,
        category:{
            type:String,
            require:true,
            enum:['High','Meduium','Low']
        }
});

const BucketList = module.exports = mongoose.model('BucketList', BucketlistSchema );

// Returns all the lists
module.exports.getAllLists = (callback) => {
    BucketList.find(callback);
};


//saved list used to insert Doc into DB
module.exports.addList = (newList, callback) => {
    newList.save(callback);
};

//delete list 
module.exports.deleteListById = (id, callback) => {
    let query = {_id: id};
    BucketList.remove(query, callback);
};
