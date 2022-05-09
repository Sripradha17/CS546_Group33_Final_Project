const { ObjectId } = require("mongodb");
const { playground: Playground, playground } = require('../config/mongoCollections');
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

        }
        const playGroundExists = await playgroundsCollection.findOne({ playgroundName: playgroundName });
        if (playGroundExists) throw "There is already a user with that username";

        const insertInfo = await playgroundsCollection.insertOne(newPlaygrounddata);
        if (!insertInfo.acknowledged || !insertInfo.insertedId)
            throw 'Could not add playground';

        const newId = insertInfo.insertedId.toString();
        // const data = await this.get(newId);

        return { userInserted: true };
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
        const playgroundCollection = await playground();
        const deletionInfo = await playgroundCollection.deleteOne({ _id: ObjectId(pId) });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete Band with id of ${pId}`;
        }
        const output = " has been successfully deleted!";

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
            location: location
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

module.exports = exportedMethods;