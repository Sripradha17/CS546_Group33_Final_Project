const mongoCollections = require('../config/mongoCollections');
const host = mongoCollections.host;
const playground = mongoCollections.playground;
const { ObjectId } = require('mongodb');
const validation = require('./validation');
const bcrypt = require('bcrypt');
const saltRounds = 16;


let exportedMethods = {
    async createHostUser(firstname, lastname, username, email, password, confirm_password) {

        firstname = validation.checkString(firstname, 'First Name');
        lastname = validation.checkString(lastname, 'Last Name');
        username = validation.checkString(username, 'Username');
        email = validation.checkString(email, 'Email');
        var reWhiteSpace = new RegExp(/\s+/g);
        if (reWhiteSpace.test(username))
            throw `Space not valid in username`
        password = validation.checkPassword(password, 'Password');
        confirm_password = validation.checkPassword(confirm_password, 'Confirm Password');

        if(password !== confirm_password){
            throw "Your password not match!"
        }

        const usersCollection = await host();

        const hash = await bcrypt.hash(password, saltRounds);
        var usernameLowerCase = username.toLowerCase();

        let newUserdata = {
            firatname: firstname,
            lastname: lastname,
            email: email,
            username: usernameLowerCase,
            password: hash
        };

        const userExists = await usersCollection.findOne({ username: usernameLowerCase });
        if (userExists) throw "There is already a user with that username";

        const insertInfo = await usersCollection.insertOne(newUserdata);
        if (!insertInfo.acknowledged || !insertInfo.insertedId)
            throw 'Could not add host';

        const newId = insertInfo.insertedId.toString();
        // const data = await this.get(newId);

        return { userInserted: true };
    },
    async checkUser(username, password) {

        username = validation.checkString(username, 'Username');
        password = validation.checkPassword(password, 'Password');

        var usernameLowerCase = username.toLowerCase();


        const usersCollection = await host();

        const userExists = await usersCollection.findOne({ username: usernameLowerCase });
        if (!userExists) throw "Either the username or password is invalid";

        comparePassword = await bcrypt.compare(password, userExists.password);
        if (!comparePassword) throw "Either the username or password is invalid";

        return { authenticated: true };
    },
    async createHost(sportname, adress, date, slot, detail) {


        const hostCollection = await host();
        let newUserdata = {
            sportname: sportname,
            adress: adress,
            date: date,
            slot: slot,
            detail: detail
        };

        const insertInfo = await hostCollection.insertOne(newUserdata);
        if (!insertInfo.acknowledged || !insertInfo.insertedId)
            throw 'Could not add host';

        const newId = insertInfo.insertedId.toString();
        return { userInserted: true };
    },
    async getAll() {

        const hostCollection = await host();
        const hostlist = await hostCollection.find({}).toArray();
        if (!hostlist) throw 'Could not get all host';

        for (let i = 0; i < hostlist.length; i++) {

            hostlist[i]._id = hostlist[i]._id.toString();
        }

        return hostlist;
    },
    async get(id) {

        id = validation.checkId(id)

        const hostCollection = await host();
        const hostdata = await hostCollection.findOne({ _id: ObjectId(id) });
        if (hostdata === null) throw 'No bands with that id';

        hostdata._id = hostdata._id.toString();
        return hostdata;
    },
    async remove(id) {
        id = validation.checkId(id)

        const hostdata = await this.get(id);
        const hostCollection = await host();
        const deletionInfo = await hostCollection.deleteOne({ _id: ObjectId(id) });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete Band with id of ${id}`;
        }
        const output = hostdata.name + " has been successfully deleted!";

        return output;

    },

    async update(id, sportname, adress, date, slot, detail) {

        const bandsCollection = await host();
        const updatedBands = {
            sportname: sportname,
            adress: adress,
            date: date,
            slot: slot,
            detail: detail
        };

        const updatedInfo = await bandsCollection.updateOne(
            { _id: ObjectId(id) },
            { $set: updatedBands }
        );
        if (updatedInfo.modifiedCount === 0) {
            throw 'could not update bands successfully';
        }

        return await this.get(id);
    },
    async getallplayground() {
        const playgroundCollection = await playground();
        const playgroundList = await playgroundCollection.find({}).toArray();
        if (!playgroundList) throw 'Could not get playgrounds';

        for (let i = 0; i < playgroundList.length; i++) {

            playgroundList[i]._id = playgroundList[i]._id.toString();
        }

        return playgroundList;
    },
    async getHostedGames  ()  {
        // get random games in limit of 5
        const game_hostedCollection = await host();
        const games = await game_hostedCollection.find({}).sort({ createdAt: -1 }).limit(5).toArray();
        return games;
    }
    ,
    async getAllHostedGames  ()  {
        // get random games in limit of 5
        const game_hostedCollection = await host();
        const games = await game_hostedCollection.find({}).sort({ createdAt: -1 }).toArray();
        return games;
    }
    ,
    async getHostedGameById  (id)  {
        const game_hostedCollection = await host();
        const game = await game_hostedCollection.findOne({ _id: id });
        if (game === null) throw "Game not found";
        return game;
    }
    ,
    async getHostedGamesBySearchTerm  (searchTerm)  {
        const game_hostedCollection = await host();
        const games = await game_hostedCollection.find({ $text: { $search: searchTerm } }).toArray();
        return games;
    }
    ,
    async createHostedGame  (game)  {
        const game_hostedCollection = await host();
        const newGame = await game_hostedCollection.insertOne({
            ...game,
            createdAt: new Date()
        });
        if (newGame.insertedCount === 0) throw "Could not create game";
        return newGame;
    }

};

module.exports = exportedMethods;