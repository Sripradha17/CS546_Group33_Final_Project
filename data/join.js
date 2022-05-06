const mongoCollections = require('../config/mongoCollections');
const host = mongoCollections.host;
const playground = mongoCollections.playground;
const { ObjectId } = require('mongodb');
const validation = require('./validation');
const bcrypt = require('bcrypt');
const saltRounds = 16;
const hostData = require('./host');



let exportedMethods = {
    async updatePlayers(id, players) {

        const hostCollection = await host();

        let doc = await hostData.get(id);
        doc.players.push(players);
        const updateHost = {
            playgroundName: doc.playgroundName,
            hostName: doc.hostName,
            players: doc.players,
            sport: doc.sport,
            location: doc.location,
            timing: doc.timing
        };

        const updatedInfo = await hostCollection.updateOne(
            { _id: ObjectId(id) },
            { $set: updateHost }
        );
        if (updatedInfo.modifiedCount === 0) {
            throw 'could not update hosted game successfully';
        }

        return await hostData.get(id);
    },


};

module.exports = exportedMethods;