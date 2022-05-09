const { ObjectId } = require("mongodb");
const { playground: Playground, playground } = require("../config/mongoCollections")
const validation = require('./validation');


const filterPlaygrounds = async (params) => {
    const playgroundsCollection = await Playground();
    const filter = {};
    if (params?.searchTerm) {
        filter.$text = { $search: params.searchTerm };
    }
    
    console.log(filter.$text.$search)

    // const playgrounds = await playgroundsCollection.find({playgroundName:params.searchTerm}).toArray();
    // return playgrounds;
}


module.exports =
{
    filterPlaygrounds
}