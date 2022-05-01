const { host: Host } = require('../config/mongoCollections');

const getHostedGames = async () => {
    // get random games in limit of 5
    const game_hostedCollection = await Host();
    const games = await game_hostedCollection.find({}).limit(5).toArray();
    return games;
}

const getHostedGameById = async (id) => {
    const game_hostedCollection = await Host();
    const game = await game_hostedCollection.findOne({ _id: id });
    if (game === null) throw "Game not found";
    return game;
}

const getHostedGamesBySearchTerm = async (searchTerm) => {
    const game_hostedCollection = await Host();
    const games = await game_hostedCollection.find({ $text: { $search: searchTerm } }).toArray();
    return games;
}

module.exports = {
    getHostedGames,
    getHostedGameById,
    getHostedGamesBySearchTerm
}