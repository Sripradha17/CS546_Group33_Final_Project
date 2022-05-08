const { ObjectId } = require("mongodb");
const { playground: Playground, playground } = require("../config/mongoCollections")
const validation = require('./validation');

let exportedMethods = {
    async createPlayground(playgroundName, schedule, amenities, playgroundSize, location, imageData) {

        playgroundName = validation.checkString(playgroundName, 'Playground Name');
        schedule = validation.checkString(schedule, 'Schedule');
        if (typeof amenities == "string") {
            amenities = amenities.split(" ")
            amenities = validation.checkArray(amenities, 'Amenities');
        } else {
            amenities = validation.checkArray(amenities, 'Amenities');
        }
        playgroundSize = validation.checkString(playgroundSize, 'Playground size');
        location = validation.checkString(location, 'location');

        const playgroundsCollection = await playground();


        let newPlaygrounddata = {
            playgroundName: playgroundName,
            schedule: schedule,
            amenities: amenities,
            playgroundSize: playgroundSize,
            location: location,
            image: imageData
        };

        const playGroundExists = await playgroundsCollection.findOne({ playgroundName: playgroundName });
        if (playGroundExists) throw "There is already a user with that username";

        const insertInfo = await playgroundsCollection.insertOne(newPlaygrounddata);
        if (!insertInfo.acknowledged || !insertInfo.insertedId)
            throw 'Could not add playground';

        const newId = insertInfo.insertedId.toString();
        // const data = await this.get(newId);

        return { userInserted: true };
    },

    async searchPlaygrounds() {
        const playgroundCollection = await playground();
        const playgroundList = await playgroundCollection.find({}).toArray();
        if (!playgroundList) throw 'Could not get playgrounds';

        for (let i = 0; i < playgroundList.length; i++) {

            playgroundList[i]._id = playgroundList[i]._id.toString();
        }

        return playgroundList;
    },

    async getPlaygroundById(pId) {
        pId = validation.checkId(pId)
        const playgroundCollection = await playground();
        const play = await playgroundCollection.findOne({ _id: ObjectId(pId) });
        if (play === null) throw 'No bands with that id';
        play._id = play._id.toString();
        return play;
    },

    async remove(pId) {
        pId = validation.checkId(pId)
        // const playgrounds = await this.getPlaygroundById(pId);
        // console.log(playgrounds)
        const playgroundCollection = await playground();
        const deletionInfo = await playgroundCollection.deleteOne({ _id: ObjectId(pId) });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete Band with id of ${pId}`;
        }
        const output = band.name + " has been successfully deleted!";

        return output;

    },

    async update(id, playgroundName, schedule, amenities, playgroundSize, location) {
        const playgroundCollection = await Playground();
        // id = validation.checkId(id)
        // playgroundName = validation.checkString(playgroundName, 'Playground Name');
        // schedule = validation.checkString(schedule, 'Schedule');
        // amenities = validation.checkArray(amenities.split(" "), 'Amenities');
        // playgroundSize = validation.checkString(playgroundSize, 'Playground size');
        // location = validation.checkString(location, 'location');

        console.log("ghhhh2")

        let doc = await this.getPlaygroundById(id);
        const updated = {
            playgroundName: playgroundName,
            schedule: schedule,
            amenities: amenities,
            playgroundSize: playgroundSize,
            playgroundSize: playgroundSize,
            location: location,
            images: doc.images
        };
        console.log(updated)
        let parsedId = ObjectId(id);
        const upPlay = await playgroundCollection.findOne({ _id: parsedId });
        if (upPlay == null) {
            throw "Error: No playground found with this id"
        }

        let updateInfo = await playgroundCollection.updateOne({ _id: parsedId }, { $set: updated });

        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) {
            throw "Error: Update failed";
        }
    },

}



// const getPlaygroundById = async (id) => {
//     const playgroundsCollection = await Playground();
//     const playground = await playgroundsCollection.findOne({ _id: ObjectId(id) });
//     if (playground === null) throw "Playground not found";
//     return playground;
// }

// const searchPlaygrounds = async (params) => {
//     const playgroundsCollection = await Playground();
//     const filter = {};
//     if (params?.searchTerm) {
//         filter.$text = { $search: params.searchTerm };
//     }
//     if (params?.date) {
//         const _date = new Date(params.date);
//         const day = _date.getDate();
//         const month = _date.getMonth();
//         const year = _date.getFullYear();

//         filter.schedule = {
//             $gte: new Date(year, month, day + 1),
//             $lte: new Date(year, month, day + 2)
//         }
//     }
//     const playgrounds = await playgroundsCollection.find(filter).toArray();
//     return playgrounds;
// }

module.exports = exportedMethods;
/*{
    exportedMethods,
    getPlaygroundById,
    searchPlaygrounds
}*/